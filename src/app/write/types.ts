export type PublishForm = {
	slug: string
	title: string
	md: string
	pdf?: string
	tags: string[]
	date: string
	summary: string
	hidden?: boolean
	category?: string
	guest?: boolean
}

export type ImageItem = { id: string; type: 'url'; url: string } | { id: string; type: 'file'; file: File; previewUrl: string; filename: string; hash?: string }
