
import User from '../models/user.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../utils/errorResponse.js';
import {
    searchAlumni as searchAlumniService,
    getAlumniRecommendations,
    getUserConnections,
    getPendingRequests as getPendingRequestsService,
    getSentRequests as getSentRequestsService,
    sendConnectionRequest as sendConnectionRequestService,
    acceptAlumniConnection as acceptAlumniConnectionService, // ✅ renamed to avoid conflict
    rejectConnectionRequest,
    deleteConnection as deleteConnectionService,
    getConnectionStats as getConnectionStatsService,
    getMentorshipConnections,
    updateMentorshipDetails as updateMentorshipDetailsService
} from '../services/alumniConnectionService.js';

// 📘 Get all verified alumni
export const getAllAlumni = asyncHandler(async (req, res, next) => {
    const { branch, company, skills, graduationYear } = req.query;
    const query = { role: 'alumni', isVerified: true };

    if (branch) query.branch = branch;
    if (company) query.currentCompany = { $regex: company, $options: 'i' };
    if (skills) query.skills = { $in: skills.split(',') };
    if (graduationYear) query.graduationYear = parseInt(graduationYear);

    const alumni = await User.find(query)
        .select('name avatar bio currentCompany designation branch skills linkedin github graduationYear')
        .sort('-graduationYear');

    res.status(200).json({
        success: true,
        count: alumni.length,
        data: alumni
    });
});

// 📘 Get alumni by branch
export const getAlumniByBranch = asyncHandler(async (req, res) => {
    const { branch } = req.params;
    const alumni = await User.find({
        role: 'alumni',
        isVerified: true,
        branch
    })
        .select('name avatar bio currentCompany designation skills linkedin')
        .sort('-graduationYear');

    res.status(200).json({ success: true, count: alumni.length, data: alumni });
});

// 📘 Get alumni by company
export const getAlumniByCompany = asyncHandler(async (req, res) => {
    const { company } = req.params;
    const alumni = await User.find({
        role: 'alumni',
        isVerified: true,
        currentCompany: { $regex: company, $options: 'i' }
    })
        .select('name avatar bio currentCompany designation branch skills linkedin')
        .sort('-graduationYear');

    res.status(200).json({ success: true, count: alumni.length, data: alumni });
});

// 📘 Get alumni by skills
export const getAlumniBySkills = asyncHandler(async (req, res) => {
    const { skills } = req.params;
    const skillsArray = skills.split(',').map(s => s.trim());

    const alumni = await User.find({
        role: 'alumni',
        isVerified: true,
        skills: { $in: skillsArray }
    })
        .select('name avatar bio currentCompany designation branch skills linkedin')
        .sort('-graduationYear');

    res.status(200).json({ success: true, count: alumni.length, data: alumni });
});

// 📘 Get single alumni profile
export const getAlumniProfile = asyncHandler(async (req, res, next) => {
    const alumni = await User.findById(req.params.id);

    if (!alumni || alumni.role !== 'alumni' || !alumni.isVerified) {
        return next(new ErrorResponse('Alumni not found', 404));
    }

    res.status(200).json({ success: true, data: alumni });
});

// 🔍 Search alumni by query
export const searchAlumni = asyncHandler(async (req, res, next) => {
    const { q, branch, company, graduationYear } = req.query;

    if (!q) return next(new ErrorResponse('Please provide a search query', 400));

    const results = await searchAlumniService(q, {
        branch,
        company,
        graduationYear: graduationYear ? parseInt(graduationYear) : null
    });

    res.status(200).json({
        success: true,
        count: results.length,
        data: results
    });
});

// 🎯 Get recommended alumni
export const getRecommendations = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const recommendations = await getAlumniRecommendations(req.user.id, limit);

    res.status(200).json({
        success: true,
        count: recommendations.length,
        data: recommendations
    });
});

// 🤝 Get my connections
export const getMyConnections = asyncHandler(async (req, res) => {
    const connections = await getUserConnections(req.user.id);
    res.status(200).json({
        success: true,
        count: connections.length,
        data: connections
    });
});

// 📩 Pending connection requests
export const getPendingRequests = asyncHandler(async (req, res) => {
    const requests = await getPendingRequestsService(req.user.id);
    res.status(200).json({
        success: true,
        count: requests.length,
        data: requests
    });
});

// 📤 Sent connection requests
export const getSentRequests = asyncHandler(async (req, res) => {
    const requests = await getSentRequestsService(req.user.id);
    res.status(200).json({
        success: true,
        count: requests.length,
        data: requests
    });
});

// 📨 Send new connection request
export const sendConnectionRequest = asyncHandler(async (req, res) => {
    const { message, mentorshipDetails } = req.body;
    const recipientId = req.params.id;

    const connection = await sendConnectionRequestService(
        req.user.id,
        recipientId,
        message,
        mentorshipDetails
    );

    res.status(201).json({ success: true, data: connection });
});

// ✅ Accept connection request (fixed naming conflict)
export const acceptConnection = asyncHandler(async (req, res) => {
    const connection = await acceptAlumniConnectionService(req.params.id, req.user.id);
    res.status(200).json({ success: true, data: connection });
});

// ❌ Reject connection request
export const rejectConnection = asyncHandler(async (req, res) => {
    const connection = await rejectConnectionRequest(req.params.id, req.user.id);
    res.status(200).json({ success: true, data: connection });
});

// 🗑️ Delete a connection
export const deleteConnection = asyncHandler(async (req, res) => {
    const result = await deleteConnectionService(req.params.id, req.user.id);
    res.status(200).json({ success: true, data: result });
});

// 📊 Connection stats
export const getConnectionStats = asyncHandler(async (req, res) => {
    const stats = await getConnectionStatsService(req.user.id);
    res.status(200).json({ success: true, data: stats });
});

// 🎓 Mentorship connections
export const getMentorshipConnectionsController = asyncHandler(async (req, res) => {
    const connections = await getMentorshipConnections(req.user.id);
    res.status(200).json({
        success: true,
        count: connections.length,
        data: connections
    });
});

// ✏️ Update mentorship details
export const updateMentorshipDetails = asyncHandler(async (req, res) => {
    const connection = await updateMentorshipDetailsService(
        req.params.id,
        req.user.id,
        req.body
    );
    res.status(200).json({ success: true, data: connection });
});

// 📈 Alumni statistics
export const getAlumniStats = asyncHandler(async (req, res) => {
    const totalAlumni = await User.countDocuments({ role: 'alumni', isVerified: true });

    const alumniByBranch = await User.aggregate([
        { $match: { role: 'alumni', isVerified: true } },
        { $group: { _id: '$branch', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
    ]);

    const topCompanies = await User.aggregate([
        {
            $match: {
                role: 'alumni',
                isVerified: true,
                currentCompany: { $exists: true, $ne: '' }
            }
        },
        { $group: { _id: '$currentCompany', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
    ]);

    res.status(200).json({
        success: true,
        data: { totalAlumni, alumniByBranch, topCompanies }
    });
});


// export const getMentorshipConnections = asyncHandler(async (req, res, next) => {
//     const connections = await alumniConnectionService.getMentorshipConnections(req.user.id);
//     res.status(200).json({
//         success: true,
//         data: connections
//     });
// });