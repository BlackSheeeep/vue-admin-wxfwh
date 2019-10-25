import { keyword } from "@/utils/data-template.js"
import { startOfYesterday } from "date-fns";
const state = {
  keywordList: [keyword(), keyword(), keyword("hello"), keyword("world"), keyword("", "", "hello world")],
  showingList: null
}

const mutations = {
  ADD_KEYWORD(state, val) {
    state.keywordList.push(val);
  },
  DELETE_KEYWORD(state, keyword) {
    for (const index in state.keywordList) {
      if (state.keywordList[index].keyword === keyword) {
        state.keywordList.splice(index, 1);
      }
    }
  },
  SEARCH(state, str) {
    state.searchStr = str;
    state.showingList = [];
    const strReg = new RegExp(str);
    for (const a of state.keywordList) {
      if (strReg.test(a.keyword)) {
        state.showingList.push(a);
      }
    }
    for (const a of state.keywordList) {
      if (strReg.test(a.content)) {
        state.showingList.push(a);
      }
    }
    for (const a of state.keywordList) {
      if (strReg.test(a.contentType)) {
        state.showingList.push(a);
      }
    }
    for (const a of state.keywordList) {
      if (strReg.test(a.comment)) {
        state.showingList.push(a);
      }
    }
  },
  RESET_SHOWING_LIST(state) {
    state.showingList = null;
  }

}

const actions = {
  addKeyword({ commit }, val) {
    commit("ADD_KEYWORD", val);
  },
  deleteKeyword({ commit }, keyword) {
    commit("DELETE_KEYWORD", keyword);
  },
  search({ commit }, str) {
    commit("SEARCH", str);
  },
  resetShowingList({ commit }) {
    commit("RESET_SHOWING_LIST");
  }

}

export default {
  state,
  mutations,
  actions
}
