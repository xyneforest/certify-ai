import { Course, Question } from '../types';
import { AI_PROMPTS } from './prompts';

// Simulated AI generation - replace with actual API calls to Claude/OpenAI
export async function generateCourse(
  topic: string,
  difficulty: string
): Promise<Partial<Course>> {
  // In production, send AI_PROMPTS.generateCourse(topic, difficulty) to your AI API
  console.log('AI Prompt:', AI_PROMPTS.generateCourse(topic, difficulty));

  await new Promise((r) => setTimeout(r, 2000));

  const id = `ai-${Date.now()}`;
  return {
    id,
    title: `${topic} Professional Course`,
    slug: topic.toLowerCase().replace(/\s+/g, '-') + '-cert',
    description: `Comprehensive certification covering all aspects of ${topic}. This AI-generated course provides in-depth coverage of key concepts, practical applications, and industry best practices at the ${difficulty} level.`,
    shortDescription: `Master ${topic} with this AI-generated certification course.`,
    category: 'business-management',
    difficulty: difficulty as any,
    duration: 60,
    questionCount: 20,
    passingScore: 70,
    price: 0,
    rating: 0,
    enrolledCount: 0,
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop',
    tags: topic.split(' ').slice(0, 4),
    featured: false,
    createdAt: new Date().toISOString().split('T')[0],
    modules: [
      {
        id: `m-${id}-1`,
        title: `Introduction to ${topic}`,
        description: `Foundational concepts and overview of ${topic}`,
        duration: 20,
        lessons: [
          { id: `l-${id}-1`, title: `What is ${topic}?`, content: `An introduction to ${topic} and its importance in the modern world. This lesson covers the fundamental concepts, history, and current applications.`, duration: 10 },
          { id: `l-${id}-2`, title: 'Core Concepts', content: `Deep dive into the core concepts that form the foundation of ${topic}. Understanding these principles is essential for mastery.`, duration: 10 },
        ],
      },
      {
        id: `m-${id}-2`,
        title: `${topic} in Practice`,
        description: `Practical applications and hands-on exercises`,
        duration: 20,
        lessons: [
          { id: `l-${id}-3`, title: 'Real-World Applications', content: `Explore how ${topic} is applied in industry. Case studies and examples from leading organizations.`, duration: 10 },
          { id: `l-${id}-4`, title: 'Best Practices', content: `Industry best practices and methodologies for ${topic}. Learn from experts and avoid common pitfalls.`, duration: 10 },
        ],
      },
      {
        id: `m-${id}-3`,
        title: `Advanced ${topic}`,
        description: `Advanced topics and emerging trends`,
        duration: 20,
        lessons: [
          { id: `l-${id}-5`, title: 'Advanced Techniques', content: `Advanced techniques and strategies in ${topic}. This lesson builds on foundational knowledge to explore cutting-edge approaches.`, duration: 10 },
          { id: `l-${id}-6`, title: 'Future Trends', content: `Emerging trends and the future of ${topic}. Stay ahead of the curve by understanding where the field is heading.`, duration: 10 },
        ],
      },
    ],
  };
}

export async function generateQuiz(
  topic: string,
  difficulty: string,
  count: number = 10
): Promise<Question[]> {
  console.log('AI Prompt:', AI_PROMPTS.generateQuiz(topic, difficulty, count));

  await new Promise((r) => setTimeout(r, 1500));

  // Generate mock questions - in production, use AI API
  const questions: Question[] = [];
  const templates = [
    { q: `What is a fundamental principle of ${topic}?`, correct: 'Systematic approach and methodology', wrong: ['Random experimentation', 'Ignoring best practices', 'Avoiding documentation'] },
    { q: `Which best describes the role of ${topic} in modern organizations?`, correct: 'Critical for competitive advantage and innovation', wrong: ['Optional and rarely used', 'Only relevant for large companies', 'Primarily a cost center'] },
    { q: `What is a key challenge when implementing ${topic}?`, correct: 'Balancing complexity with practical requirements', wrong: ['It is always simple', 'No challenges exist', 'Only technical issues matter'] },
    { q: `How does ${topic} relate to business outcomes?`, correct: 'Directly impacts efficiency, quality, and growth', wrong: ['Has no business impact', 'Only affects technical teams', 'Reduces productivity'] },
    { q: `What skill is most important for ${topic} professionals?`, correct: 'Continuous learning and adaptation', wrong: ['Memorizing all theories', 'Working in isolation', 'Avoiding new technologies'] },
  ];

  for (let i = 0; i < Math.min(count, 10); i++) {
    const t = templates[i % templates.length];
    const options = [
      { id: 'a', text: i % 2 === 0 ? t.correct : t.wrong[0] },
      { id: 'b', text: i % 2 === 0 ? t.wrong[0] : t.correct },
      { id: 'c', text: t.wrong[1] },
      { id: 'd', text: t.wrong[2] },
    ];
    questions.push({
      id: `q-gen-${i}`,
      text: t.q,
      options,
      correctOptionId: i % 2 === 0 ? 'a' : 'b',
      explanation: `The correct answer highlights the importance of ${t.correct.toLowerCase()} in the context of ${topic}.`,
      difficulty: difficulty as any,
    });
  }

  return questions;
}
