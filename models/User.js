import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export default mongoose.model('User ', UserSchema); // Ensure to export the model