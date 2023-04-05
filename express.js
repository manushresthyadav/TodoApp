const { urlencoded } = require("express");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

// then we want to get the schema and develop a model to perform the crud operations ->
const TaskSchema = require("./models/task");

const TaskModel = mongoose.model("task", TaskSchema);
mongoose
  .connect(
    "mongodb+srv://manu:manuisjod@cluster0.zwdpj9l.mongodb.net/todo_app?retryWrites=true&w=majority"
  )
  .then((res) => {
    app.listen(3000);
  });
app.set("view engine", "ejs");
app.use(urlencoded({ extended: true }));
app.use(express.static("views"));

app.get("/", (req, res) => {
  TaskModel.find().then((result) => {
    res.render("main", { task: result });
  });
});

app.post("/", (req, res) => {
  const newTask = new TaskModel(req.body);

  newTask.save().then((result) => {
    res.redirect("/");
  });
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).send("Wrong url accessed");
  }
  TaskModel.findByIdAndDelete(id)
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});
