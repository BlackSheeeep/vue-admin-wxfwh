import store from "../store";
import Keycloak from "keycloak-js";

// 不同权限平台需要设置不同的realm

// const keycloakAuth = new Keycloak({
//   realm: "member-management-system",
//   url: "https://auth.gelonghui.com/auth",
//   "ssl-required": "external",
//   resource: "web-client",
//   "public-client": true,
//   clientId: "web-client"
// });

export function requireAuth(to, from, next) {
  var authenticated = store.getters.authenticated;
  if (!authenticated) {
    window.keyCloakInterval = null;
    clearInterval(window.keyCloakInterval);
    keycloakAuth
      .init({ onLoad: "login-required" })
      .success(authenticated => {
        if (!authenticated) {
          alert("not authenticated");
        } else {
          keycloakAuth.updateToken(10).success(() => {
            store.dispatch("setAuthLogin", keycloakAuth);
            store.dispatch("setKeyCloak", keycloakAuth);
            store.dispatch("setToken", keycloakAuth);
            next();
          });
          window.keyCloakInterval = setInterval(() => {
            keycloakAuth.updateToken(10).success(() => {
              store.dispatch("setAuthLogin", keycloakAuth);
              store.dispatch("setKeyCloak", keycloakAuth);
              store.dispatch("setToken", keycloakAuth);
              next();
            });
          }, 10000);
        }
      })
      .error(() => {
        console.log("failed to login");
      });
  } else {
    next();
  }
}

export function isLoggedIn() {
  store.getters.authenticated;
  return true;
}
