import { push } from 'connected-react-router/immutable';
import { genericErrorPageConfig as errorConfig } from 'src/App/components/GenericErrorPage';

/** Action globals app routes. */
abstract class RouteActions {

    public static actionGotoLogin() {
        return push('/');
    }

    public static actionGotoForbidden() {
        return push(`/${errorConfig.forbiddenPath}`);
    }

    public static actionGotoNotFound() {
        return push(`/${errorConfig.notFoundPath}`);
    }

    public static actionGotoError() {
        return push(`/${errorConfig.internalServerErrorPath}`);
    }
}
export default RouteActions;