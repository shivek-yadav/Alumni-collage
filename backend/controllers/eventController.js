

import Event from '../models/event.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../utils/errorResponse.js';

export const getAllEvents = asyncHandler(async (req, res, next) => {
    const { eventType, isApproved, isVirtual } = req.query;
    let query = {};

    if (eventType) query.eventType = eventType;
    if (isApproved !== undefined) query.isApproved = isApproved === 'true';
    if (isVirtual !== undefined) query.isVirtual = isVirtual === 'true';

    const events = await Event.find(query)
        .populate('createdBy', 'name currentCompany')
        .sort('-startDate');

    res.status(200).json({
        success: true,
        count: events.length,
        data: events,
    });
});

export const getEvent = asyncHandler(async (req, res, next) => {
    const event = await Event.findById(req.params.id)
        .populate('createdBy', 'name email currentCompany')
        .populate('attendees.user', 'name email');

    if (!event) {
        return next(new ErrorResponse(`Event not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: event,
    });
});

export const createEvent = asyncHandler(async (req, res, next) => {
    req.body.createdBy = req.user.id;
    const event = await Event.create(req.body);

    res.status(201).json({
        success: true,
        data: event,
    });
});

export const updateEvent = asyncHandler(async (req, res, next) => {
    let event = await Event.findById(req.params.id);

    if (!event) {
        return next(new ErrorResponse(`Event not found with id of ${req.params.id}`, 404));
    }

    if (event.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`User ${req.user.id} is not authorized to update this event`, 401)
        );
    }

    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        data: event,
    });
});

export const deleteEvent = asyncHandler(async (req, res, next) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        return next(new ErrorResponse(`Event not found with id of ${req.params.id}`, 404));
    }

    if (event.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`User ${req.user.id} is not authorized to delete this event`, 401)
        );
    }

    await Event.findByIdAndRemove(req.params.id);

    res.status(200).json({
        success: true,
        data: {},
    });
});

export const registerEvent = asyncHandler(async (req, res, next) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        return next(new ErrorResponse(`Event not found with id of ${req.params.id}`, 404));
    }

    const alreadyRegistered = event.attendees.find(
        (att) => att.user.toString() === req.user.id
    );

    if (alreadyRegistered) {
        return next(new ErrorResponse('You are already registered for this event', 400));
    }

    if (event.maxAttendees > 0 && event.attendees.length >= event.maxAttendees) {
        return next(new ErrorResponse('Event is full', 400));
    }

    event.attendees.push({
        user: req.user.id,
        status: 'registered',
    });

    await event.save();

    res.status(200).json({
        success: true,
        message: 'Registered for event successfully',
        data: event,
    });
});

export const approveEvent = asyncHandler(async (req, res, next) => {
    const event = await Event.findByIdAndUpdate(
        req.params.id,
        { isApproved: true },
        { new: true }
    );

    if (!event) {
        return next(new ErrorResponse(`Event not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: event,
    });
});
