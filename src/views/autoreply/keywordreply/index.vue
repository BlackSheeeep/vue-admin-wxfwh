<template>
  <div class="autoreply">
    <div v-if="isKeywordList">
      <Search></Search>
      <KeywordList @show-detail="showDetail"></KeywordList>
      <KeywordDetail v-if="show" :row="selectedRow" @close="show=false"></KeywordDetail>
    </div>
    <div v-else>
      <AddNew></AddNew>
    </div>
  </div>
</template>
<script>
import Search from "./Search";
import KeywordList from "./KeywordList";
import KeywordDetail from "./KeywordDetail";
import AddNew from "@/components/DataForm"
export default {
  components: {
    Search,
    KeywordList,
    KeywordDetail,
    AddNew
  },
  data() {
    return {
      show: false,
      selectedRow: {}
    };
  },
  computed: {
    isKeywordList() {
      return !/\/add-new-keyword$/i.test(this.$route.path);
    }
  },
  methods: {
    showDetail(event) {
      this.show = true;
      this.selectedRow = event;
    }
  }
};
</script>

<style lang="scss" scoped>
.autoreply {
  width: 1200px;
}
</style>
