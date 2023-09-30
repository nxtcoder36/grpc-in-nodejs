import grpc from "grpc";

var protoPath = './todo.proto'

const TodoService = grpc.load(protoPath).TodoService

const client = new TodoService('localhost:50051', grpc.credentials.createInsecure())

client.getList({},(error,todos) => {
    console.log(todos)
})

let newTodo = {
    id: 1,
    todo: "work"
}

client.addToList(newTodo, (err) => {
    console.log("record inserted")
})