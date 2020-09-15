import React, { RefObject } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';

import { Form, Input, Checkbox, } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';

import { useAuthService } from 'src/App/hooks/AuthProvider';

import { AppActions } from 'src/App/redux/actions';

import { nameof } from 'src/App/helpers/string';
import { defaultLayout } from 'src/modules/shared/helpers/form';

import { AuthResultStatus } from 'src/App/services/auth/_auth.type';
import { AuthPasswordLoginArgs } from 'src/App/services/auth/auth-password.service';


export type LoginPasswordValue = {
    username?: string;
    password?: string;
    remember: boolean;
}
export type LoginPasswordFormProps = {
    formRef?: RefObject<FormInstance>;
    onFinish?: (values: LoginPasswordValue) => void;
    showGlobalSpin?: (text?: string) => void;
}
function LoginPasswordForm(props: LoginPasswordFormProps) {
    const { onFinish, formRef, showGlobalSpin } = props;

    const intl = useIntl();
    const { service } = useAuthService();

    // #region Render
    // ========================================== Events =========================================
    async function handleFinish(values: LoginPasswordValue) {
        const loginArgs: AuthPasswordLoginArgs = {
            username: values.username!,
            password: values.password!,
            rememberMe: values.remember
        };

        showGlobalSpin!(intl.formatMessage({ id: 'loading.authenticate' }));
        const result = await service.login(loginArgs)
        
        switch (result.status) {
            case AuthResultStatus.Success:
                if (onFinish) {
                    onFinish(values);
                }
                break;
            case AuthResultStatus.Fail:
                break;
            case AuthResultStatus.Redirect:
                break;
        }
        showGlobalSpin!();
    }
    function onFinishFailed(errorInfo: ValidateErrorEntity) {
        console.log('Failed:', errorInfo);
    };
    // #endregion

    // #region Render
    // ========================================== Render =========================================
    return (
        <Form 
            {...defaultLayout}
            name="auth"
            ref={formRef}
            onFinish={handleFinish as any}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label={<span className="capitalize">{intl.formatMessage({ id: 'field.username'})}</span>} 
                name={nameof<LoginPasswordValue>('username')}
                rules={[{ 
                    required: true,
                    message: intl.formatMessage(
                        { id: 'validation.required' },
                        { field: intl.formatMessage({ id: 'field.username'}) }
                    )
                }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label={<span className="capitalize">{intl.formatMessage({ id: 'field.password'})}</span>}
                name={nameof<LoginPasswordValue>('password')}
                rules={[{
                    required: true,
                    message: intl.formatMessage(
                        { id: 'validation.required' },
                        { field: intl.formatMessage({ id: 'field.password'}) }
                    )
                }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                initialValue={false}
                wrapperCol={{ offset: 8, span: 16 }}
                name={nameof<LoginPasswordValue>('remember')}
                valuePropName="checked"
            >
                <Checkbox>
                    <span className="capitalize">
                        {intl.formatMessage({ id: 'field.rememberMe' })}
                    </span>
                </Checkbox>
            </Form.Item>
        </Form>
    )
    // #endregion
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    showGlobalSpin: (text?: string) => dispatch(AppActions.actionShowGlobalSpin(!!text, text))
})
export default connect(null, mapDispatchToProps)(LoginPasswordForm);