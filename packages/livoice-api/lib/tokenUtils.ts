export const estimateTokens = (text: string, charsPerToken = 4): number => Math.ceil(text.length / charsPerToken);
