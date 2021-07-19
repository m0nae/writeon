const SERVER_DOMAIN = process.env.REACT_APP_SERVER_DOMAIN;
const CLIENT_DOMAIN = process.env.REACT_APP_CLIENT_DOMAIN;

export default {
  CLIENT_DOMAIN,
  SERVER_DOMAIN,
  GRAPHQL: `${SERVER_DOMAIN}/api/graphql`,
  LOGIN: `${SERVER_DOMAIN}/api/auth/login`,
  LOGOUT: `${SERVER_DOMAIN}/api/auth/logout`,
  SIGNUP: `${SERVER_DOMAIN}/api/auth/signup`,
  DELETE_ACCOUNT: `${SERVER_DOMAIN}/api/auth/delete-account`,
  CURRENT_USER: `${SERVER_DOMAIN}/api/auth/current`
};
