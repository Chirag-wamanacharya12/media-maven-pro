import { config } from '../config/environment';

export interface ContentGenerationParams {
  prompt: string;
  contentType: string;
  platform: string;
  tone: string;
  creativity: number;
  maxLength: number;
  slideCount?: number;
}

export interface GeneratedContent {
  content: string;
  hashtags?: string[];
  characterCount: number;
  platform: string;
  contentType: string;
}

export class ContentGenerationService {
  private apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    console.log('API Key loaded:', !!this.apiKey); // Debug log
    if (!this.apiKey) {
      throw new Error('Gemini API key not configured');
    }
  }

  async generateContent(params: ContentGenerationParams): Promise<GeneratedContent> {
    console.log('Generating content with params:', params);

    try {
      const cleanedPrompt = this.extractTopic(params.prompt);

      const isCarousel = params.contentType === 'carousel';
      const promptText = isCarousel
        ? `Create a carousel with exactly ${params.slideCount || 4} slides. Number them clearly (e.g., **Slide 1:**). Make each slide short, emoji-rich, and highly relatable. End with a fun CTA.\n\nTopic: ${cleanedPrompt}`
        : `Generate a ${params.contentType} for ${params.platform} in a ${params.tone} tone. Keep it under ${params.maxLength} characters. Be engaging and natural. Topic: ${cleanedPrompt}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: promptText,
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: params.creativity,
              maxOutputTokens: params.contentType === 'carousel'
                ? (params.slideCount || 6) * 80  // ~80 tokens per slide
                : Math.floor(params.maxLength / 4)
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error (${response.status}): ${response.statusText}`);
      }

      const result = await response.json();
      const aiContent = result.candidates?.[0]?.content?.parts?.[0]?.text || '';

      return this.parseGeneratedContent(aiContent, { ...params, slideCount: params.slideCount });

    } catch (error) {
      console.error('Content generation error:', error);
      if (error instanceof Error) {
        throw new Error(`Content generation failed: ${error.message}`);
      }
      throw new Error('Content generation failed due to an unknown error');
    }
  }

  private extractTopic(prompt: string): string {
    let cleaned = prompt.toLowerCase().trim();

    const slangMap: { [key: string]: string } = {
      'wanna': 'want to', 'gonna': 'going to', 'ppl': 'people', 'u': 'you',
      'kinda': 'kind of', 'lemme': 'let me', 'hey': '', 'yo': '',
      'like': '', 'some': '', 'pls': 'please', 'reelz': 'reels',
      'tbh': 'to be honest'
    };
    for (const slang in slangMap) {
      const regex = new RegExp(`\\b${slang}\\b`, 'gi');
      cleaned = cleaned.replace(regex, slangMap[slang]);
    }

    cleaned = cleaned.replace(/(can you|would you|i want to|i'm thinking of|i would like to|help me|let's|any good angle\??|suggest something|create|generate|write|make a|do a|do some)\s+/gi, '');
    cleaned = cleaned.replace(/(reel|post|caption|story|bio|ad copy|carousel|content)\s+(on|about|around|for)?/gi, '');
    cleaned = cleaned.replace(/[^\w\s]+/gi, '').replace(/\s+/g, ' ').trim();

    return cleaned || 'general topic';
  }

  private parseGeneratedContent(content: string, params: ContentGenerationParams): GeneratedContent {
    const hashtagRegex = /#[\w]+/g;
    const hashtags = content.match(hashtagRegex) || [];

    let trimmedContent = content;

    if (params.contentType === 'carousel' && params.slideCount) {
      const slideBlocks: string[] = [];
      const lines = content.split('\n');
    
      let currentBlock: string[] = [];
    
      for (const line of lines) {
        if (line.trim().toLowerCase().startsWith('**slide')) {
          if (currentBlock.length > 0) {
            slideBlocks.push(currentBlock.join('\n'));
          }
          currentBlock = [line];
        } else {
          currentBlock.push(line);
        }
      }
      if (currentBlock.length > 0) {
        slideBlocks.push(currentBlock.join('\n'));
      }
    
      const trimmedSlides = slideBlocks.slice(0, params.slideCount);
      trimmedContent = trimmedSlides.join('\n\n');
    }    


    return {
      content: trimmedContent.trim(),
      hashtags: hashtags,
      characterCount: trimmedContent.length,
      platform: params.platform,
      contentType: params.contentType
    };
  }
}

// *** NEW: Get the Dezgo API Key from environment variables ***
const dezgoApiKey = import.meta.env.VITE_DEZGO_API_KEY; // This will read from .env.local

export async function generateDezgoImage(prompt: string): Promise<Blob> {
  // *** NEW: Add a check for the API Key ***
  if (!dezgoApiKey) {
    console.error("VITE_DEZGO_API_KEY is not set in your environment variables. Please check your .env file and restart the server.");
    throw new Error("Dezgo API Key is not configured.");
  }

  const formData = new FormData();
  formData.append("prompt", prompt);
  formData.append("model", "dreamshaper");
  formData.append("width", "768");
  formData.append("height", "768");

  const response = await fetch("https://api.dezgo.com/text2image", {
    method: "POST",
    // *** NEW: Add the API key to the headers ***
    headers: {
      // You MUST verify this header name with Dezgo's official API documentation.
      // 'X-Dezgo-Api-Key' is a common custom header for API keys.
      // If Dezgo uses a standard Bearer token, it would be:
      // 'Authorization': `Bearer ${dezgoApiKey}`,
      'X-Dezgo-Api-Key': dezgoApiKey, // Try this first as it's common for simple API key auth
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    // console.error('Dezgo API Error:', response.status, response.statusText, errorText); // This log is already there, no need to add again
    throw new Error(`Image generation failed: ${response.status} - ${errorText}`);
  }

  return await response.blob();
}