import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Brain, Wand2, ArrowRight, CheckCircle } from 'lucide-react';
import { Button, Input, Card } from '../components/ui';
import { generateCourse, generateQuiz } from '../api/ai';
import { Certification, Question, Difficulty, DIFFICULTIES } from '../types';

export function AIGenerate() {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('intermediate');
  const [, setGenerating] = useState(false);
  const [step, setStep] = useState<'input' | 'generating' | 'preview'>('input');
  const [generatedCourse, setGeneratedCourse] = useState<Partial<Certification> | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();

  const suggestions = [
    'Kubernetes & Container Orchestration',
    'Prompt Engineering for LLMs',
    'GraphQL API Design',
    'Blockchain Development',
    'Product Management',
    'Data Engineering with Apache Spark',
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setStep('generating');
    setGenerating(true);

    try {
      const [course, questions] = await Promise.all([
        generateCourse(topic, difficulty),
        generateQuiz(topic, difficulty, 10),
      ]);
      setGeneratedCourse(course);
      setGeneratedQuestions(questions);
      setStep('preview');
    } catch (error) {
      console.error('Generation failed:', error);
      setStep('input');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 text-violet-700 text-sm font-medium mb-4">
          <Sparkles size={14} />
          AI-Powered Generation
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-3">
          Create a certification on <span className="text-gradient">any topic</span>
        </h1>
        <p className="text-surface-500 max-w-xl mx-auto">
          Enter a topic and our AI will generate a complete course with modules, lessons, and an exam.
        </p>
      </motion.div>

      {step === 'input' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-8" hover={false}>
            <div className="space-y-6">
              <Input
                label="Topic"
                placeholder="e.g., Machine Learning with Python, Cloud Architecture..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                icon={<Brain size={16} />}
              />

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">Difficulty Level</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(Object.entries(DIFFICULTIES) as [Difficulty, { label: string }][]).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => setDifficulty(key)}
                      className={`
                        px-4 py-2.5 rounded-xl text-sm font-medium transition-all border-2
                        ${difficulty === key
                          ? 'border-brand-500 bg-brand-50 text-brand-700'
                          : 'border-surface-200 hover:border-surface-300 text-surface-600'}
                      `}
                    >
                      {val.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">Quick Suggestions</label>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setTopic(s)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-surface-50 text-surface-600 hover:bg-surface-100 transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={handleGenerate}
                disabled={!topic.trim()}
              >
                <Wand2 size={18} className="mr-2" />
                Generate Certification
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      {step === 'generating' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-20 h-20 mx-auto mb-6 relative">
            <div className="absolute inset-0 rounded-2xl gradient-brand animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles size={32} className="text-white" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-surface-900 mb-2">Generating your certification...</h2>
          <p className="text-surface-500 text-sm">Our AI is creating a complete course and exam for "{topic}"</p>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-surface-400">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              Creating modules
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
              Writing lessons
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-300 animate-pulse" style={{ animationDelay: '0.6s' }} />
              Building exam
            </span>
          </div>
        </motion.div>
      )}

      {step === 'preview' && generatedCourse && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="p-8" hover={false}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center flex-shrink-0">
                <BookOpen size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-surface-900">{generatedCourse.title}</h2>
                <p className="text-sm text-surface-500 mt-1">{generatedCourse.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 rounded-xl bg-surface-50">
                <div className="text-lg font-bold text-surface-900">{generatedCourse.modules?.length}</div>
                <div className="text-xs text-surface-400">Modules</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-surface-50">
                <div className="text-lg font-bold text-surface-900">{generatedCourse.duration}m</div>
                <div className="text-xs text-surface-400">Duration</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-surface-50">
                <div className="text-lg font-bold text-surface-900">{generatedQuestions.length}</div>
                <div className="text-xs text-surface-400">Questions</div>
              </div>
            </div>

            <h3 className="font-semibold text-surface-900 mb-3">Course Modules</h3>
            <div className="space-y-2 mb-6">
              {generatedCourse.modules?.map((module, i) => (
                <div key={module.id} className="flex items-center gap-3 p-3 rounded-xl bg-surface-50">
                  <span className="w-7 h-7 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-semibold">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-surface-900">{module.title}</div>
                    <div className="text-xs text-surface-400">{module.lessons.length} lessons &middot; {module.duration}m</div>
                  </div>
                  <CheckCircle size={16} className="text-emerald-500" />
                </div>
              ))}
            </div>

            <h3 className="font-semibold text-surface-900 mb-3">Sample Questions</h3>
            <div className="space-y-2 mb-6">
              {generatedQuestions.slice(0, 3).map((q, i) => (
                <div key={q.id} className="p-3 rounded-xl bg-surface-50 text-sm text-surface-600">
                  <span className="font-medium text-surface-900">{i + 1}.</span> {q.text}
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => { setStep('input'); setGeneratedCourse(null); setGeneratedQuestions([]); }}
              >
                Generate Another
              </Button>
              <Button onClick={() => navigate('/explore')}>
                Start Learning
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
