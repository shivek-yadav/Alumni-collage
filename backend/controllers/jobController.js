
import Job from '../models/job.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../utils/errorResponse.js';

export const getAllJobs = asyncHandler(async (req, res, next) => {
    const { jobType, company, location, isActive } = req.query;
    let query = {};

    if (jobType) query.jobType = jobType;
    if (company) query.company = { $regex: company, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };
    if (isActive !== undefined) query.isActive = isActive === 'true';

    const jobs = await Job.find(query)
        .populate('postedBy', 'name currentCompany designation')
        .sort('-createdAt');

    res.status(200).json({
        success: true,
        count: jobs.length,
        data: jobs,
    });
});

export const getJob = asyncHandler(async (req, res, next) => {
    const job = await Job.findById(req.params.id)
        .populate('postedBy', 'name currentCompany designation email')
        .populate('applications.user', 'name email');

    if (!job) {
        return next(new ErrorResponse(`Job not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: job,
    });
});

export const createJob = asyncHandler(async (req, res, next) => {
    req.body.postedBy = req.user.id;

    const job = await Job.create(req.body);
    
    

    res.status(201).json({
        success: true,
        data: job,
    });
});

export const updateJob = asyncHandler(async (req, res, next) => {
    let job = await Job.findById(req.params.id);

    if (!job) {
        return next(new ErrorResponse(`Job not found with id of ${req.params.id}`, 404));
    }

    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`User ${req.user.id} is not authorized to update this job`, 401)
        );
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        data: job,
    });
});

export const deleteJob = asyncHandler(async (req, res, next) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
        return next(new ErrorResponse(`Job not found with id of ${req.params.id}`, 404));
    }

    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`User ${req.user.id} is not authorized to delete this job`, 401)
        );
    }

    await Job.findByIdAndRemove(req.params.id);

    res.status(200).json({
        success: true,
        data: {},
    });
});

export const applyJob = asyncHandler(async (req, res, next) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
        return next(new ErrorResponse(`Job not found with id of ${req.params.id}`, 404));
    }

    const alreadyApplied = job.applications.find(
        (app) => app.user.toString() === req.user.id
    );

    if (alreadyApplied) {
        return next(new ErrorResponse('You have already applied for this job', 400));
    }

    job.applications.push({
        user: req.user.id,
        resume: req.body.resume,
        coverLetter: req.body.coverLetter,
    });

    await job.save();

    res.status(200).json({
        success: true,
        message: 'Application submitted successfully',
        data: job,
    });
});
