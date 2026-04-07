import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle } from 'lucide-react';
import { useExamStore } from '../store/examStore';
import { useCertStore } from '../store/certStore';
import { useAuthStore } from '../store/authStore';
import { ExamQuestion } from '../components/exam/ExamQuestion';
import { ExamProgress } from '../components/exam/ExamProgress';
import { ExamResult as ExamResultComponent } from '../components/exam/ExamResult';
import { Button, Modal } from '../components/ui';

export function Exam() {
  const { certId } = useParams<{ certId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { getCertById } = useCertStore();
  const {
    questions, currentQuestionIndex, answers, isStarted, isCompleted, result,
    loadQuestions, answerQuestion, nextQuestion, prevQuestion, goToQuestion,
    startExam, submitExam, resetExam,
  } = useExamStore();

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const cert = getCertById(certId || '');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/exam/' + certId);
      return;
    }
    if (certId) loadQuestions(certId);
    return () => resetExam();
  }, [certId]);

  useEffect(() => {
    if (!isStarted || isCompleted) return;
    const timer = setInterval(() => setTimeElapsed((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [isStarted, isCompleted]);

  if (!cert) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-surface-900">Certification not found</h1>
      </div>
    );
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(answers).length;
  const currentQuestion = questions[currentQuestionIndex];

  if (isCompleted && result) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ExamResultComponent
          result={result}
          certTitle={cert.title}
          onRetake={() => {
            resetExam();
            if (certId) loadQuestions(certId);
          }}
          onViewDetails={() => navigate('/dashboard')}
        />
      </div>
    );
  }

  if (!isStarted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-surface-100 shadow-card p-8 text-center"
        >
          <div className="w-16 h-16 mx-auto rounded-2xl gradient-brand flex items-center justify-center mb-5">
            <Clock size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-surface-900 mb-2">{cert.title}</h1>
          <p className="text-surface-500 mb-6">Certification Exam</p>

          <div className="grid grid-cols-3 gap-4 mb-8 max-w-sm mx-auto">
            <div className="p-3 rounded-xl bg-surface-50">
              <div className="text-lg font-bold text-surface-900">{questions.length}</div>
              <div className="text-xs text-surface-400">Questions</div>
            </div>
            <div className="p-3 rounded-xl bg-surface-50">
              <div className="text-lg font-bold text-surface-900">{cert.duration}m</div>
              <div className="text-xs text-surface-400">Time Limit</div>
            </div>
            <div className="p-3 rounded-xl bg-surface-50">
              <div className="text-lg font-bold text-surface-900">{cert.passingScore}%</div>
              <div className="text-xs text-surface-400">Passing</div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl p-4 mb-6 text-left">
            <div className="flex items-start gap-2">
              <AlertTriangle size={16} className="text-amber-600 mt-0.5" />
              <div className="text-sm text-amber-700">
                <p className="font-medium mb-1">Before you begin:</p>
                <ul className="space-y-1 text-xs">
                  <li>Ensure a stable internet connection</li>
                  <li>You can navigate between questions freely</li>
                  <li>Review all answers before submitting</li>
                </ul>
              </div>
            </div>
          </div>

          <Button size="lg" onClick={startExam}>
            Start Exam
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-surface-900">{cert.title}</h1>
          <p className="text-sm text-surface-400">Certification Exam</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-50 text-sm font-medium text-surface-600">
          <Clock size={14} />
          {formatTime(timeElapsed)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Questions */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-surface-100 shadow-card p-6 sm:p-8">
            {currentQuestion && (
              <ExamQuestion
                question={currentQuestion}
                selectedOptionId={answers[currentQuestion.id]}
                onSelect={(optionId) => answerQuestion(currentQuestion.id, optionId)}
              />
            )}

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-surface-100">
              <Button
                variant="ghost"
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>

              <div className="flex gap-2">
                {currentQuestionIndex === questions.length - 1 ? (
                  <Button onClick={() => setShowSubmitModal(true)}>
                    Submit Exam
                  </Button>
                ) : (
                  <Button onClick={nextQuestion}>
                    Next
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-surface-100 shadow-card p-4 sticky top-24">
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

      {/* Submit Modal */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Submit Exam?"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-surface-600">
            You have answered <strong>{answeredCount}</strong> out of <strong>{questions.length}</strong> questions.
          </p>
          {answeredCount < questions.length && (
            <div className="p-3 rounded-xl bg-amber-50 text-sm text-amber-700">
              You have {questions.length - answeredCount} unanswered question(s). Unanswered questions will be marked as incorrect.
            </div>
          )}
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setShowSubmitModal(false)}>
              Review Answers
            </Button>
            <Button onClick={() => {
              setShowSubmitModal(false);
              submitExam(cert.id, cert.passingScore);
            }}>
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
