export default{
    finishedCount (state){
        return state.todos.reduce((total,todo) => total + (todo.finished ? 1:0),0)
    },
    countTotal (state){
        return state.todos.length
    },
    isCheck(getters){
        return getters.finishedCount === getters.countTotal && getters.countTotal > 0
    }
}