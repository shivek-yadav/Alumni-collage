

import Connection from "../models/connection.js";
import asyncHandler from "../middleware/async.js";
import ErrorResponse from "../utils/errorResponse.js";

// @desc    Get all connections for a user
// @route   GET /api/connections
// @access  Private
export const getConnections = asyncHandler(async (req, res, next) => {
    const connections = await Connection.find({
        $or: [
            { requester: req.user.id },
            { recipient: req.user.id }
        ]
    })
        .populate("requester", "name avatar currentCompany designation")
        .populate("recipient", "name avatar currentCompany designation")
        .sort("-createdAt");

    res.status(200).json({
        success: true,
        count: connections.length,
        data: connections
    });
});

// @desc    Get pending connection requests
// @route   GET /api/connections/pending
// @access  Private
export const getPendingRequests = asyncHandler(async (req, res, next) => {
    const requests = await Connection.find({
        recipient: req.user.id,
        status: "pending"
    })
        .populate("requester", "name avatar bio currentCompany designation")
        .sort("-createdAt");

    res.status(200).json({
        success: true,
        count: requests.length,
        data: requests
    });
});

// @desc    Send connection request
// @route   POST /api/connections
// @access  Private
export const sendConnectionRequest = asyncHandler(async (req, res, next) => {
    const { recipientId, message, isMentorshipRequest, mentorshipDetails } = req.body;

    if (req.user.id === recipientId) {
        return next(new ErrorResponse("You cannot send a request to yourself", 400));
    }

    const existingConnection = await Connection.findOne({
        $or: [
            { requester: req.user.id, recipient: recipientId },
            { requester: recipientId, recipient: req.user.id }
        ]
    });

    if (existingConnection) {
        return next(new ErrorResponse("Connection already exists or request pending", 400));
    }

    const connection = await Connection.create({
        requester: req.user.id,
        recipient: recipientId,
        message,
        mentorshipRequest: isMentorshipRequest,
        mentorshipDetails: isMentorshipRequest ? mentorshipDetails : undefined
    });

    await connection.populate("requester", "name avatar");

    res.status(201).json({
        success: true,
        data: connection
    });
});

// @desc    Accept connection request
// @route   PUT /api/connections/:id/accept
// @access  Private
export const acceptConnection = asyncHandler(async (req, res, next) => {
    const connection = await Connection.findById(req.params.id);

    if (!connection) {
        return next(new ErrorResponse(`Connection not found with id of ${req.params.id}`, 404));
    }

    if (connection.recipient.toString() !== req.user.id) {
        return next(new ErrorResponse("You are not authorized to accept this request", 401));
    }

    connection.status = "accepted";
    if (connection.mentorshipRequest) {
        connection.mentorshipDetails.status = "active";
        connection.mentorshipDetails.startDate = new Date();
    }

    await connection.save();

    res.status(200).json({
        success: true,
        data: connection
    });
});

// @desc    Reject connection request
// @route   PUT /api/connections/:id/reject
// @access  Private
export const rejectConnection = asyncHandler(async (req, res, next) => {
    const connection = await Connection.findById(req.params.id);

    if (!connection) {
        return next(new ErrorResponse(`Connection not found with id of ${req.params.id}`, 404));
    }

    if (connection.recipient.toString() !== req.user.id) {
        return next(new ErrorResponse("You are not authorized to reject this request", 401));
    }

    connection.status = "rejected";
    await connection.save();

    res.status(200).json({
        success: true,
        data: connection
    });
});

// @desc    Delete connection
// @route   DELETE /api/connections/:id
// @access  Private
export const deleteConnection = asyncHandler(async (req, res, next) => {
    const connection = await Connection.findById(req.params.id);

    if (!connection) {
        return next(new ErrorResponse(`Connection not found with id of ${req.params.id}`, 404));
    }

    if (
        connection.requester.toString() !== req.user.id &&
        connection.recipient.toString() !== req.user.id
    ) {
        return next(new ErrorResponse("You are not authorized to delete this connection", 401));
    }

    await Connection.findByIdAndRemove(req.params.id);

    res.status(200).json({
        success: true,
        data: {}
    });
});
