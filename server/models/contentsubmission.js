import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ContentSubmission = new Schema({
    data: String
}, { timestamps: true });

export default mongoose.model('ContentSubmission', ContentSubmission);
