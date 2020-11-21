<!--  -->
<template>
 <div>
     <p v-if="show">妈妈</p>
    <p v-else>奶奶</p>
    <button v-on:click.stop="dest">销毁</button>
 </div>
</template>

<script>

export default {
    name:'',
    beforeCreate (){
        console.log('beforeCreate')
    },
    data () {
        return {
            show:false
        }
    },
    methods:{
        dest(){
            console.log()
           // this.unmount()
        }
    },
    created (){
        console.log('Created')
    },
    beforeMount (){
        console.log('beforeMount')
    },
    mounted (){
        console.log('mounted')
        console.log(this)
        // this.interVal = setInterval(() =>{
            //this.show = !this.show
            // console.log('------------++++++++++++++++')
       // },1000)
    },
    beforeUpdate (){
        console.log('beforeupdate')
    },
    updated(){
        console.log('update')
    },
    beforeUnmount (){
        console.log('beforedestroy')

    },
    unmounted (){
        console.log('destoryed')
    }
}

</script>

<style lang='scss' scoped>

</style>
