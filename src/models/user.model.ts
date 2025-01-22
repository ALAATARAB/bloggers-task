import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    username: {
        type: String,
        required:true
    },
    email: {
        type: String,
        unique:true,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    role: {
        type: String,
        // enum:['user','admin'],
        default:'user'
    }
});

export default mongoose.model('user',Schema);