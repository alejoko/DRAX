import React, { useMemo } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import SideBar from './SideBar';
import ClientModule from 'src/modules/client/components';

import { AppActions } from 'src/App/redux/actions';
import { ChangeLangPayload } from 'src/App/redux/actions/AppActions';

import { getUrlPart } from 'src/App/helpers/string';

export type AppSiderProps = RouteComponentProps<{ lang: string }> & {
    lang?: ChangeLangPayload;
};

const AppSider = (props: AppSiderProps) => {
    const { lang, match, location } = props;

    const [section, selected] = useMemo(
        () => getUrlPart(location.pathname, [ClientModule.path], !!match.params.lang),
        [location.pathname, match.params.lang]);

    return (
        <>
            <SideBar selected={selected} lang={lang?.code!} byUser={lang?.byUser!} />
        </>
    )
};

const mapStateToProps = (state: any) => ({
    lang: AppActions.get(state).lang
});

export default connect(mapStateToProps)(withRouter(AppSider));