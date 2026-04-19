import type { BlogConfig } from '@/app/blog/types'
import type { BlogIndexItem } from '@/app/blog/types'

export type { BlogConfig } from '@/app/blog/types'

export type LoadedBlog = {
	slug: string
	config: BlogConfig
	markdown: string
	cover?: string
}

export function normalizeBlogSlug(slug: string): string {
	if (!slug) return ''

	try {
		return decodeURIComponent(slug)
	} catch {
		return slug
	}
}

/**
 * Load blog data from public/blogs/{slug}
 * Used by both view page and edit page
 */
export async function loadBlog(slug: string): Promise<LoadedBlog> {
	const normalizedSlug = normalizeBlogSlug(slug)

	if (!normalizedSlug) {
		throw new Error('Slug is required')
	}

	// Load config.json
	let config: BlogConfig = {}
	const configRes = await fetch(`/blogs/${encodeURIComponent(normalizedSlug)}/config.json`)
	if (configRes.ok) {
		try {
			config = await configRes.json()
		} catch {
			config = {}
		}
	}

	// Load index.md
	const mdRes = await fetch(`/blogs/${encodeURIComponent(normalizedSlug)}/index.md`)
	if (!mdRes.ok) {
		const fallback = await loadFromIndexFallback(normalizedSlug)
		if (fallback) {
			return fallback
		}
		throw new Error('Blog not found')
	}
	const markdown = await mdRes.text()

	return {
		slug: normalizedSlug,
		config,
		markdown,
		cover: config.cover
	}
}

async function loadFromIndexFallback(slug: string): Promise<LoadedBlog | null> {
	try {
		const indexRes = await fetch('/blogs/index.json')
		if (!indexRes.ok) return null

		const list = (await indexRes.json()) as BlogIndexItem[]
		const item = list.find(entry => entry.slug === slug)
		if (!item) return null

		const fallbackConfig: BlogConfig = {
			title: item.title,
			tags: item.tags,
			date: item.date,
			summary: item.summary,
			cover: item.cover,
			hidden: item.hidden,
			category: item.category,
			pdf: item.pdf
		}

		return {
			slug,
			config: fallbackConfig,
			markdown: ''
		}
	} catch {
		return null
	}
}
