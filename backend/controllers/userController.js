

import User from '../models/user.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../utils/errorResponse.js';

// Get all users
export const getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
});

// Get single user
export const getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorResponse('User not found', 404));
    }
    res.status(200).json({ success: true, data: user });
});

// Update user
export const updateUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!user) {
        return next(new ErrorResponse('User not found', 404));
    }

    res.status(200).json({ success: true, data: user });
});

// ✅ Add this new deleteUser function
export const deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return next(new ErrorResponse('User not found', 404));
    }

    res.status(200).json({ success: true, message: 'User deleted successfully' });
});

export const getAllAlumni = asyncHandler(async (req, res, next) => {
    const alumni = await User.find({ role: "alumni" }).select("-password");

    res.status(200).json({
        success: true,
        count: alumni.length,
        data: alumni,
    });
});

// ✅ Search users by name, email, or company
export const searchUsers = asyncHandler(async (req, res, next) => {
    const { query } = req.query;

    if (!query || query.trim() === "") {
        return next(new ErrorResponse("Please provide a search query", 400));
    }

    const users = await User.find({
        $or: [
            { name: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
            { currentCompany: { $regex: query, $options: "i" } },
        ],
    }).select("-password");

    res.status(200).json({
        success: true,
        count: users.length,
        data: users,
    });
});

