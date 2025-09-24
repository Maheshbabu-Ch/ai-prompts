// import { useState } from 'react';
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

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!imageFile || !prompt || !category) {
//       toast({
//         title: "Missing fields",
//         description: "Please provide an image, prompt, and category.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setUploading(true);

//     // 1. Upload image to Supabase Storage
//     const fileName = `${Date.now()}-${imageFile.name}`;
//     const { data: uploadData, error: uploadError } = await supabase
//       .storage
//       .from('prompt-images')
//       .upload(fileName, imageFile);

//     if (uploadError) {
//       toast({
//         title: "Upload failed",
//         description: uploadError.message,
//         variant: "destructive",
//       });
//       setUploading(false);
//       return;
//     }

//     // 2. Get public URL
//     const { data: publicUrlData } = supabase
//       .storage
//       .from('prompt-images')
//       .getPublicUrl(fileName);

//     const imageUrl = publicUrlData.publicUrl;

//     // 3. Insert into prompts table
//     const { error: insertError } = await supabase.from('prompts').insert({
//       image: imageUrl,
//       prompt,
//       category,
//     });

//     if (insertError) {
//       toast({
//         title: "Database error",
//         description: insertError.message,
//         variant: "destructive",
//       });
//     } else {
//       toast({
//         title: "Success!",
//         description: "Prompt uploaded successfully.",
//       });

//       // Reset form
//       setImageFile(null);
//       setPrompt('');
//       setCategory('');
//     }

//     setUploading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-md mx-auto">
//       <Input
//         type="file"
//         accept="image/*"
//         onChange={(e) => setImageFile(e.target.files?.[0] || null)}
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


import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

export function PromptUploadForm() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile || !prompt || !category) {
      toast({
        title: "Missing fields",
        description: "Please provide an image, prompt, and category.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    // 1. Upload image to Supabase Storage
    const fileName = `${Date.now()}-${imageFile.name}`;
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('prompt-images')
      .upload(fileName, imageFile);

    if (uploadError) {
      toast({
        title: "Upload failed",
        description: uploadError.message,
        variant: "destructive",
      });
      setUploading(false);
      return;
    }

    // 2. Get public URL
    const { data: publicUrlData } = supabase
      .storage
      .from('prompt-images')
      .getPublicUrl(fileName);

    const imageUrl = publicUrlData.publicUrl;

    // 3. Insert into prompts table
    const { error: insertError } = await supabase.from('prompts').insert({
      image: imageUrl,
      prompt,
      category,
    });

    if (insertError) {
      toast({
        title: "Database error",
        description: insertError.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success!",
        description: "Prompt uploaded successfully.",
      });

      // Reset form
      setImageFile(null);
      setPrompt('');
      setCategory('');
    }

    setUploading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-md mx-auto">
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
      />

      <Textarea
        placeholder="Enter your AI prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <Input
        placeholder="Enter category (e.g., Men, Women, Creative)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <Button type="submit" disabled={uploading} className="w-full">
        {uploading ? 'Uploading...' : 'Upload Prompt'}
      </Button>
    </form>
  );
}
