<template>
  <div class="wrapper">
    <button @click="show = !show">按钮</button>
    <transition name="fade">
    <div class="transformBox" v-if="show">
        加油
    </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TransForm',
   data(){
          return {
              show: false
          }
      }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.transformBox{
    width: 200px;
    height: 200px;
    border:1px solid #cccccc;
    background:yellow;

}
.fade-enter-active, .fade-leave-active {
  transition: transform .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
   transform: scale(2.0) translateX(200px);
  
}
</style>
