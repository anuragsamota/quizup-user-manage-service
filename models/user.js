import mongoose from "mongoose";
const { Schema } = mongoose;

const quizHistorySchema = new Schema({
  quizId: { type: Schema.Types.ObjectId, ref: 'Quiz' },
  score: Number,
  answers: [
    {
      questionId: Schema.Types.ObjectId,
      answer: Schema.Types.Mixed // string, array, or text
    }
  ],
  takenAt: { type: Date, default: Date.now }
});

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  avatar: { type: String },
  quizHistory: [quizHistorySchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
