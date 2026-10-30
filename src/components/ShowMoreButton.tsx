'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function ShowMoreButton({ href }: { href: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => router.push(href, { scroll: false }))}
      disabled={isPending}
      className="px-8 py-3 bg-accent text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
    >
      {isPending ? 'Loading…' : 'Show More'}
    </button>
  );
}
