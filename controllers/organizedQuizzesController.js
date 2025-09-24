import OrganizedQuiz from '../models/organizedQuiz.js';

// Controller for organized quizzes (only for the authenticated user)
export async function getOrganizedQuizzes(req, res) {
    try {
        const userId = req.user._id;
        const quizzes = await OrganizedQuiz.find({ organizer: userId });
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
