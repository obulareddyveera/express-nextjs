module.exports = class store {

    constructor() {
        this.todoList = []
    }

    add(entity) {
        const newRec = { id: this.todoList.length + 1, todo: entity.todo };
        this.todoList.push(newRec);

        return newRec;
    }
    update(id, entity) {
        const indexById = this.todoList.findIndex(item => item.id === parseInt(id));
        this.todoList[indexById].todo = entity.todo;
        
        return this.todoList[indexById];
    }
    delete(id) {
        const indexById = this.todoList.findIndex(item => item.id === parseInt(id));
        return this.todoList.splice(indexById, 1);
    }

};