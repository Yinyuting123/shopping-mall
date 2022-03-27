<template>
  <div>
    <!-- 三级联动组件已注册为全局组件，所以不需要再引入了 -->
    <TypeNav></TypeNav>
    <ListListener></ListListener>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor"/>
    <Brand></Brand>
  </div>
</template>

<script>
import ListListener from "./ListContainer";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
import { mapState } from "vuex";

export default {
  name: "homeView",
  components: {
    ListListener,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    //派发action,获取floor组件的数据
    this.$store.dispatch("getFloorList");
    // this.$store.dispatch("getUserInfo");
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },

  methods: {},
};
</script>

<style lang="less" scoped>
</style>