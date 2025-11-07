import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
    },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Pre-save hook to hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Check if model is already compiled, else compile it
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
