
export interface ContentGenerationParams {
  prompt: string;
  contentType: string;
  platform: string;
  tone: string;
  creativity: number;
  maxLength: number;
}

export interface GeneratedContent {
  content: string;
  hashtags?: string[];
  characterCount: number;
  platform: string;
  contentType: string;
}

export class ContentGenerationService {
  private apiKey: string | null = null;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || null;
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateContent(params: ContentGenerationParams): Promise<GeneratedContent> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key is required');
    }

    const systemPrompt = this.buildSystemPrompt(params);
    const userPrompt = this.buildUserPrompt(params);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4.1-2025-04-14',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: params.creativity,
          max_tokens: Math.min(params.maxLength * 2, 4000),
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      const generatedText = data.choices[0]?.message?.content || '';

      return this.parseGeneratedContent(generatedText, params);
    } catch (error) {
      console.error('Content generation error:', error);
      throw error;
    }
  }

  private buildSystemPrompt(params: ContentGenerationParams): string {
    const platformSpecs = this.getPlatformSpecs(params.platform);
    const contentTypeSpecs = this.getContentTypeSpecs(params.contentType);

    return `You are an expert social media content creator specializing in ${params.platform} content.

PLATFORM SPECIFICATIONS:
${platformSpecs}

CONTENT TYPE: ${contentTypeSpecs}

TONE: ${params.tone}
CHARACTER LIMIT: ${params.maxLength}

INSTRUCTIONS:
- Create engaging, ${params.tone} content optimized for ${params.platform}
- Follow ${params.platform} best practices and trends
- Include relevant hashtags (but count them in character limit)
- Make content actionable and engaging
- Use emojis appropriately for the platform
- Ensure content fits within ${params.maxLength} characters
- Focus on value, engagement, and platform-specific formatting

Return only the content, nothing else.`;
  }

  private buildUserPrompt(params: ContentGenerationParams): string {
    return `Create ${params.contentType} content for ${params.platform} with a ${params.tone} tone about: ${params.prompt}

Make it engaging, platform-appropriate, and within ${params.maxLength} characters.`;
  }

  private getPlatformSpecs(platform: string): string {
    const specs = {
      instagram: 'Focus on visual storytelling, use relevant hashtags (5-10), include call-to-action, optimize for discovery',
      tiktok: 'Trending sounds, hooks in first 3 seconds, use trending hashtags, encourage engagement',
      youtube: 'SEO-optimized titles, compelling thumbnails, clear value proposition, longer-form descriptions',
      twitter: 'Concise messaging, trending topics, retweet-worthy content, use threads for longer content',
      facebook: 'Community-focused, longer captions allowed, encourage meaningful conversations',
      linkedin: 'Professional tone, industry insights, thought leadership, networking focus'
    };
    return specs[platform] || specs.instagram;
  }

  private getContentTypeSpecs(contentType: string): string {
    const specs = {
      post: 'Single social media post with caption and hashtags',
      reel: 'Short-form video script with hook, content, and call-to-action',
      carousel: 'Multi-slide post with title and individual slide content',
      story: 'Ephemeral content for stories format',
      caption: 'Image caption that complements visual content',
      hashtags: 'Strategic hashtags for discovery and reach',
      'ad-copy': 'Advertising copy focused on conversion',
      bio: 'Profile bio that clearly communicates value proposition'
    };
    return specs[contentType] || specs.post;
  }

  private parseGeneratedContent(content: string, params: ContentGenerationParams): GeneratedContent {
    // Extract hashtags if present
    const hashtagRegex = /#[\w]+/g;
    const hashtags = content.match(hashtagRegex) || [];

    return {
      content: content.trim(),
      hashtags: hashtags,
      characterCount: content.length,
      platform: params.platform,
      contentType: params.contentType
    };
  }
}
