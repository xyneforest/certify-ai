import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';
import { Question } from '../../types';
import { Button } from '../ui';

interface QuizSectionProps {
  questions: Question[];
  passingScore: number;
}

export function QuizSection({ questions, passingScore }: QuizSectionProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionId: string, optionId: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const correctCount = submitted
    ? questions.filter((q) => answers[q.id] === q.correctOptionId).length
    : 0;
  const score = submitted ? Math.round((correctCount / questions.length) * 100) : 0;
  const passed = score >= passingScore;
  const answeredAll = Object.keys(answers).length === questions.length;

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <Trophy size={32} className="mx-auto mb-3 text-surface-300" />
        <p className="text-surface-500">No quiz available for this course yet.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Score Summary */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl p-5 mb-6 ${passed ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {passed ? (
                <CheckCircle size={24} className="text-emerald-600" />
              ) : (
                <XCircle size={24} className="text-amber-600" />
              )}
              <div>
                <h3 className="font-semibold text-surface-900">
                  {passed ? 'Congratulations! You passed!' : 'Keep trying!'}
                </h3>
                <p className="text-sm text-surface-600">
                  Score: {score}% ({correctCount}/{questions.length} correct) &middot; Passing: {passingScore}%
                </p>
              </div>
            </div>
            <Button variant="secondary" size="sm" onClick={handleReset}>
              <RotateCcw size={14} className="mr-1.5" />
              Retake
            </Button>
          </div>
        </motion.div>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((q, qi) => {
          const selectedId = answers[q.id];
          const isCorrect = submitted && selectedId === q.correctOptionId;
          const isWrong = submitted && selectedId && selectedId !== q.correctOptionId;

          return (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: qi * 0.05 }}
              className="bg-white rounded-xl border border-surface-100 p-5"
            >
              <h4 className="font-medium text-surface-900 mb-4 text-sm">
                <span className="text-brand-600 mr-2">Q{qi + 1}.</span>
                {q.text}
              </h4>
              <div className="space-y-2">
                {q.options.map((opt) => {
                  const isOptionSelected = selectedId === opt.id;
                  const isOptionCorrect = submitted && opt.id === q.correctOptionId;
                  const isOptionWrong = submitted && isOptionSelected && opt.id !== q.correctOptionId;

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(q.id, opt.id)}
                      disabled={submitted}
                      className={`
                        w-full text-left px-4 py-3 rounded-lg border transition-all text-sm
                        ${isOptionCorrect ? 'border-emerald-400 bg-emerald-50 text-emerald-900' : ''}
                        ${isOptionWrong ? 'border-red-300 bg-red-50 text-red-900' : ''}
                        ${!submitted && isOptionSelected ? 'border-brand-400 bg-brand-50 text-brand-900' : ''}
                        ${!isOptionCorrect && !isOptionWrong && !isOptionSelected ? 'border-surface-200 hover:border-surface-300 hover:bg-surface-50' : ''}
                        ${submitted ? 'cursor-default' : 'cursor-pointer'}
                      `}
                    >
                      <span className="font-medium mr-2">{opt.id.toUpperCase()}.</span>
                      {opt.text}
                    </button>
                  );
                })}
              </div>
              {submitted && (isCorrect || isWrong) && (
                <div className={`mt-3 p-3 rounded-lg text-xs ${isCorrect ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                  {q.explanation}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <div className="mt-6 text-center">
          <Button size="lg" onClick={handleSubmit} disabled={!answeredAll}>
            Submit Quiz ({Object.keys(answers).length}/{questions.length} answered)
          </Button>
          {!answeredAll && (
            <p className="text-xs text-surface-400 mt-2">Answer all questions to submit</p>
          )}
        </div>
      )}
    </div>
  );
}
