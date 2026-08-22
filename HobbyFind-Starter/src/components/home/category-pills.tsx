import { cn } from '@/lib/utils';
import { categories } from '@/data/profiles';

interface CategoryPillsProps {
  activeCategory: '전체' | '운동형' | '수집형' | '예술형';
  onChange: (category: '전체' | '운동형' | '수집형' | '예술형') => void;
}

export function CategoryPills({ activeCategory, onChange }: CategoryPillsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {categories.map((category) => {
        const isActive = activeCategory === category.label;

        return (
          <button
            key={category.label}
            type="button"
            onClick={() => onChange(category.label)}
            className={cn(
              'pixel-chip inline-flex items-center px-4 py-2 text-sm font-bold transition-all duration-200',
              isActive
                ? 'border-[#7a5134] bg-[#ee8d5d] text-white shadow-[4px_4px_0_#d8b08d]'
                : 'border-[#d9c4aa] bg-white/80 text-[#4d3a2b] shadow-[4px_4px_0_#eadac0] hover:bg-[#f7efe8]'
            )}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
