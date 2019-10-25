import router from "./router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style

import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

import { requireAuth } from "./utils/keycloakAuth";

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start();
  // permission check
  // requireAuth(to, from, next);
  // set page title
  // document.title = getPageTitle(to.meta.title);
  next();
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
