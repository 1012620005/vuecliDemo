<template>
   <div class="todo-container">
        <div class="todo-wrap">
            <Header ref="header"/><!--自定义事件传值 适合子传父组件-->
            <List :todos="todos"/><!--pubsub-js 消息订阅-->
            <Footer>
              <input type="checkbox" v-model="isCheck"  slot="isCheck"/>
              <span slot="finished">
                  <span>已完成{{finishedCount}}件</span> / 总计{{todos.length}}件
              </span>
              <button class="btn btn-warning"  @click="delFinishedTodos" slot="delFinishedTodos">清除已完成任务</button>
            </Footer> <!--solt实名插槽-->
        </div>
    </div>
</template>

<script>
import Header from './components/header'
import List from './components/list'
import Footer from './components/footer'
import locastorageuntil from './untils/locastorageuntil'
import PubSub from 'pubsub-js' 
export default {
  name: 'App',
  components: {
    Header,
    List,
    Footer
  },
  data () {
    return {
      todos: locastorageuntil.readTodos()
    }
  },
  mounted (){
    // 在组件加载完后获取ref对象的 $on 来回传addTitle
    this.$refs.header.$on('addTitle',(todo) =>{
      this.todos.unshift(todo)
    })
    // 在app中订阅
    PubSub.subscribe('DELLIST',(msg,index) =>{
      console.log(msg,index)
      this.delList(index)
    })
  },
  methods:{
    delList (index) {
      this.todos.splice(index,1)
    },
    selectAllTodos(flag){
      this.todos.forEach(todo =>{
        todo.finished = flag
      })
    },
    delFinishedTodos(){
      this.todos = this.todos.filter(todo=>!todo.finished)
    }
  },
  watch:{
    // 深度监视 便于存储
      todos: {
        handler: locastorageuntil.saveTodos,
        deep: true, // 深度监视
        // immediate: true // 初始化时调用hangdler函数
      }
  },
  computed: {
    finishedCount(){
      console.log(this.todos)
      return this.todos.reduce((total,todo) => total + (todo.finished ? 1:0),0)
                
    },
    isCheck:{
      get(){
        return this.finishedCount === this.todos.length && this.todos.length > 0
                   
      },
      set(value){
        this.selectAllTodos(value)
      }
    }
  }
}
</script>

<style lang="scss">
.todo-container {
        width: 600px;
        margin: 0 auto;
    }

    .todo-container .todo-wrap {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
</style>
