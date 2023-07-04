import FuseUtils from "@fuse/utils";
import AppContext from "app/AppContext";
import { Component } from "react";
import { connect } from "react-redux";
import { matchRoutes, Navigate } from "react-router-dom";
import withRouter from "@fuse/core/withRouter";
import settingsConfig from "app/fuse-configs/settingsConfig";

class FuseAuthorization extends Component {
  constructor(props, context) {
    super(props);
    const { routes } = context;
    this.state = {
      accessGranted: true,
      pathMatched: false,
      routes,
    };
    this.defaultLoginRedirectUrl = settingsConfig.loginRedirectUrl || "/";
  }

  componentDidMount() {
    if (!this.state.accessGranted) {
      this.redirectRoute();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.accessGranted !== this.state.accessGranted;
  }

  componentDidUpdate() {
    if (!this.state.accessGranted) {
      this.redirectRoute();
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { location, userRole } = props;
    const { pathname } = location;

    const matchedRoutes = matchRoutes(state.routes, pathname);

    const matched = matchedRoutes ? matchedRoutes[0] : false;
    const pathMatched = !!matched;

    const accessGranted = matched
      ? FuseUtils.hasPermission(matched.route.auth, userRole)
      : false;

    return {
      pathMatched,
      accessGranted,
    };
  }

  redirectRoute() {
    const { location, userRole } = this.props;
    const { pathMatched } = this.state;
    const { pathname } = location;
    const loginRedirectUrl = settingsConfig.loginRedirectUrl
      ? settingsConfig.loginRedirectUrl
      : this.defaultLoginRedirectUrl;

    /*
      Esta logeado y no existe la pagina
      Redirect to 404
    */
    if (userRole && userRole.length > 0 && !pathMatched) {
      return <Navigate to="/404" />;
    }
    /*
      No esta logeado
      Redirect /login
    */
    if (!userRole || userRole.length === 0) {
      if (!pathMatched) settingsConfig.loginRedirectUrl = "/404";
      else settingsConfig.loginRedirectUrl = pathname;
      return <Navigate to="/login" />;
    }
    /*
      User is member
      User must be on unAuthorized page or just logged in
      Redirect to dashboard or loginRedirectUrl
    */
    const url = loginRedirectUrl;
    settingsConfig.loginRedirectUrl = this.defaultLoginRedirectUrl;
    return <Navigate to={url} />;
  }

  render() {
    if (!this.state.accessGranted) {
      return this.redirectRoute();
    }

    return <>{this.props.children}</>;
  }
}

function mapStateToProps({ auth }) {
  return {
    userRole: auth.user.role,
  };
}

FuseAuthorization.contextType = AppContext;

export default withRouter(connect(mapStateToProps)(FuseAuthorization));