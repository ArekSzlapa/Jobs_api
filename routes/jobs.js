const express = require("express");
const {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");
const authenticationMiddleware = require("../middleware/authentication");
const router = express.Router();

router.use(authenticationMiddleware);

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;
