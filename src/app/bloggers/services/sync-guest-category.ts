import { toast } from 'sonner'
import { GITHUB_CONFIG } from '@/consts'
import { getAuthToken } from '@/lib/auth'
import { putFile, readTextFileFromRepo, toBase64Utf8 } from '@/lib/github-client'

type CategoriesConfig = {
	categories?: string[]
}

const CATEGORIES_PATH = 'public/blogs/categories.json'

export async function syncGuestCategory(category: string): Promise<void> {
	const nextCategory = category.trim()
	if (!nextCategory) return

	const token = await getAuthToken()

	let currentCategories: string[] = []
	try {
		const text = await readTextFileFromRepo(token, GITHUB_CONFIG.OWNER, GITHUB_CONFIG.REPO, CATEGORIES_PATH, GITHUB_CONFIG.BRANCH)
		if (text) {
			const parsed = JSON.parse(text) as CategoriesConfig | string[]
			if (Array.isArray(parsed)) {
				currentCategories = parsed.filter((item): item is string => typeof item === 'string')
			} else if (Array.isArray(parsed.categories)) {
				currentCategories = parsed.categories.filter((item): item is string => typeof item === 'string')
			}
		}
	} catch (error) {
		console.error('Failed to read categories config', error)
	}

	const uniqueCategories = Array.from(new Set([...currentCategories.map(item => item.trim()).filter(Boolean), nextCategory]))
	if (uniqueCategories.length === currentCategories.length && currentCategories.includes(nextCategory)) {
		return
	}

	const content = JSON.stringify({ categories: uniqueCategories }, null, 2)
	await putFile(
		token,
		GITHUB_CONFIG.OWNER,
		GITHUB_CONFIG.REPO,
		CATEGORIES_PATH,
		toBase64Utf8(content),
		`Add guest category: ${nextCategory}`,
		GITHUB_CONFIG.BRANCH
	)

	toast.success(`已同步分类 ${nextCategory}`)
}
