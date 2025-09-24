import { useParams } from 'react-router-dom';
import { PromptGrid } from '@/components/PromptGrid';

export default function Category() {
  const { category } = useParams<{ category: string }>();
  const currentCategory = category || 'all';

  return (
    <div className="flex-1 p-6">
      <PromptGrid category={currentCategory} />
    </div>
  );
}