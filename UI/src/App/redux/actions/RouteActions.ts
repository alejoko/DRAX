import { push } from 'connected-react-router/immutable';
import { Error, Forbiden, NotFound } from 'src/App/components/Pages';


/** Action globals app routes. */
abstract class RouteActions {
    /** Goto login page. */
    public static actionGotoLogin() {
        return push('/');
    }
    /** Goto Forbiden page.  */
    public static actionGotoForbiden() {
        return push(`/${Forbiden.path}`);
    }
    /** Goto NotFound page.  */
    public static actionGotoNotFound() {
        return push(`/${NotFound.path}`);
    }
    /** Goto Error page.  */
    public static actionGotoError() {
        return push(`/${Error.path}`);
    }
}
export default RouteActions;