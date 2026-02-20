const Job = require("../models/Job");

/*
  Get All Active Jobs
*/
exports.getAllJobs = async (req, res) => {
  const jobs = await Job.find({ isActive: true });
  res.json(jobs);
};

/*
  Admin: Create Job
*/
exports.createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(201).json(job);
};
