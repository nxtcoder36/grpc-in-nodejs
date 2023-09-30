import grpc from 'grpc'
const todoproto = grpc.load('./todo.proto')

let todos = []

function getList(_, callback) {
    callback(null, { todos })
}

function addToList(call, callback) {
    let todo = call.request
    todos.push(todo)
    callback(null, { todos })
}

var server = new grpc.Server();
server.addService(todoproto.TodoService.service, { getList, addToList })

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error(`Server binding error: ${err}`);
    }
    console.log(`Server listening on port ${port}`);
    server.start();
});