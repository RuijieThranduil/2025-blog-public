export const GUEST_CATEGORY_PREFIX = 'Guest · '

export function isGuestCategoryName(category?: string | null): boolean {
	return (category || '').trim().startsWith(GUEST_CATEGORY_PREFIX)
}

export function isGuestArticle(item?: { guest?: boolean; category?: string | null } | null): boolean {
	if (!item) return false
	return !!item.guest || isGuestCategoryName(item.category)
}
