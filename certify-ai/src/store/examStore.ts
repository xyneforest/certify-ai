import { create } from 'zustand';
import { Question, ExamAttempt, ExamFeedback } from '../types';
import { sampleQuestions } from '../data/mockData';

interface ExamState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, string>;
  isStarted: boolean;
  isCompleted: boolean;
  startTime: number | null;
  result: ExamAttempt | null;
  loadQuestions: (certId: string) => void;
  answerQuestion: (questionId: string, optionId: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  goToQuestion: (index: number) => void;
  startExam: () => void;
  submitExam: (certId: string, passingScore: number) => void;
  resetExam: () => void;
}

function generateFeedback(score: number, passed: boolean, questions: Question[], answers: Record<string, string>): ExamFeedback {
  const correct = questions.filter((q) => answers[q.id] === q.correctOptionId);
  const incorrect = questions.filter((q) => answers[q.id] && answers[q.id] !== q.correctOptionId);
  const difficultyGroups: Record<string, number[]> = {};

  questions.forEach((q) => {
    if (!difficultyGroups[q.difficulty]) difficultyGroups[q.difficulty] = [0, 0];
    difficultyGroups[q.difficulty][1]++;
    if (answers[q.id] === q.correctOptionId) difficultyGroups[q.difficulty][0]++;
  });

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  Object.entries(difficultyGroups).forEach(([diff, [got, total]]) => {
    const pct = (got / total) * 100;
    if (pct >= 75) strengths.push(`Strong performance on ${diff} questions (${Math.round(pct)}%)`);
    else if (pct < 50) weaknesses.push(`Needs improvement on ${diff} questions (${Math.round(pct)}%)`);
  });

  if (correct.length > incorrect.length) strengths.push('Good overall comprehension');
  if (incorrect.length > 0) weaknesses.push(`Missed ${incorrect.length} out of ${questions.length} questions`);

  return {
    overall: passed
      ? `Congratulations! You passed with ${score}%. ${score >= 90 ? 'Outstanding performance!' : 'Well done!'}`
      : `You scored ${score}%. You need more study to reach the passing threshold. Don't give up!`,
    strengths: strengths.length ? strengths : ['Completed the entire exam'],
    weaknesses: weaknesses.length ? weaknesses : ['No significant weaknesses detected'],
    recommendations: passed
      ? ['Consider advancing to the next difficulty level', 'Share your certification on LinkedIn']
      : ['Review the course materials for missed topics', 'Practice with flashcards', 'Retake the exam when ready'],
  };
}

export const useExamStore = create<ExamState>((set, get) => ({
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  isStarted: false,
  isCompleted: false,
  startTime: null,
  result: null,
  loadQuestions: (certId) => {
    const questions = sampleQuestions[certId] || sampleQuestions['1'] || [];
    set({ questions, currentQuestionIndex: 0, answers: {}, isStarted: false, isCompleted: false, result: null });
  },
  answerQuestion: (questionId, optionId) => {
    set((state) => ({ answers: { ...state.answers, [questionId]: optionId } }));
  },
  nextQuestion: () => {
    const { currentQuestionIndex, questions } = get();
    if (currentQuestionIndex < questions.length - 1) set({ currentQuestionIndex: currentQuestionIndex + 1 });
  },
  prevQuestion: () => {
    const { currentQuestionIndex } = get();
    if (currentQuestionIndex > 0) set({ currentQuestionIndex: currentQuestionIndex - 1 });
  },
  goToQuestion: (index) => set({ currentQuestionIndex: index }),
  startExam: () => set({ isStarted: true, startTime: Date.now() }),
  submitExam: (certId, passingScore) => {
    const { questions, answers, startTime } = get();
    const correctCount = questions.filter((q) => answers[q.id] === q.correctOptionId).length;
    const score = Math.round((correctCount / questions.length) * 100);
    const passed = score >= passingScore;
    const now = new Date().toISOString();

    const result: ExamAttempt = {
      id: `ea-${Date.now()}`,
      certificationId: certId,
      userId: 'u1',
      answers,
      score,
      passed,
      startedAt: startTime ? new Date(startTime).toISOString() : now,
      completedAt: now,
      feedback: generateFeedback(score, passed, questions, answers),
    };

    set({ isCompleted: true, result });
  },
  resetExam: () => set({
    questions: [], currentQuestionIndex: 0, answers: {},
    isStarted: false, isCompleted: false, startTime: null, result: null,
  }),
}));
