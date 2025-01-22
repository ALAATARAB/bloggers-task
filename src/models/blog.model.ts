import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    }
});

export default mongoose.model('blog',Schema);