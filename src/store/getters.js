import { startOfYesterday } from "date-fns";

const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  authenticated: state => state.auth.authorisiert,
  keyCloak: state => state.auth.keyCloak,
  token: state => state.auth.token,
  keywordList: state => state.keyword.showingList || state.keyword.keywordList
};
export default getters;
