import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    scheduledAt: {
        type: Date,
        required: true
    },
    location: {
        type: String, // This will hold Zoom links or physical addresses
        default: "To be determined"
    },
    notes: {
        type: String
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'],
        default: 'scheduled'
    }
}, { timestamps: true });

const Interview = mongoose.model('Interview', interviewSchema);
export default Interview;