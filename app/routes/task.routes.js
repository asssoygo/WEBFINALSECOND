const router = require("express").Router();
const auth = require("../middleware/authJwt");
const controller = require("../controllers/task.controller");

router.use(auth);

router.post("/", controller.createTask);
router.get("/", controller.getTasks);
router.get("/:id", controller.getTaskById);
router.put("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);

module.exports = router;
