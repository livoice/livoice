import { chatCompletion, openAiModel } from '../../lib/openai';

export const generateChatTitle = async ({
  firstMessage,
  contextName
}: {
  firstMessage: string;
  contextName?: string | null;
}): Promise<string | null> => {
  if (!firstMessage.trim()) return null;

  const sanitizedMessage = firstMessage.replace(/\n/g, ' ').trim();
  const truncatedMessage = sanitizedMessage.length > 200 ? `${sanitizedMessage.slice(0, 197)}...` : sanitizedMessage;
  const contextValue = contextName ?? 'untitled';

  const prompt = `Generate a concise, descriptive title (3-6 words, max 60 chars) for this chat conversation.

Context: Project: "${contextValue}"
First message: "${truncatedMessage}"

IMPORTANT: The title should focus ONLY on the topic/question from the first message. Do NOT include the context name ("${contextValue}") or context type ("Project") in the title.

Title should:
- Capture the main topic/question from the first message
- Be specific and searchable
- Avoid generic terms like "chat" or "question"
- Use title case
- Focus on the content, not the context
- Not wrapped with quotes

Examples of GOOD titles:
- "Key Takeaways and Insights"
- "Identifying Participants"
- "Understanding Conversations"
- "Main Discussion Points"

Examples of BAD titles (DO NOT include context):
- "Key Takeaways for ${contextValue}" ❌
- "Understanding ${contextValue}" ❌
- "${contextValue} Analysis" ❌

Title only (no quotes, no explanation):`;

  try {
    const timeoutPromise = new Promise<never>((_, reject) =>
      globalThis.setTimeout(() => reject(new Error('Title generation timeout')), 3000)
    );

    const completionPromise = chatCompletion({
      model: openAiModel,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 20
    });

    const completion = await Promise.race([completionPromise, timeoutPromise]);
    const title = completion.choices?.[0]?.message?.content?.trim();

    if (!title || title.length > 60) return null;

    return title;
  } catch (error) {
    console.error('Failed to generate chat title:', error);
    return null;
  }
};

