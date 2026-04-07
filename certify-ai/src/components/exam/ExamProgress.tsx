interface ExamProgressProps {
  total: number;
  current: number;
  answered: number;
  onGoTo: (index: number) => void;
  answers: Record<string, string>;
  questionIds: string[];
}

export function ExamProgress({ total, current, answered, onGoTo, answers, questionIds }: ExamProgressProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-surface-500">
          Question <span className="font-semibold text-surface-900">{current + 1}</span> of {total}
        </span>
        <span className="text-surface-500">
          <span className="font-semibold text-surface-900">{answered}</span> answered
        </span>
      </div>

      <div className="h-1.5 bg-surface-100 rounded-full overflow-hidden">
        <div
          className="h-full gradient-brand rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {questionIds.map((qId, i) => {
          const isAnswered = !!answers[qId];
          const isCurrent = i === current;

          return (
            <button
              key={qId}
              onClick={() => onGoTo(i)}
              className={`
                w-8 h-8 rounded-lg text-xs font-medium transition-all duration-200
                ${isCurrent ? 'bg-surface-900 text-white scale-110' : ''}
                ${!isCurrent && isAnswered ? 'bg-brand-100 text-brand-700' : ''}
                ${!isCurrent && !isAnswered ? 'bg-surface-50 text-surface-400 hover:bg-surface-100' : ''}
              `}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
