import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: String,
    description: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    isActive: {
        type: Boolean,
        default: true, // ✅ Ensures jobs show up in student dashboard
    },
    datePosted: {
        type: Date,
        default: Date.now,
    },

});

const Job = mongoose.model('Job', jobSchema);
export default Job;
