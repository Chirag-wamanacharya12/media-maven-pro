
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
  private apiKey: string;

  constructor() {
    // Using a placeholder API key - in production, this should be handled securely
    this.apiKey = 'your-openai-api-key-here';
  }

  async generateContent(params: ContentGenerationParams): Promise<GeneratedContent> {
    // For demo purposes, we'll create realistic content based on the parameters
    // In production, you would replace this with actual OpenAI API calls
    
    console.log('Generating content with params:', params);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const content = this.generateMockContent(params);
      
      return this.parseGeneratedContent(content, params);
    } catch (error) {
      console.error('Content generation error:', error);
      throw new Error('Failed to generate content. Please check your parameters and try again.');
    }
  }

  private generateMockContent(params: ContentGenerationParams): string {
    const { prompt, contentType, platform, tone, maxLength } = params;
    
    const templates = {
      post: {
        instagram: {
          professional: `${prompt}\n\n✨ Key insights:\n• Professional approach matters\n• Quality over quantity\n• Consistency builds trust\n\n#${platform} #content #professional #quality`,
          casual: `Hey everyone! 👋\n\nJust wanted to share something about ${prompt.toLowerCase()}... it's honestly been such a game changer!\n\nWhat do you think? Drop a comment below! 💭\n\n#${platform} #life #sharing`,
          funny: `POV: You're trying to understand ${prompt.toLowerCase()} 😂\n\nMe: *confused screaming*\nAlso me: Let me post about it anyway 🤷‍♀️\n\nWho else can relate? 😅\n\n#relatable #${platform} #funny`,
          inspiring: `🌟 Remember: ${prompt}\n\nEvery small step counts. Every effort matters. You're capable of more than you know.\n\n✨ Believe in yourself\n💪 Take action today\n🚀 Your journey starts now\n\n#motivation #inspiration #${platform}`,
          educational: `📚 Let's talk about ${prompt}\n\nHere's what you need to know:\n\n1️⃣ Understanding the basics\n2️⃣ Practical applications\n3️⃣ Real-world benefits\n\nSave this for later! 🔖\n\n#education #learning #${platform}`,
          promotional: `🔥 EXCLUSIVE: ${prompt}\n\n✅ Limited time offer\n✅ Amazing value\n✅ Don't miss out!\n\nLink in bio 👆\nDM for details 📩\n\n#sale #exclusive #${platform}`
        }
      },
      reel: {
        instagram: {
          professional: `🎬 REEL SCRIPT: ${prompt}\n\nHook (0-3s): "The #1 mistake people make with ${prompt.toLowerCase()}"\n\nContent (3-15s): Show the problem, then reveal the solution\n\nCTA (15-30s): "Follow for more professional tips"\n\n#reels #${platform} #professional`,
          casual: `🎥 Reel idea: ${prompt}\n\n• Start with a relatable moment\n• Add trending audio\n• Keep it fun and authentic\n• End with a question for engagement\n\nTrending audio suggestions: [Popular song] or [Viral sound]\n\n#reels #viral #${platform}`,
          funny: `😂 Comedy Reel: ${prompt}\n\nSetup: "Things nobody tells you about ${prompt.toLowerCase()}"\n\nPunchlines:\n• Expectation vs Reality\n• Before vs After\n• "Me trying to..." format\n\n#comedy #reels #${platform}`,
          inspiring: `💫 Motivational Reel: ${prompt}\n\n🎯 Opening: "Your reminder that..."\n📈 Middle: Share inspiring story/fact\n⚡ Ending: "You've got this!"\n\nAdd uplifting music\n\n#motivation #inspiration #reels`,
          educational: `🧠 Educational Reel: ${prompt}\n\n📖 Hook: "3 things you didn't know about..."\n🔍 Tips: Quick, actionable advice\n💡 CTA: "Save for later!"\n\nKeep text large and readable\n\n#education #tips #reels`,
          promotional: `🛍️ Promo Reel: ${prompt}\n\n👀 Hook: "You need to see this"\n🎁 Showcase: Product/service benefits\n🔗 CTA: "Link in bio"\n\nUse trending audio for reach\n\n#promo #sale #reels`
        }
      },
      carousel: {
        instagram: {
          professional: `📊 CAROUSEL: ${prompt}\n\nSlide 1: Title + Hook\nSlide 2-4: Key points with visuals\nSlide 5: Summary + CTA\n\nEach slide should have:\n• Clear headline\n• Supporting visual\n• Consistent branding\n\n#carousel #${platform} #professional`,
          casual: `📸 Carousel post about ${prompt}\n\nSlide 1: Eye-catching cover\nSlide 2-5: Story/tips in casual tone\nSlide 6: "Swipe if you agree!"\n\nKeep it conversational and relatable\n\n#carousel #storytelling #${platform}`,
          funny: `😄 Funny Carousel: ${prompt}\n\nSlide 1: "Types of people when..."\nSlide 2-6: Different funny scenarios\nSlide 7: "Which one are you?"\n\nUse memes and relatable content\n\n#funny #carousel #relatable`,
          inspiring: `🌟 Inspiration Carousel: ${prompt}\n\nSlide 1: Powerful quote\nSlide 2-5: Supporting tips/stories\nSlide 6: "Your turn to shine"\n\nUse beautiful visuals and quotes\n\n#inspiration #motivation #carousel`,
          educational: `📚 Educational Carousel: ${prompt}\n\nSlide 1: "Ultimate guide to..."\nSlide 2-7: Step-by-step breakdown\nSlide 8: "Save for reference"\n\nInclude actionable tips\n\n#education #guide #carousel`,
          promotional: `🎯 Promo Carousel: ${prompt}\n\nSlide 1: Attention-grabbing benefit\nSlide 2-4: Features + social proof\nSlide 5: Special offer\nSlide 6: "Get yours now!"\n\n#promotion #sale #carousel`
        }
      }
    };

    // Get the appropriate template
    const contentTemplate = templates[contentType]?.[platform]?.[tone] || 
                           templates.post.instagram.professional;
    
    // Truncate if needed
    if (contentTemplate.length > maxLength) {
      return contentTemplate.substring(0, maxLength - 3) + '...';
    }
    
    return contentTemplate;
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
