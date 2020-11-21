<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!--<ListRander/>-->
  <!--<transForm/>-->
  <lifeZhou/>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
//import ListRander from './components/ListRander.vue'
// import transForm from './components/transform.vue'
import lifeZhou from './components/lifeZhou.vue'
export default {
  name: 'App',
  components: {
   // ListRander
   //transForm
   lifeZhou

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
