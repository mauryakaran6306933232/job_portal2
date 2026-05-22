import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    // Optional: Link message to a specific job for context
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
export default Message;