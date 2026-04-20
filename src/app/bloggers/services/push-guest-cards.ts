import { createBlob, createCommit, createTree, getRef, type TreeItem, toBase64Utf8, updateRef } from '@/lib/github-client'
import { fileToBase64NoPrefix, hashFileSHA256 } from '@/lib/file-utils'
import { getAuthToken } from '@/lib/auth'
import { GITHUB_CONFIG } from '@/consts'
import { getFileExt } from '@/lib/utils'
import { toast } from 'sonner'
import type { GuestCard } from '../grid-view'

export type PushGuestCardsParams = {
	guestCards: GuestCard[]
	avatarFiles?: Map<string, File>
}

export async function pushGuestCards(params: PushGuestCardsParams): Promise<void> {
	const { guestCards, avatarFiles } = params
	const token = await getAuthToken()

	toast.info('Syncing guest cards...')
	const refData = await getRef(token, GITHUB_CONFIG.OWNER, GITHUB_CONFIG.REPO, `heads/${GITHUB_CONFIG.BRANCH}`)
	const latestCommitSha = refData.sha

	const treeItems: TreeItem[] = []
	const uploadedHashes = new Set<string>()
	let updatedGuestCards = [...guestCards]

	if (avatarFiles && avatarFiles.size > 0) {
		toast.info('Uploading guest photos...')
		for (const [name, file] of avatarFiles.entries()) {
			const hash = await hashFileSHA256(file)
			const ext = getFileExt(file.name)
			const filename = `${hash}${ext}`
			const publicPath = `/images/guest/${filename}`

			if (!uploadedHashes.has(hash)) {
				const path = `public/images/guest/${filename}`
				const contentBase64 = await fileToBase64NoPrefix(file)
				const blobData = await createBlob(token, GITHUB_CONFIG.OWNER, GITHUB_CONFIG.REPO, contentBase64, 'base64')
				treeItems.push({
					path,
					mode: '100644',
					type: 'blob',
					sha: blobData.sha
				})
				uploadedHashes.add(hash)
			}

			updatedGuestCards = updatedGuestCards.map(card => (card.name === name ? { ...card, avatar: publicPath } : card))
		}
	}

	const guestCardsJson = JSON.stringify(updatedGuestCards, null, '\t')
	const guestCardsBlob = await createBlob(token, GITHUB_CONFIG.OWNER, GITHUB_CONFIG.REPO, toBase64Utf8(guestCardsJson), 'base64')
	treeItems.push({
		path: 'src/app/bloggers/guest-list.json',
		mode: '100644',
		type: 'blob',
		sha: guestCardsBlob.sha
	})

	const treeData = await createTree(token, GITHUB_CONFIG.OWNER, GITHUB_CONFIG.REPO, treeItems, latestCommitSha)
	const commitData = await createCommit(token, GITHUB_CONFIG.OWNER, GITHUB_CONFIG.REPO, 'Update guest cards', treeData.sha, [latestCommitSha])
	await updateRef(token, GITHUB_CONFIG.OWNER, GITHUB_CONFIG.REPO, `heads/${GITHUB_CONFIG.BRANCH}`, commitData.sha)

	toast.success('Guest cards published')
}
