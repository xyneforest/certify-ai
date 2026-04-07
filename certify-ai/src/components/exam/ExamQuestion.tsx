import { motion } from 'framer-motion';
import { Question } from '../../types';

interface ExamQuestionProps {
  question: Question;
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
  showAnswer?: boolean;
}

export function ExamQuestion({ question, selectedOptionId, onSelect, showAnswer }: ExamQuestionProps) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-medium text-surface-900 mb-6">{question.text}</h3>
      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrect = showAnswer && option.id === question.correctOptionId;
          const isWrong = showAnswer && isSelected && option.id !== question.correctOptionId;

          return (
            <button
              key={option.id}
              onClick={() => !showAnswer && onSelect(option.id)}
              disabled={showAnswer}
              className={`
                w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200
                ${isCorrect ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : ''}
                ${isWrong ? 'border-red-400 bg-red-50 text-red-900' : ''}
                ${!isCorrect && !isWrong && isSelected ? 'border-brand-500 bg-brand-50 text-brand-900' : ''}
                ${!isCorrect && !isWrong && !isSelected ? 'border-surface-200 hover:border-surface-300 hover:bg-surface-50' : ''}
                ${showAnswer ? 'cursor-default' : 'cursor-pointer'}
              `}
            >
              <div className="flex items-start gap-3">
                <span className={`
                  flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-semibold
                  ${isCorrect ? 'bg-emerald-500 text-white' : ''}
                  ${isWrong ? 'bg-red-400 text-white' : ''}
                  ${!isCorrect && !isWrong && isSelected ? 'bg-brand-500 text-white' : ''}
                  ${!isCorrect && !isWrong && !isSelected ? 'bg-surface-100 text-surface-600' : ''}
                `}>
                  {option.id.toUpperCase()}
                </span>
                <span className="text-sm leading-relaxed pt-0.5">{option.text}</span>
              </div>
            </button>
          );
        })}
      </div>
      {showAnswer && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-xl bg-brand-50 border border-brand-100"
        >
          <p className="text-sm text-brand-900 font-medium mb-1">Explanation</p>
          <p className="text-sm text-brand-700">{question.explanation}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
