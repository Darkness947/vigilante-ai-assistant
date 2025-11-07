import mongoose, { mongo, Schema } from "mongoose";

const messageSchema = new Schema ({
    role: {
        type: String,
        enum: ['user', 'model'], // 'model' is what Gemini calls itself
        required: true,
    },
}, {_id: false });  // Don'T Create IDs for sub-documents

const chatSchema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // This link to the User model
        required: true,
    },
    title: {
        type: String,
        required: true,
        default: 'New Chat',
    },
    message: [messageSchema], // An array of messages
}, { timestamps: true });

const Chat = mongoose.models.Chat || mongoose.model('Chat', chatSchema);

export default Chat;
