import mongoose from "mongoose";
const { Schema } = mongoose;

const organizedQuizSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String },
  questions: { type: Number },
  organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('OrganizedQuiz', organizedQuizSchema);
