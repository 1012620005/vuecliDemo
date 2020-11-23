import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count:0
  },
  mutations: { // 同步操作
    INCREMENT (state){
      state.count ++;
    },
    DECREMENT (state){
      state.count --;
    }
  },
  actions: {
    // 异步操作
    IncrementAsync ({commit}){
      setTimeout(()=>{
        commit('INCREMENT')
      },1000)
    },
    // 偶数加一
    incrementEven({commit,state}){
      if(state.count%2 === 0){
        commit('INCREMENT')
      }
    }
  },
  getters:{ // 计算属性
    // 判断奇偶数
    evenOrOdd (state){
      return  state.count%2 === 0 ? "偶数":"奇数"
    }

  },
  modules: {
  }
})
