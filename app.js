const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

mongoose.connect("mongodb+srv://affaraffu:LkkSO09DVxd6XFeH@todotest.0kbztty.mongodb.net/?retryWrites=true&w=majority&appName=todotest");

const Task = mongoose.model("Task", { name: String });
app.get("/", async function(req, res) {
  const tasks = await Task.find({});
  res.render("list", { ejes: tasks });
});

app.post("/", async function(req, res) {
  const taskName = req.body.ele1;
  if (taskName && taskName.trim() !== "") {
    await Task.create({ name: taskName });
  }
  res.redirect("/");
});
app.put("/edit/:id", async function(req, res) {
  const id = req.params.id;
  const newText = req.body.newText;
  await Task.findByIdAndUpdate(id, { name: newText });
  res.redirect("/");
});
app.delete("/delete/:id", async function(req, res) {
  const id = req.params.id;
  await Task.findByIdAndDelete(id);
  res.redirect("/");
});
app.listen(8000, function() {
  console.log("Server is running");
});
