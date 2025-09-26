// import { useRef, useState } from 'react';
// import { supabase } from '@/lib/supabase';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { toast } from '@/hooks/use-toast';

// export function PromptUploadForm() {
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [prompt, setPrompt] = useState('');
//   const [category, setCategory] = useState('');
//   const [uploading, setUploading] = useState(false);

//   // ⬇️ Add a ref to reset the file input
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!imageFile || !prompt || !category) {
//       toast({
//         title: 'Missing fields',
//         description: 'Please provide an image, prompt, and category.',
//         variant: 'destructive',
//       });
//       return;
//     }

//     setUploading(true);

//     const fileName = `${Date.now()}-${imageFile.name}`;
//     const { error: uploadError } = await supabase
//       .storage
//       .from('prompt-images')
//       .upload(fileName, imageFile);

//     if (uploadError) {
//       toast({
//         title: 'Upload failed',
//         description: uploadError.message,
//         variant: 'destructive',
//       });
//       setUploading(false);
//       return;
//     }

//     const { data: publicUrlData } = supabase
//       .storage
//       .from('prompt-images')
//       .getPublicUrl(fileName);

//     const imageUrl = publicUrlData.publicUrl;

//     const { error: insertError } = await supabase.from('prompts').insert({
//       image: imageUrl,
//       prompt,
//       category,
//     });

//     if (insertError) {
//       toast({
//         title: 'Database error',
//         description: insertError.message,
//         variant: 'destructive',
//       });
//     } else {
//       toast({
//         title: 'Success!',
//         description: 'Prompt uploaded successfully.',
//       });

//       // ✅ Reset form state
//       setImageFile(null);
//       setPrompt('');
//       setCategory('');

//       // ✅ Clear the file input
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//     }

//     setUploading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-md mx-auto">
//       <Input
//         type="file"
//         accept="image/*"
//         onChange={(e) => setImageFile(e.target.files?.[0] || null)}
//         ref={fileInputRef} // ⬅️ attach the ref here
//       />

//       <Textarea
//         placeholder="Enter your AI prompt"
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//       />

//       <Input
//         placeholder="Enter category (e.g., Men, Women, Creative)"
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//       />

//       <Button type="submit" disabled={uploading} className="w-full">
//         {uploading ? 'Uploading...' : 'Upload Prompt'}
//       </Button>
//     </form>
//   );
// }


import { useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { categories } from '@/data/prompts';

export function PromptUploadForm() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);

    const missingFields = [];
    if (!imageFile) missingFields.push('image');
    if (!prompt.trim()) missingFields.push('prompt');
    if (!category) missingFields.push('category');

    if (missingFields.length > 0) {
      toast({
        title: 'Missing fields',
        description: `Please provide: ${missingFields.join(', ')}`,
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);

    const fileName = `${Date.now()}-${imageFile.name}`;
    const { error: uploadError } = await supabase
      .storage
      .from('prompt-images')
      .upload(fileName, imageFile);

    if (uploadError) {
      toast({
        title: 'Upload failed',
        description: uploadError.message,
        variant: 'destructive',
      });
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase
      .storage
      .from('prompt-images')
      .getPublicUrl(fileName);

    const imageUrl = publicUrlData.publicUrl;

    const { error: insertError } = await supabase.from('prompts').insert({
      image: imageUrl,
      prompt,
      category,
    });

    if (insertError) {
      toast({
        title: 'Database error',
        description: insertError.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success!',
        description: 'Prompt uploaded successfully.',
      });

      // Reset form
      setImageFile(null);
      setPrompt('');
      setCategory('');
      setShowErrors(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }

    setUploading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-md mx-auto">
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        ref={fileInputRef}
        className={showErrors && !imageFile ? 'border-red-500' : ''}
      />

      <Textarea
        placeholder="Enter your AI prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className={showErrors && !prompt.trim() ? 'border-red-500' : ''}
      />

      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className={showErrors && !category ? 'border-red-500' : ''}>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories
            .filter((cat) => cat !== 'All') // optional: skip 'All'
            .map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Button type="submit" disabled={uploading} className="w-full">
        {uploading ? 'Uploading...' : 'Upload Prompt'}
      </Button>
    </form>
  );
}
