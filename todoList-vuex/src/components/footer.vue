<template>
    <div class="todo-footer">
        <label>
            <input type="checkbox" v-model="selectedAllOrNot"/>
        </label>
           <span>
                  <span>已完成{{finishedCount}}件</span> / 总计{{countTotal}}件
            </span>
        
        <button class="btn btn-warning"  @click="delete_finished_todo">清除已完成任务</button>
        
    </div>
</template>

<script>
    import {mapState,mapGetters,mapActions} from 'vuex'
    export default {
        name: "Footer",
        computed:{
            ...mapGetters(['finishedCount','countTotal','isCheck']),
            selectedAllOrNot: {
                get(){ // 决定是否勾选
                    return this.isCheck;
                },
                set(value){
                    this.select_all_todo(value)
                }
            }
        },
        methods:{
            ...mapActions(['select_all_todo','delete_finished_todo'])
        }

    }
</script>

<style scoped>
    .todo-footer {
        height: 40px;
        line-height: 40px;
        padding-left: 6px;
        margin-top: 5px;
    }

    .todo-footer label {
        display: inline-block;
        margin-right: 20px;
        cursor: pointer;
    }

    .todo-footer label input {
        position: relative;
        top: -1px;
        vertical-align: middle;
    }

    .todo-footer button {
        float: right;
        margin-top: 5px;
    }
</style>