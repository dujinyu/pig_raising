<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <HelloWorld/> -->
    <router-view></router-view>
    <!-- <test></test> -->
    <!-- <vux /> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import Vux from './components/vux'
// import Test from "@/view/test"
export default {
  name: 'App',
  components: {
    // HelloWorld
    Vux,
    // Test
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
