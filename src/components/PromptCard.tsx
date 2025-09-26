import { Copy, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Prompt } from '@/data/prompts';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStatus } from '@/hooks/useAuthStatus';

// const [loggedIn, setLoggedIn] = useState(false);



interface PromptCardProps {
  prompt: Prompt;
  onDelete?: (id: string) => void;
}

export function PromptCard({ prompt, onDelete }: PromptCardProps) {
  const loggedIn = useAuthStatus();
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      toast({
        title: "Prompt copied!",
        description: "The prompt has been copied to your clipboard.",
        duration: 2000,
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try copying manually.",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const handleDelete = async () => {
  const confirm = window.confirm("Are you sure you want to delete this prompt?");
  if (!confirm) return;

  // Step 1: Delete from table
  const { error: dbError } = await supabase
    .from('prompts')
    .delete()
    .eq('id', prompt.id);

  if (dbError) {
    toast({
      title: 'Error',
      description: 'Failed to delete prompt from database.',
      variant: 'destructive'
    });
    return;
  }

  // Step 2: Delete image from storage
  const imagePath = prompt.image.replace(
    'https://nrhavdvfqscppyahvddq.supabase.co/storage/v1/object/public/prompt-images/',
    ''
  );

  const { error: storageError } = await supabase
    .storage
    .from('prompt-images')
    .remove([imagePath]);

  if (storageError) {
    toast({
      title: 'Partial Success',
      description: 'Prompt deleted, but failed to remove image from storage.',
    });
  } else {
    toast({
      title: 'Deleted',
      description: 'Prompt and image successfully deleted.',
    });
    if (onDelete) onDelete(prompt.id);
  }

  // Optionally: refresh or remove from local state
  // E.g., pass a prop like onDelete(prompt.id)
};


  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="group h-full bg-gradient-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <CardContent className="p-0">
        {/* <div className="aspect-square relative overflow-hidden"> */}
        <div className="aspect-[3.5/5] relative overflow-hidden bg-gray-100 rounded-lg">
          {imageError ? (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="w-16 h-16 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                  <Copy className="w-8 h-8 text-primary/60" />
                </div>
                <p className="text-sm">Image unavailable</p>
              </div>
            </div>
              ) : (
            <img
              src={prompt.image}
              alt={`AI generated image for: ${prompt.prompt.slice(0, 50)}...`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={handleImageError}
              loading="lazy"
            />
          )}
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>
        
        <div className="p-4 space-y-3">
          {/* Category badge */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
              {prompt.category}
            </span>
          </div>
          
          {/* Prompt text */}
          <p className="text-sm text-foreground/80 line-clamp-3 leading-relaxed h-[5em]">
            {prompt.prompt}
          </p>
          
          {/* Copy button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="w-full h-9 text-xs font-medium transition-all duration-200 hover:bg-primary hover:text-primary-foreground group/btn"
            disabled={copied}
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 mr-2 transition-transform group-hover/btn:scale-110" />
                Copy Prompt
              </>
            )}
          </Button>

          {loggedIn && (
            <Button
              variant="destructive"
              size="sm"
              className="w-full h-9 text-xs font-medium"
              onClick={handleDelete}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}