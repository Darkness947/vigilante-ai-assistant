import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
    role: {
        type: String,
        enum: ['user', 'model'], // 'model' is what Gemini calls itself
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { _id: false }); // Don't create IDs for sub-documents

const chatSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // This links to our User model
        required: true,
    },
    title: {
        type: String,
        required: true,
        default: 'New Chat', // Default title for new chats
    },
    
    // --- THIS IS THE FIX ---
    // Make sure this is 'messages' (plural)
    messages: [messageSchema], 
    // --- END OF FIX ---

}, { timestamps: true }); // Adds createdAt and updatedAt

const Chat = mongoose.models.Chat || mongoose.model('Chat', chatSchema);

export default Chat;
