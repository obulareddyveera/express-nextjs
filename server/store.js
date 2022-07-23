module.exports = class store {

    constructor() {
        this.todoList = [{id: 20, todo: "learn React.js", status: "New"}]
    }

    get(id) {
        const  entity = this.todoList.find(item => item.id  === parseInt(id));
        return  entity;
    }

    add(entity) {
        const record = { ...entity, id: this.todoList.length + 1 };
        this.todoList.push(record);
        return record;
    }
    update(id, entity) {
        const indexById = this.todoList.findIndex(item => item.id === parseInt(id));
        this.todoList[indexById] = {...this.todoList[indexById], ...entity};
        return this.todoList[indexById];
    }
    delete(id) {
        const indexById = this.todoList.findIndex(item => item.id === parseInt(id));
        const resp = this.todoList.splice(indexById, 1);
        return resp;
    }

};