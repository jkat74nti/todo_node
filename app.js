const express = require("express");
const app = express();
app.set("view engine", "ejs");


const todos = [{
    todoId: "1",
    todoTask: "Code",
},
{
    todoId: "2",
    todoTask: "Sleep",
},
{
    todoId: "3",
    todoTask: "Coffee",
}
];


app.use(express.json());       
app.use(express.urlencoded({extended: true})); 

app.get("/", function (req, res) {
    res.render("index", {
        data: todos,
    });
});


app.post("/", (req, res) => {
    const inputTodoId = todos.length + 1;
    const inputTodoTask = req.body.todoTask;
 
    todos.push({
        todoId: inputTodoId,
        todoTask: inputTodoTask
    });
 
    res.render("index", {
        data: todos,
    });
});


app.post("/delete", (req, res) => {
    var requestedtodoId = req.body.todoId;
    console.log("Ska ta bort todo med id " +requestedtodoId);
    var j = 0;
    todos.forEach((todo) => {
        j = j + 1;
        console.log("tittar på todo med id "+todo.todoId );
        if (todo.todoId === requestedtodoId) {
            todos.splice(j - 1, 1);
            console.log(" tagit bort todo med id: "+j);

        }
    });
    res.redirect("/");
    
    todos.forEach((todo) => {
        console.log(" todo id: "+todo.todoId);
        console.log(" todo task: "+todo.todoTask);
    });

});

app.listen(3000, (req, res) => {
    console.log("App is running on port 3000");
});
