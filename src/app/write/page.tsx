'use client'

import { useWriteStore } from './stores/write-store'
import { usePreviewStore } from './stores/preview-store'
import { WriteEditor } from './components/editor'
import { WriteSidebar } from './components/sidebar'
import { WriteActions } from './components/actions'
import { WritePreview } from './components/preview'
import { useEffect } from 'react'
import { isGuestCategoryName } from '@/lib/guest-posts'

export default function WritePage() {
	const { form, cover, reset, updateForm } = useWriteStore()
	useEffect(() => {
		reset()

		if (typeof window === 'undefined') return
		const params = new URLSearchParams(window.location.search)
		const category = params.get('category')?.trim() || ''
		const guestMode = params.get('guest') === '1' || isGuestCategoryName(category)

		if (category || guestMode) {
			updateForm({
				category,
				guest: guestMode
			})
		}
	}, [reset, updateForm])
	const { isPreview, closePreview } = usePreviewStore()

	const coverPreviewUrl = cover ? (cover.type === 'url' ? cover.url : cover.previewUrl) : null

	return isPreview ? (
		<WritePreview form={form} coverPreviewUrl={coverPreviewUrl} onClose={closePreview} />
	) : (
		<>
			<div className='flex h-full justify-center gap-6 px-6 pt-24 pb-12'>
				<WriteEditor />
				<WriteSidebar />
			</div>

			<WriteActions />
		</>
	)
}
