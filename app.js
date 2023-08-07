const express = require("express");
const path = require("path");
require("./config/database");

const checkListRouter = require("./src/routes/checkLists");
const taskRouter = require("./src/routes/task");
const rootRouter = require("./src/routes/index");
const methodOverride = require("method-override");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use("/", rootRouter);
app.use("/checklists", checkListRouter);
app.use("/checklists", taskRouter.checklistDependent);
app.use("/tasks", taskRouter.simpleRouter);

app.listen(3000, () => {
  console.log("servidor iniciado");
});
