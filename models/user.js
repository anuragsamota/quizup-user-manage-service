import mongoose from "mongoose";
const { Schema } = mongoose;

// Attempted quizzes schema (formerly quizHistory)
const attemptedQuizSchema = new Schema({
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

// Organized quizzes schema (stores quiz IDs organized by the user)
const organizedQuizRefSchema = new Schema({
  quizId: { type: Schema.Types.ObjectId, ref: 'OrganizedQuiz' },
  organizedAt: { type: Date, default: Date.now }
});

const userSchema = new Schema({
  // Remove username if not used anymore
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  avatar: { type: String },
  attemptedQuizzes: [attemptedQuizSchema],    // renamed from quizHistory
  organizedQuizzes: [organizedQuizRefSchema], // new field for organized quizzes
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
