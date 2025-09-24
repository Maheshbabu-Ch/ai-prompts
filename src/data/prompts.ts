export interface Prompt {
  id: string;
  image: string;
  prompt: string;
  category: string;
}

export const categories = [
  "All",
  "Women", 
  "Men",
  "Kids",
  "Anime",
  "Couple",
  "Fantasy",
  "Nature",
  "Abstract"
];

export const mockPrompts: Prompt[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    prompt: "Professional portrait of a confident businesswoman in a modern office setting, natural lighting, shallow depth of field, high resolution",
    category: "Women"
  },
  {
    id: "2", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    prompt: "Handsome man in casual wear, outdoor natural lighting, friendly smile, photorealistic style",
    category: "Men"
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop&crop=face",
    prompt: "Happy child playing in a sunny garden, vibrant colors, joyful expression, natural candid moment",
    category: "Kids"
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    prompt: "Anime-style character with colorful hair, detailed eyes, fantasy background, digital art style",
    category: "Anime"
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop",
    prompt: "Romantic couple walking on beach at sunset, golden hour lighting, silhouette photography",
    category: "Couple"
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
    prompt: "Magical fantasy forest with glowing mushrooms, ethereal lighting, mystical atmosphere, digital painting",
    category: "Fantasy"
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    prompt: "Stunning mountain landscape at sunrise, dramatic clouds, panoramic view, high dynamic range",
    category: "Nature"
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
    prompt: "Abstract geometric composition with vibrant gradients, modern art style, clean minimalist design",
    category: "Abstract"
  },
  {
    id: "9",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    prompt: "Professional headshot of a creative woman, studio lighting, artistic composition, high contrast",
    category: "Women"
  },
  {
    id: "10",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    prompt: "Stylish man in urban environment, street photography, natural expressions, cinematic lighting",
    category: "Men"
  },
  {
    id: "11",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    prompt: "Adorable toddler with bright smile, soft natural lighting, innocent expression, warm tones",
    category: "Kids"
  },
  {
    id: "12",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    prompt: "Kawaii anime girl with big eyes, pastel colors, cherry blossom background, manga style illustration",
    category: "Anime"
  }
];