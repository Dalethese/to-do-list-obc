const express = require("express");
const checklistsDependentRoute = express.Router();
const simpleRouter = express.Router();
const tasksController = require("../controllers/tasksController");

checklistsDependentRoute.get("/:id/tasks/new", async (req, res) =>
  tasksController.getAll(req, res)
);
// checklistsDependentRoute.get()
checklistsDependentRoute.post("/:id/tasks", async (req, res) =>
  tasksController.post(req, res)
);

simpleRouter.put("/:id", async (req, res) => tasksController.put(req, res));
simpleRouter.delete("/:id", async (req, res) =>
  tasksController.delete(req, res)
);

module.exports = {
  checklistDependent: checklistsDependentRoute,
  simpleRouter,
};
