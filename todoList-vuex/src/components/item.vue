<template>
    <li
      @mouseenter="dealShow(true)"
      @mouseleave="dealShow(false)"
      :style="{backgroundColor: bgColor}"
    >
        <label>
            <input type="checkbox" v-model="todo.finished"/>
            <span>{{todo.title}}</span>
        </label>
        <button v-show="isShowDelButton"  class="btn btn-warning" @click="delItem">删除</button>
    </li>
</template>

<script>
    import PubSub from 'pubsub-js' 
    export default {
        name: "Item",
        data(){
          return{
              isShowDelButton: false,  // false 隐藏 true 显示
              bgColor: '#fff'
          }
        },
        props:{
            todo:Object,
            index:Number
        },
        methods: {
            dealShow(isShow){
                this.isShowDelButton = isShow
                this.bgColor = isShow ? '#ccc':'#fff'
            },

            delItem(){
                this.$store.dispatch('delete_todo',this.index)
            }
        }
    }
</script>

<style scoped>
    li {
        list-style: none;
        height: 36px;
        line-height: 36px;
        padding: 0 5px;
        border-bottom: 1px solid #ddd;
    }

    li label {
        float: left;
        cursor: pointer;
    }

    li label li input {
        vertical-align: middle;
        margin-right: 6px;
        position: relative;
        top: -1px;
    }

    li button {
        padding: 4px 10px;
        float: right;
        margin-top: 3px;
    }

    li:before {
        content: initial;
    }

    li:last-child {
        border-bottom: none;
    }
</style>