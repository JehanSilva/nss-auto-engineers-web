import { MetadataRoute } from 'next'
import { fetchSpareParts, partSlug, partsInCategory } from '@/services/spareParts'
import { allCatalogCategories } from '@/data/partCatalogCategories'

const BASE_URL = 'https://www.nssauto.lk'

// Rebuild the sitemap hourly so new parts get listed
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const parts = await fetchSpareParts()

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/spare-parts`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...allCatalogCategories
      .filter((category) => partsInCategory(parts, category).length > 0)
      .map((category) => ({
        url: `${BASE_URL}/spare-parts?category=${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })),
    ...parts.map((part) => ({
      url: `${BASE_URL}/spare-parts/${partSlug(part)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    {
      url: `${BASE_URL}/privacy-policy`,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/terms-of-service`,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]
}
