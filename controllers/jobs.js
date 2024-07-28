const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const user = req.user.userId;
  const allJobs = await Job.find({ createdBy: user }).sort("createdAt");
  res.status(StatusCodes.OK).json({ allJobs, count: allJobs.length });
};

const getJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { userId } = req.user;
  const singelJob = await Job.findOne({ createdBy: userId, _id: jobId });

  if (!singelJob) {
    throw new NotFoundError("Job not found!");
  }

  res.status(StatusCodes.OK).json(singelJob);
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const { userId } = req.user;
  const { id: jobId } = req.params;

  if (!req.body.company || !req.body.position) {
    throw new BadRequestError("Comapny and position are required for update");
  }

  const jobToUpdate = await Job.findOneAndUpdate(
    { createdBy: userId, _id: jobId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!jobToUpdate) {
    throw new NotFoundError("No job with this id found!");
  }

  res.status(StatusCodes.OK).json(jobToUpdate);
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  if (!userId || !jobId) {
    throw new BadRequestError("Action not permited");
  }

  await Job.findByIdAndRemove(jobId, { createdBy: userId });
  const allJobs = await Job.find({ createdBy: userId });

  res.status(StatusCodes.OK).json(allJobs);
};

module.exports = {
  getAllJobs,
  updateJob,
  getJob,
  createJob,
  deleteJob,
};
