<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <Footer v-show="$route.meta.show" ></Footer>
    
  </div>
</template>

<script>

  import Header from './components/header'
  import Footer from './components/footer'
  export default {
    name: 'App',
    components: {
      Header,
      Footer
    },
    mounted() {
      // 派发action获取商品分类的三级列表
      this.$store.dispatch("getCategoryList")
    },
  }
</script>

<style>
</style>
