import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Clock, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useExamStore } from '../store/examStore';
import { useAuthStore } from '../store/authStore';
import { exams, sampleQuestions } from '../data/mockData';
import { ExamQuestion } from '../components/exam/ExamQuestion';
import { ExamProgress } from '../components/exam/ExamProgress';
import { ExamResult as ExamResultComponent } from '../components/exam/ExamResult';
import { Modal } from '../components/ui';
import { DIFFICULTIES } from '../types';

export function ExamDetail() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const exam = exams.find((e) => e.id === examId);

  const {
    questions, currentQuestionIndex, answers, isStarted, isCompleted, result,
    loadQuestions, answerQuestion, nextQuestion, prevQuestion, goToQuestion,
    startExam, submitExam, resetExam,
  } = useExamStore();

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/exams/' + examId);
      return;
    }
    if (examId) {
      const qs = sampleQuestions[examId] || sampleQuestions[exam?.courseId || ''] || [];
      if (qs.length > 0) {
        useExamStore.setState({
          questions: qs, currentQuestionIndex: 0, answers: {},
          isStarted: false, isCompleted: false, result: null,
        });
      } else {
        loadQuestions(exam?.courseId || '');
      }
    }
    return () => resetExam();
  }, [examId]);

  useEffect(() => {
    if (!isStarted || isCompleted) return;
    const timer = setInterval(() => setTimeElapsed((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [isStarted, isCompleted]);

  if (!exam) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center" style={{ backgroundColor: '#faf8f4', minHeight: '100vh' }}>
        <h1 className="text-2xl font-bold mb-4" style={{ color: '#0f0f0f', fontFamily: 'Georgia, serif' }}>Exam not found</h1>
        <Link to="/exams" className="px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ backgroundColor: '#f2ede4', color: '#0f0f0f' }}>
          Browse Exams
        </Link>
      </div>
    );
  }

  const difficulty = DIFFICULTIES[exam.difficulty];
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(answers).length;
  const currentQuestion = questions[currentQuestionIndex];

  // Result screen
  if (isCompleted && result) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" style={{ backgroundColor: '#faf8f4', minHeight: '100vh' }}>
        <ExamResultComponent
          result={result}
          certTitle={exam.title}
          onRetake={() => {
            resetExam();
            const qs = sampleQuestions[examId!] || sampleQuestions[exam.courseId] || [];
            useExamStore.setState({
              questions: qs, currentQuestionIndex: 0, answers: {},
              isStarted: false, isCompleted: false, result: null,
            });
          }}
          onViewDetails={() => navigate('/exams')}
        />
      </div>
    );
  }

  // Start screen
  if (!isStarted) {
    return (
      <div style={{ backgroundColor: '#faf8f4', minHeight: '100vh' }}>
        <div className="max-w-2xl mx-auto px-4 py-16">
          <Link
            to="/exams"
            className="inline-flex items-center gap-1.5 text-sm mb-6 transition-colors"
            style={{ color: '#8a8070' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#0f0f0f')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#8a8070')}
          >
            <ArrowLeft size={14} />
            Back to Exams
          </Link>

          <div
            className="rounded-2xl p-8 text-center"
            style={{ backgroundColor: '#ffffff', border: '1px solid #ddd8cc', boxShadow: '0 2px 12px rgba(15,15,15,0.08)' }}
          >
            <div className="text-4xl mb-4">📝</div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: '#0f0f0f', fontFamily: 'Georgia, serif' }}>
              {exam.title}
            </h1>
            <p className="text-sm mb-1" style={{ color: '#8a8070' }}>
              Course: {exam.courseTitle}
            </p>
            <div className="flex justify-center mb-6">
              <span
                className="px-2.5 py-1 rounded-md text-xs font-semibold"
                style={{ backgroundColor: '#fef3dc', color: '#b87c10' }}
              >
                {difficulty.label}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8 max-w-sm mx-auto">
              {[
                { value: questions.length, label: 'Questions' },
                { value: `${exam.duration}m`, label: 'Time Limit' },
                { value: `${exam.passingScore}%`, label: 'Passing' },
              ].map((stat) => (
                <div key={stat.label} className="p-3 rounded-xl" style={{ backgroundColor: '#faf8f4' }}>
                  <div className="text-lg font-bold" style={{ color: '#0f0f0f', fontFamily: 'Georgia, serif' }}>
                    {stat.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider" style={{ color: '#8a8070' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="rounded-xl p-4 mb-6 text-left"
              style={{ backgroundColor: '#fef3dc' }}
            >
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} style={{ color: '#b87c10', marginTop: 2 }} />
                <div className="text-sm" style={{ color: '#b87c10' }}>
                  <p className="font-medium mb-1">Before you begin:</p>
                  <ul className="space-y-1 text-xs">
                    <li>Ensure a stable internet connection</li>
                    <li>You can navigate between questions freely</li>
                    <li>Review all answers before submitting</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={startExam}
              className="px-8 py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#e8a020', color: '#0f0f0f' }}
            >
              Start Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active exam
  return (
    <div style={{ backgroundColor: '#faf8f4', minHeight: '100vh' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg font-bold" style={{ color: '#0f0f0f', fontFamily: 'Georgia, serif' }}>
              {exam.title}
            </h1>
            <p className="text-xs" style={{ color: '#8a8070' }}>Certification Exam</p>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium"
            style={{ backgroundColor: '#f2ede4', color: '#0f0f0f' }}
          >
            <Clock size={14} />
            {formatTime(timeElapsed)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div
              className="rounded-xl p-6 sm:p-8"
              style={{ backgroundColor: '#ffffff', border: '1px solid #ddd8cc' }}
            >
              {currentQuestion && (
                <ExamQuestion
                  question={currentQuestion}
                  selectedOptionId={answers[currentQuestion.id]}
                  onSelect={(optionId) => answerQuestion(currentQuestion.id, optionId)}
                />
              )}

              <div
                className="flex items-center justify-between mt-8 pt-6"
                style={{ borderTop: '1px solid #ddd8cc' }}
              >
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40"
                  style={{ backgroundColor: '#f2ede4', color: '#0f0f0f' }}
                >
                  Previous
                </button>
                <div className="flex gap-2">
                  {currentQuestionIndex === questions.length - 1 ? (
                    <button
                      onClick={() => setShowSubmitModal(true)}
                      className="px-4 py-2 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
                      style={{ backgroundColor: '#e8a020', color: '#0f0f0f' }}
                    >
                      Submit Exam
                    </button>
                  ) : (
                    <button
                      onClick={nextQuestion}
                      className="px-4 py-2 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
                      style={{ backgroundColor: '#0f0f0f', color: '#faf8f4' }}
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div
              className="rounded-xl p-4 sticky top-20"
              style={{ backgroundColor: '#ffffff', border: '1px solid #ddd8cc' }}
            >
              <ExamProgress
                total={questions.length}
                current={currentQuestionIndex}
                answered={answeredCount}
                onGoTo={goToQuestion}
                answers={answers}
                questionIds={questions.map((q) => q.id)}
              />
            </div>
          </div>
        </div>

        <Modal isOpen={showSubmitModal} onClose={() => setShowSubmitModal(false)} title="Submit Exam?" size="sm">
          <div className="space-y-4">
            <p className="text-sm" style={{ color: '#4d4840' }}>
              You have answered <strong>{answeredCount}</strong> out of <strong>{questions.length}</strong> questions.
            </p>
            {answeredCount < questions.length && (
              <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: '#fef3dc', color: '#b87c10' }}>
                {questions.length - answeredCount} unanswered question(s) will be marked incorrect.
              </div>
            )}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{ backgroundColor: '#f2ede4', color: '#0f0f0f' }}
              >
                Review
              </button>
              <button
                onClick={() => {
                  setShowSubmitModal(false);
                  submitExam(exam.courseId, exam.passingScore);
                }}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#e8a020', color: '#0f0f0f' }}
              >
                Submit
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
