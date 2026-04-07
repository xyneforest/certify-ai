export const AI_PROMPTS = {
  generateCourse: (topic: string, difficulty: string) => `
You are an expert course designer. Create a comprehensive certification course on "${topic}" at the ${difficulty} level.

Return a JSON object with this structure:
{
  "title": "Course title",
  "description": "Detailed description (2-3 sentences)",
  "shortDescription": "One-line summary",
  "category": "technology|business|design|data-science|marketing|cloud|security|ai-ml",
  "tags": ["tag1", "tag2", "tag3"],
  "modules": [
    {
      "title": "Module title",
      "description": "Module description",
      "duration": 20,
      "lessons": [
        {
          "title": "Lesson title",
          "content": "Detailed lesson content (500+ words covering key concepts, examples, and best practices)",
          "duration": 10
        }
      ]
    }
  ]
}

Requirements:
- Create 4-6 modules with 3-5 lessons each
- Content should be accurate, current, and professionally written
- Include practical examples and real-world applications
- Match the difficulty level appropriately
- Total duration should be 60-120 minutes
`,

  generateQuiz: (topic: string, difficulty: string, count: number) => `
You are an expert exam designer. Create ${count} multiple-choice questions for a "${topic}" certification exam at the ${difficulty} level.

Return a JSON array with this structure:
[
  {
    "text": "Question text",
    "options": [
      { "id": "a", "text": "Option A" },
      { "id": "b", "text": "Option B" },
      { "id": "c", "text": "Option C" },
      { "id": "d", "text": "Option D" }
    ],
    "correctOptionId": "b",
    "explanation": "Detailed explanation of why this answer is correct (2-3 sentences)",
    "difficulty": "${difficulty}"
  }
]

Requirements:
- Questions should test understanding, not just memorization
- Include a mix of conceptual, applied, and analytical questions
- Distractors should be plausible but clearly wrong upon careful reading
- Explanations should be educational and help the learner understand the concept
- Distribute difficulty appropriately for the ${difficulty} level
`,

  generateFeedback: (score: number, strengths: string[], weaknesses: string[]) => `
You are an educational coach. Provide personalized feedback for a student who scored ${score}% on their certification exam.

Their strengths: ${strengths.join(', ')}
Their weaknesses: ${weaknesses.join(', ')}

Provide:
1. An encouraging overall assessment (2-3 sentences)
2. Specific study recommendations for each weakness
3. Next steps for continued learning
4. Motivational closing statement

Tone: Professional, encouraging, specific, and actionable.
`,
};
