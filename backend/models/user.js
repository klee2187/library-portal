import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, requried: true},
    age: { type: Number, required: true},
    email: { type: String, required: true },
    phoneNum: { type: String, required: true },
    address: { type: String, required: true },
});

export default mongoose.model('user', userSchema);