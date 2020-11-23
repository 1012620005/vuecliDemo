import {ADD_TODO,DELETE_TODO,SELECT_ALL_TODO,DELETE_FINISHED_TODO} from "./mutation-type"
export default{
    add_todo({commit},todo){
        commit(ADD_TODO,{todo})
    },
    delete_todo({commit},index){
        commit(DELETE_TODO,{index})
    },
    select_all_todo({commit},flag){
        commit(SELECT_ALL_TODO,{flag})
    },
    delete_finished_todo({commit}){
        commit(DELETE_FINISHED_TODO)
    }
}