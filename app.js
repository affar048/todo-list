const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
mongoose.connect("mongodb+srv://affaraffu:LkkSO09DVxd6XFeH@todotest.0kbztty.mongodb.net/todotest",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const Task = mongoose.model("Task", {
  name: String,
  priority: String,
});
app.get("/", async (req, res) => {
  const tasks = await Task.find({});
  res.render("list", { tasks });
});
app.post("/", async (req, res) => {
  const { taskName, priority } = req.body;
  if (taskName.trim()) {
    await Task.create({ name: taskName, priority });
  }
  res.redirect("/");
});
app.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const newText = req.body.newText;
  if (newText.trim()) {
    await Task.findByIdAndUpdate(id, { name: newText });
  }
  res.redirect("/");
});
app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.redirect("/");
});

app.listen(8000, () => {
  console.log("Server is running");
});
