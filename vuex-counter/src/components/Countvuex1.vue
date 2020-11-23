<!--count -->
<template>
 <div>
     <div>{{count}}{{evenOrodd}}</div>
     <button  @click="increment">增加+</button>
     <button @click="decrement">减少-</button>
     <button  @click="incrementAsync">异步+</button>
      <button  @click="incrementEven">偶数+</button>
 </div>
</template>

<script>
export default {
 data () {
    return {
    }
 },
 computed:{
     count(){
        return this.$store.state.count
     },
     evenOrodd (){
         return this.$store.getters.EvenOrOdd
     }
 },
 methods:{
     increment () {
         this.$store.commit('INCREMENT')
     },
     decrement(){
         this.$store.commit('DECREMENT')
     },
     incrementAsync(){
        this.$store.dispatch('IncrementAsync')
     },
    incrementEven(){
        this.$store.dispatch('incrementEven')
    }
 }
 
}

</script>

<style lang='scss' scoped>

</style>
