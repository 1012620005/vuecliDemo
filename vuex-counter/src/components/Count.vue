<!--count -->
<template>
 <div>
     <div>{{count}}{{evenOrOdd}}</div>
     <button  @click="increment">增加+</button>
     <button @click="decrement">减少-</button>
     <button  @click="incrementAsync">异步+</button>
      <button  @click="incrementIfEven">偶数+</button>
 </div>
</template>

<script>
import {mapState, mapGetters, mapActions,mapMutations} from 'vuex'
    export default {
        name: "Counter",
        computed: {
            ...mapState(['count']),
            ...mapGetters(['evenOrOdd'])
        },
        methods:{
           ...mapActions(['increment', 'decrement', 'incrementIfEven', 'incrementAsync']),
           ...mapMutations(['INCREMENT','DECREMENT'])
        },
        created (){
            console.log(this.$store)
        }
    }

</script>

<style lang='scss' scoped>

</style>
