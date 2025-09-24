// // src/components/PromptGrid.tsx
// import { useEffect, useState, useMemo } from 'react';
// import { Loader2 } from 'lucide-react';
// import { PromptCard } from './PromptCard';
// import { Button } from '@/components/ui/button';
// import { Prompt } from '@/data/prompts';
// import { supabase } from '@/lib/supabase';

// interface PromptGridProps {
//   category: string;
// }

// export function PromptGrid({ category }: PromptGridProps) {
//   const [loading, setLoading] = useState(true);
//   const [prompts, setPrompts] = useState<Prompt[]>([]);
//   const [displayCount, setDisplayCount] = useState(12);
//   const [sortBy, setSortBy] = useState<'prompt' | 'created_at'>('created_at');
//   const [ascending, setAscending] = useState(false);

  


//   // 🔽 Fetch prompts from Supabase
//   useEffect(() => {
//     const fetchPrompts = async () => {
//       setLoading(true);

//       let query = supabase.from('prompts').select('*').order(sortBy, { ascending });

//       if (category.toLowerCase() !== 'all') {
//         query = query.ilike('category', category);
//       }

//       const { data, error } = await query;

//       if (error) {
//         console.error('Error fetching prompts:', error.message);
//       } else {
//         setPrompts(data || []);
//       }

//       setLoading(false);
//     };

//     fetchPrompts();
//   }, [category]);

//   const displayedPrompts = useMemo(() => {
//     return prompts.slice(0, displayCount);
//   }, [prompts, displayCount]);

//   const hasMore = displayCount < prompts.length;

//   const handleLoadMore = () => {
//     setDisplayCount((prev) => prev + 12);
//   };

//   const getCategoryTitle = (cat: string) => {
//     if (cat === 'all') return 'All Prompts';
//     return `${cat.charAt(0).toUpperCase() + cat.slice(1)} Prompts`;
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center py-20">
//         <Loader2 className="animate-spin w-8 h-8 text-muted-foreground" />
//       </div>
//     );
//   }

//   if (prompts.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center py-16 text-center">
//         <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
//           <Loader2 className="w-8 h-8 text-muted-foreground" />
//         </div>
//         <h3 className="text-lg font-semibold text-foreground mb-2">
//           No prompts found
//         </h3>
//         <p className="text-muted-foreground max-w-md">
//           No prompts available in the "{category}" category yet. Check back later for new additions.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">
//             {getCategoryTitle(category)}
//           </h1>
//           <p className="text-muted-foreground mt-1">
//             {prompts.length} {prompts.length === 1 ? 'prompt' : 'prompts'} available
//           </p>
//         </div>
//       </div>

//       {/* Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
//         {displayedPrompts.map((prompt) => (
//           // <PromptCard key={prompt.id} prompt={prompt} />
//           <PromptCard
//             key={prompt.id}
//             prompt={prompt}
//             onDelete={(id) => {
//               setPrompts((prev) => prev.filter((p) => p.id !== id));
//             }}
//           />
//         ))}
//       </div>

//       {/* Load More Button */}
//       {hasMore && (
//         <div className="flex justify-center pt-8">
//           <Button
//             onClick={handleLoadMore}
//             disabled={loading}
//             size="lg"
//             className="min-w-32 bg-gradient-primary hover:opacity-90 transition-opacity duration-200"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                 Loading...
//               </>
//             ) : (
//               'Load More'
//             )}
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState, useMemo } from 'react';
import { Loader2, ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import { PromptCard } from './PromptCard';
import { Button } from '@/components/ui/button';
import { Prompt } from '@/data/prompts';
import { supabase } from '@/lib/supabase';

interface PromptGridProps {
  category: string;
}

export function PromptGrid({ category }: PromptGridProps) {
  const [loading, setLoading] = useState(true);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [displayCount, setDisplayCount] = useState(12);

  const [sortBy, setSortBy] = useState<'prompt' | 'created_at'>('created_at');
  const [ascending, setAscending] = useState(false);

  useEffect(() => {
    const fetchPrompts = async () => {
      setLoading(true);

      let query = supabase.from('prompts').select('*').order(sortBy, { ascending });

      if (category.toLowerCase() !== 'all') {
        query = query.ilike('category', category);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching prompts:', error.message);
        setPrompts([]);
      } else {
        setPrompts(data || []);
      }

      setLoading(false);
    };

    fetchPrompts();
  }, [category, sortBy, ascending]);

  useEffect(() => {
    setDisplayCount(12);
  }, [category, sortBy, ascending]);

  const displayedPrompts = useMemo(() => prompts.slice(0, displayCount), [prompts, displayCount]);

  const hasMore = displayCount < prompts.length;

  const handleLoadMore = () => setDisplayCount((prev) => prev + 12);

  const getCategoryTitle = (cat: string) =>
    cat === 'all' ? 'All Prompts' : `${cat.charAt(0).toUpperCase() + cat.slice(1)} Prompts`;

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin w-8 h-8 text-muted-foreground" />
      </div>
    );
  }

  if (prompts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Loader2 className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No prompts found</h3>
        <p className="text-muted-foreground max-w-md">
          No prompts available in the "{category}" category yet. Check back later for new additions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with sorting */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{getCategoryTitle(category)}</h1>
          <p className="text-muted-foreground mt-1">
            {prompts.length} {prompts.length === 1 ? 'prompt' : 'prompts'} available
          </p>
        </div>

        {/* Sorting controls */}
        <div className="flex items-center space-x-2 bg-muted px-3 py-1 rounded-md select-none">
          {/* Sort field */}
          <button
            onClick={() => setSortBy('prompt')}
            className={`px-3 py-1 rounded cursor-pointer ${
              sortBy === 'prompt' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
            }`}
            aria-label="Sort by name"
          >
            Name
          </button>

          <button
            onClick={() => setSortBy('created_at')}
            className={`px-3 py-1 rounded cursor-pointer ${
              sortBy === 'created_at' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
            }`}
            aria-label="Sort by date"
          >
            Date
          </button>

          {/* Toggle asc/desc */}
          <button
            onClick={() => setAscending(!ascending)}
            aria-label="Toggle ascending descending"
            className="p-2 rounded cursor-pointer hover:bg-secondary flex items-center justify-center"
          >
            {ascending ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Prompt grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {displayedPrompts.map((prompt) => (
          <PromptCard
            key={prompt.id}
            prompt={prompt}
            onDelete={(id) => setPrompts((prev) => prev.filter((p) => p.id !== id))}
          />
        ))}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="flex justify-center pt-8">
          <Button
            onClick={handleLoadMore}
            disabled={loading}
            size="lg"
            className="min-w-32 bg-gradient-primary hover:opacity-90 transition-opacity duration-200"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
