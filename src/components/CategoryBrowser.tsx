import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import type { CatalogCategory } from "@/data/partCatalogCategories";

export interface CategoryWithCount {
  category: CatalogCategory;
  count: number;
}

function CategoryGrid({ title, items }: { title: string; items: CategoryWithCount[] }) {
  if (items.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-5">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {items.map(({ category, count }, idx) => {
          const Icon = category.icon;
          return (
            <Reveal key={category.slug} delay={(idx % 5) * 50} className="h-full">
              <Link
                href={`/spare-parts?category=${category.slug}`}
                className="group h-full flex items-center gap-3 bg-white p-3 sm:p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors duration-300">
                  <Icon className="text-accent group-hover:text-white transition-colors duration-300" size={20} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-accent transition-colors">
                    {category.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{count} {count === 1 ? "item" : "items"}</p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

export default function CategoryBrowser({
  partCategories,
  brandCategories,
}: {
  partCategories: CategoryWithCount[];
  brandCategories: CategoryWithCount[];
}) {
  return (
    <div className="text-left">
      <CategoryGrid title="Shop by Category" items={partCategories} />
      <CategoryGrid title="Shop by Vehicle Brand" items={brandCategories} />
    </div>
  );
}

/** Horizontal, scrollable row for switching category while one is selected */
export function CategoryChips({ items, activeSlug }: { items: CategoryWithCount[]; activeSlug: string }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-3 mb-8 -mx-4 px-4 [scrollbar-width:thin]">
      <Link
        href="/spare-parts"
        className="shrink-0 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:border-accent hover:text-accent transition-colors"
      >
        All Categories
      </Link>
      {/* Selected category first so it's visible without scrolling the row */}
      {[...items].sort((a, b) => Number(b.category.slug === activeSlug) - Number(a.category.slug === activeSlug)).map(({ category, count }) => {
        const active = category.slug === activeSlug;
        return (
          <Link
            key={category.slug}
            href={`/spare-parts?category=${category.slug}`}
            aria-current={active ? "page" : undefined}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              active
                ? "bg-accent border-accent text-white"
                : "bg-white border-gray-200 text-gray-700 hover:border-accent hover:text-accent"
            }`}
          >
            {category.name} <span className={active ? "text-white/80" : "text-gray-400"}>({count})</span>
          </Link>
        );
      })}
    </div>
  );
}
