export const ApplicationName = "Project2";

export const QueryParameterNames = {
  ReturnUrl: "returnUrl",
  Message: "message"
};

export const LogoutActions = {
  LogoutCallback: "logout-callback",
  Logout: "logout",
  LoggedOut: "logged-out"
};

export const LoginActions = {
  Login: "login",
  LoginCallback: "login-callback",
  LoginFailed: "login-failed",
  Profile: "profile",
  Register: "register"
};

const prefix = "authentication";

const identityProviderUrl = "https://localhost:5001";
const frontendAppUrl = "http://localhost:3000";

export const ApplicationPaths = {
  IdentityProviderUrl: identityProviderUrl,
  DefaultLoginRedirectPath: "/",
  ApiAuthorizationClientConfigurationUrl: `${identityProviderUrl}/_configuration/${ApplicationName}`,
  ApiAuthorizationPrefix: prefix,
  Login: `${frontendAppUrl}/${frontendAppUrl}/${prefix}/${LoginActions.Login}`,
  LoginFailed: `${frontendAppUrl}/${prefix}/${LoginActions.LoginFailed}`,
  LoginCallback: `${frontendAppUrl}/${prefix}/${LoginActions.LoginCallback}`,
  Register: `${frontendAppUrl}/${prefix}/${LoginActions.Register}`,
  Profile: `${frontendAppUrl}/${prefix}/${LoginActions.Profile}`,
  LogOut: `${frontendAppUrl}/${prefix}/${LogoutActions.Logout}`,
  LoggedOut: `${frontendAppUrl}/${prefix}/${LogoutActions.LoggedOut}`,
  LogOutCallback: `${frontendAppUrl}/${prefix}/${LogoutActions.LogoutCallback}`,
  IdentityRegisterPath: "Identity/Account/Register",
  IdentityManagePath: "Identity/Account/Manage"
};
