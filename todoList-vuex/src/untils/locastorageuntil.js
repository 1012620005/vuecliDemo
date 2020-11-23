const TODO_LIST = 'todo_list';
export default {
    readTodos(){
        return JSON.parse(localStorage.getItem(TODO_LIST) || '[]');
    },
    saveTodos(todos){
        console.log(todos);
        localStorage.setItem(TODO_LIST, JSON.stringify(todos));
    }
}