import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost/survey', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a Question schema
const questionSchema = new mongoose.Schema({
  questionText: String,
  questionType: String,
  options: [String],
});

const Question = mongoose.model('Question', questionSchema);

// Routes
app.get('/questions', async (req, res) => {
  const questions = await Question.find();
  res.send(questions);
});

app.post('/questions', async (req, res) => {
  const question = new Question(req.body);
  await question.save();
  res.send(question);
});

app.delete('/questions/:id', async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.send({ message: 'Question deleted' });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});