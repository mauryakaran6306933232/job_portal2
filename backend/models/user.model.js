import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'],
        required: true,
    },
    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String },//url to resume
        resumeOriginalName: { type: String },
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        profilePhoto: { type: String, default: '' }
    },
    // 🔥 NEW: Referral System Fields 🔥
    referralCode: {
        type: String,
        unique: true,
        sparse: true // Allows null until generated, then must be unique
    },
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    referralCount: {
        type: Number,
        default: 0
    }
    ,
    // ■ NEW: Recent Searches Array
    recentSearches: {
        type: [String],
        default: [],
        validate: [arr => arr.length <= 5, 'Recent searches cannot exceed 5'] // Keep it lean
    },
     // ■ NEW: Capped Notifications Array
  notifications: [{
    message: { type: String, required: true },
    status: { type: String }, // e.g., 'accepted', 'rejected', 'interview'
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    read: { type: Boolean, default: false } // To track if user saw it
  }]
}, { timestamps: true });
const User = mongoose.model('User', userSchema);
export default User;