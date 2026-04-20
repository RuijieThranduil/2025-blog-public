'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, Globe2, Plus, Sparkles, Trash2, UserRoundPlus } from 'lucide-react'
import { toast } from 'sonner'
import { syncGuestCategory } from './services/sync-guest-category'
import { pushGuestCards } from './services/push-guest-cards'
import { useAuthStore } from '@/hooks/use-auth'
import initialGuestCards from './guest-list.json'

export interface GuestCard {
	name: string
	avatar: string
	description: string
}

export type BloggerStatus = 'recent' | 'disconnected'

export interface Blogger {
	name: string
	avatar: string
	url: string
	description: string
	stars: number
	status?: BloggerStatus
}

type BlogIndexEntry = {
	category?: string
}

const STORAGE_KEY = 'guest-cards'

function buildGuestCategory(name: string) {
	return `Guest · ${name}`
}

function extractGuestName(category: string) {
	return category.replace(/^Guest\s*·\s*/, '').trim()
}

function createFallbackAvatar(name: string) {
	return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ecf5f8&color=243442&bold=true`
}

function mergeGuestCards(...lists: GuestCard[][]) {
	const merged = new Map<string, GuestCard>()

	for (const list of lists) {
		for (const item of list) {
			if (!item?.name?.trim()) continue
			const name = item.name.trim()
			const prev = merged.get(name)
			merged.set(name, {
				name,
				avatar: item.avatar?.trim() || prev?.avatar || createFallbackAvatar(name),
				description: item.description?.trim() || prev?.description || `Shared guest archive for ${name}.`
			})
		}
	}

	return Array.from(merged.values()).sort((a, b) => a.name.localeCompare(b.name))
}

function readFileAsDataUrl(file: File) {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = () => {
			if (typeof reader.result === 'string') {
				resolve(reader.result)
				return
			}
			reject(new Error('Failed to read image file'))
		}
		reader.onerror = () => reject(reader.error ?? new Error('Failed to read image file'))
		reader.readAsDataURL(file)
	})
}

export default function GridView() {
	const [guestCards, setGuestCards] = useState<GuestCard[]>(initialGuestCards as GuestCard[])
	const [isCreateOpen, setIsCreateOpen] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [draftAvatarFile, setDraftAvatarFile] = useState<File | null>(null)
	const [pendingSave, setPendingSave] = useState<{ nextCards: GuestCard[]; category?: string; avatarFile?: File | null; avatarName?: string } | null>(null)
	const [draft, setDraft] = useState<GuestCard>({
		name: '',
		avatar: '',
		description: ''
	})

	const keyInputRef = useRef<HTMLInputElement>(null)
	const { isAuth, setPrivateKey } = useAuthStore()

	useEffect(() => {
		let isCancelled = false

		const hydrateGuestCards = async () => {
			let localCards: GuestCard[] = []

			try {
				const saved = window.localStorage.getItem(STORAGE_KEY)
				if (saved) {
					const parsed = JSON.parse(saved)
					if (Array.isArray(parsed)) {
						localCards = parsed
					}
				}
			} catch (error) {
				console.error('Failed to load guest cards from local cache', error)
			}

			let derivedCards: GuestCard[] = []
			try {
				const response = await fetch('/blogs/index.json', { cache: 'no-store' })
				if (response.ok) {
					const index = (await response.json()) as BlogIndexEntry[]
					derivedCards = index
						.map(item => item.category?.trim() || '')
						.filter(category => category.startsWith('Guest · '))
						.map(category => {
							const name = extractGuestName(category)
							return {
								name,
								avatar: createFallbackAvatar(name),
								description: `Shared guest archive for ${name}.`
							}
						})
				}
			} catch (error) {
				console.error('Failed to derive guest cards from blog index', error)
			}

			if (isCancelled) return

			const merged = mergeGuestCards(initialGuestCards as GuestCard[], derivedCards, localCards)
			setGuestCards(merged)

			if (localCards.length > 0 && merged.length > (initialGuestCards as GuestCard[]).length) {
				toast.info('Loaded local guest drafts and merged them with shared guest cards.')
			}
		}

		hydrateGuestCards()

		return () => {
			isCancelled = true
		}
	}, [])

	useEffect(() => {
		try {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(guestCards))
		} catch (error) {
			console.error('Failed to cache guest cards locally', error)
		}
	}, [guestCards])

	const categories = useMemo(() => guestCards.map(guest => buildGuestCategory(guest.name)), [guestCards])

	const persistGuestCards = async (nextCards: GuestCard[], options?: { category?: string; avatarFile?: File | null; avatarName?: string }) => {
		const { category, avatarFile, avatarName } = options ?? {}

		setIsSaving(true)
		try {
			const avatarFiles = avatarFile && avatarName ? new Map([[avatarName, avatarFile]]) : undefined
			await pushGuestCards({
				guestCards: nextCards,
				avatarFiles
			})

			if (category) {
				await syncGuestCategory(category)
			}

			setGuestCards(nextCards)
			setDraft({ name: '', avatar: '', description: '' })
			setDraftAvatarFile(null)
			setIsCreateOpen(false)
			setPendingSave(null)
		} catch (error: any) {
			console.error('Failed to publish guest cards', error)
			toast.error(`Failed to publish guest cards: ${error?.message || 'Unknown error'}`)
		} finally {
			setIsSaving(false)
		}
	}

	const requestPersist = async (nextCards: GuestCard[], options?: { category?: string; avatarFile?: File | null; avatarName?: string }) => {
		if (!isAuth) {
			setPendingSave({ nextCards, category: options?.category, avatarFile: options?.avatarFile ?? null, avatarName: options?.avatarName })
			keyInputRef.current?.click()
			return
		}

		await persistGuestCards(nextCards, options)
	}

	const handleChoosePrivateKey = async (file: File) => {
		try {
			const text = await file.text()
			setPrivateKey(text)
			if (pendingSave) {
				await persistGuestCards(pendingSave.nextCards, {
					category: pendingSave.category,
					avatarFile: pendingSave.avatarFile,
					avatarName: pendingSave.avatarName
				})
			}
		} catch (error) {
			console.error('Failed to read private key', error)
			toast.error('Failed to read private key file')
		}
	}

	const handleCreateGuest = async () => {
		const name = draft.name.trim()
		const description = draft.description.trim()
		if (!name) {
			toast.error('Guest name is required')
			return
		}

		if (guestCards.some(card => card.name === name)) {
			toast.error('This guest already exists')
			return
		}

		const category = buildGuestCategory(name)
		const nextCards = mergeGuestCards(guestCards, [
			{
				name,
				description,
				avatar: draft.avatar.trim() || createFallbackAvatar(name)
			}
		])

		await requestPersist(nextCards, {
			category,
			avatarFile: draftAvatarFile,
			avatarName: name
		})
	}

	const handleDeleteGuest = async (name: string) => {
		const nextCards = guestCards.filter(card => card.name !== name)
		await requestPersist(nextCards)
	}

	const handleAvatarUpload = async (file?: File) => {
		if (!file) return
		try {
			const avatar = await readFileAsDataUrl(file)
			setDraft(prev => ({ ...prev, avatar }))
			setDraftAvatarFile(file)
		} catch (error) {
			console.error('Failed to read guest avatar', error)
		}
	}

	return (
		<>
			<input
				ref={keyInputRef}
				type='file'
				accept='.pem'
				className='hidden'
				onChange={async e => {
					const f = e.target.files?.[0]
					if (f) await handleChoosePrivateKey(f)
					if (e.currentTarget) e.currentTarget.value = ''
				}}
			/>

			<div className='mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pt-32 pb-20 max-sm:px-4 max-sm:pt-28'>
				<section className='surface-card mr-auto w-full max-w-5xl overflow-hidden px-6 py-6 max-sm:px-4'>
					<div className='grid gap-8 lg:grid-cols-[1.35fr_0.85fr]'>
						<div className='space-y-6'>
							<div className='inline-flex w-fit items-center gap-3 rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm text-[#546674] shadow-[0_10px_30px_rgba(159,177,193,0.12)]'>
								<span className='flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#35d4c5] shadow-[0_8px_24px_rgba(53,212,197,0.18)]'>
									<Globe2 className='h-5 w-5' />
								</span>
								<span className='font-medium tracking-[0.16em] uppercase'>Guest Archive</span>
							</div>

							<div className='space-y-4'>
								<h1 className='max-w-2xl text-4xl font-semibold tracking-[-0.05em] text-[#1f2f3d] max-sm:text-3xl'>
									Invited Guest Article and Research Share
								</h1>
								<p className='max-w-2xl text-sm leading-8 text-[#6e7e8b]'>
									A shared guest page for invited articles, research notes, and named reading lanes. Guest cards are now repository-backed, so everyone
									sees the same archive across devices.
								</p>
							</div>

							<div className='grid gap-3 sm:grid-cols-3'>
								<div className='rounded-[28px] border border-white/75 bg-white/70 px-5 py-4'>
									<div className='text-[11px] font-medium tracking-[0.18em] text-[#8ea0ad] uppercase'>Guest Cards</div>
									<div className='mt-3 text-3xl font-semibold tracking-[-0.05em] text-[#22323f]'>{guestCards.length}</div>
								</div>
								<div className='rounded-[28px] border border-white/75 bg-white/70 px-5 py-4'>
									<div className='text-[11px] font-medium tracking-[0.18em] text-[#8ea0ad] uppercase'>Categories</div>
									<div className='mt-3 text-3xl font-semibold tracking-[-0.05em] text-[#22323f]'>{categories.length}</div>
								</div>
								<div className='rounded-[28px] border border-white/75 bg-white/70 px-5 py-4'>
									<div className='text-[11px] font-medium tracking-[0.18em] text-[#8ea0ad] uppercase'>Mode</div>
									<div className='mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#22323f]'>
										<Sparkles className='h-4 w-4 text-[#35d4c5]' />
										Repo managed
									</div>
								</div>
							</div>
						</div>

						<div className='rounded-[32px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(255,255,255,0.62))] p-6 shadow-[0_22px_60px_rgba(163,183,196,0.16)]'>
							<div className='flex h-full flex-col gap-5'>
								<div className='inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf7f8] text-[#35bfab]'>
									<UserRoundPlus className='h-5 w-5' />
								</div>
								<div className='space-y-2'>
									<div className='text-[11px] font-medium tracking-[0.18em] text-[#8ea0ad] uppercase'>Guest Builder</div>
									<h2 className='text-2xl font-semibold tracking-[-0.04em] text-[#22323f]'>Create a guest card and publish it for everyone.</h2>
								</div>
								<p className='text-sm leading-7 text-[#6e7e8b]'>
									New guest cards are written into the repository, not only your browser. That means the card, its category route, and the shared archive
									stay visible on every device.
								</p>
								<div className='mt-auto'>
									<button
										type='button'
										onClick={() => setIsCreateOpen(open => !open)}
										className='inline-flex items-center gap-2 rounded-full bg-[#22323f] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1a2732]'>
										<Plus className='h-4 w-4' />
										{isCreateOpen ? 'Close Form' : 'Add Guest'}
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className='w-full space-y-6 pt-2'>
					<div className='flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start'>
						<div>
							<div className='text-[11px] font-medium tracking-[0.18em] text-[#8ea0ad] uppercase'>Guest Collection</div>
							<h2 className='mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#22323f]'>Cards begin below the intro section.</h2>
						</div>
						<div className='rounded-full border border-white/75 bg-white/80 px-4 py-2 text-sm text-[#60717f]'>
							{guestCards.length > 0 ? `${guestCards.length} guest card${guestCards.length > 1 ? 's' : ''}` : 'Ready for your first guest'}
						</div>
					</div>

					{isCreateOpen && (
						<section className='surface-card px-6 py-6 max-sm:px-4'>
							<div className='space-y-4'>
								<div>
									<div className='text-[11px] font-medium tracking-[0.18em] text-[#8ea0ad] uppercase'>New Guest</div>
									<h2 className='mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#22323f]'>Add a compact guest card</h2>
								</div>

								<div className='grid gap-4 lg:grid-cols-[220px_1fr]'>
									<div className='space-y-3'>
										<div className='overflow-hidden rounded-[28px] border border-white/80 bg-white/80 p-3 shadow-[0_12px_30px_rgba(163,183,196,0.12)]'>
											<div className='flex aspect-square items-center justify-center overflow-hidden rounded-[22px] bg-[#eef6f7]'>
												{draft.avatar ? (
													<img src={draft.avatar} alt='Guest avatar preview' className='h-full w-full object-cover' />
												) : (
													<div className='flex flex-col items-center gap-2 px-4 text-center text-sm text-[#7a8a97]'>
														<UserRoundPlus className='h-8 w-8 text-[#35bfab]' />
														<span>Upload guest photo</span>
													</div>
												)}
											</div>
										</div>
										<label className='flex cursor-pointer items-center justify-center rounded-full border border-[#d8e4ea] bg-white/90 px-4 py-3 text-sm font-medium text-[#243442] transition-colors hover:bg-white'>
											<input
												type='file'
												accept='image/*'
												className='hidden'
												onChange={async event => {
													await handleAvatarUpload(event.target.files?.[0])
													event.target.value = ''
												}}
											/>
											{draft.avatar ? 'Replace Photo' : 'Upload Photo'}
										</label>
										{draft.avatar && (
											<button
												type='button'
												onClick={() => {
													setDraft(prev => ({ ...prev, avatar: '' }))
													setDraftAvatarFile(null)
												}}
												className='w-full rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm text-[#60717f] transition-colors hover:bg-white'>
												Remove Photo
											</button>
										)}
									</div>

									<div className='grid gap-3'>
										<input
											type='text'
											value={draft.name}
											onChange={event => setDraft(prev => ({ ...prev, name: event.target.value }))}
											placeholder='Guest name'
											className='rounded-2xl border border-[#e6edf3] bg-white/90 px-4 py-3 text-sm text-[#243442] outline-none transition-colors focus:border-[#bed2de]'
										/>
										<input
											type='text'
											value={draft.avatar.startsWith('data:image/') ? '' : draft.avatar}
											onChange={event => {
												setDraftAvatarFile(null)
												setDraft(prev => ({ ...prev, avatar: event.target.value }))
											}}
											placeholder='Avatar URL (optional)'
											className='rounded-2xl border border-[#e6edf3] bg-white/90 px-4 py-3 text-sm text-[#243442] outline-none transition-colors focus:border-[#bed2de]'
										/>
										<input
											type='text'
											value={draft.description}
											onChange={event => setDraft(prev => ({ ...prev, description: event.target.value }))}
											placeholder='Short description'
											className='rounded-2xl border border-[#e6edf3] bg-white/90 px-4 py-3 text-sm text-[#243442] outline-none transition-colors focus:border-[#bed2de]'
										/>
									</div>
								</div>

								<div className='flex flex-wrap justify-end gap-3'>
									<button
										type='button'
										onClick={() => {
											setDraft({ name: '', avatar: '', description: '' })
											setDraftAvatarFile(null)
											setIsCreateOpen(false)
										}}
										className='rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm text-[#60717f] transition-colors hover:bg-white'>
										Cancel
									</button>
									<button
										type='button'
										onClick={handleCreateGuest}
										disabled={isSaving}
										className='rounded-full bg-[#22323f] px-4 py-2 text-sm text-white transition-colors hover:bg-[#1a2732] disabled:cursor-not-allowed disabled:opacity-60'>
										{isSaving ? 'Publishing...' : isAuth ? 'Publish Guest' : 'Import Key & Publish'}
									</button>
								</div>
							</div>
						</section>
					)}

					{!!guestCards.length && (
						<section className='space-y-3'>
							<div className='text-[11px] font-medium tracking-[0.18em] text-[#8ea0ad] uppercase'>Guest Categories</div>
							<div className='flex flex-wrap gap-3'>
								{categories.map(category => (
									<Link
										key={category}
										href={`/blog?category=${encodeURIComponent(category)}`}
										className='rounded-full border border-white/75 bg-white/80 px-4 py-2 text-sm text-[#50606d] transition-colors hover:border-[#d9e3eb] hover:text-[#1c2a38]'>
										{category}
									</Link>
								))}
							</div>
						</section>
					)}

					<section className='w-full'>
						{guestCards.length > 0 ? (
							<div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
								{guestCards.map((guest, index) => {
									const category = buildGuestCategory(guest.name)
									return (
										<motion.div
											key={guest.name}
											initial={{ opacity: 0, y: 18 }}
											whileInView={{ opacity: 1, y: 0 }}
											transition={{ delay: index * 0.05 }}
											viewport={{ once: true }}
											className='surface-card overflow-hidden p-0'>
											<div className='group flex h-full flex-col gap-5 p-6 transition-colors hover:bg-white/70'>
												<div className='flex items-start justify-between gap-3'>
													<Link href={`/blog?category=${encodeURIComponent(category)}`} className='flex min-w-0 flex-1 items-center gap-4'>
														<img src={guest.avatar} alt={guest.name} className='h-14 w-14 rounded-full object-cover ring-1 ring-white/90' />
														<div className='min-w-0 flex-1'>
															<div className='truncate text-lg font-semibold text-[#21313f]'>{guest.name}</div>
															<div className='mt-1 truncate text-sm text-[#7d8b97]'>{category}</div>
														</div>
													</Link>
													<button
														type='button'
														onClick={() => handleDeleteGuest(guest.name)}
														disabled={isSaving}
														className='rounded-full border border-white/80 bg-white/80 p-2 text-[#7d8b97] transition-colors hover:text-[#243442] disabled:cursor-not-allowed disabled:opacity-60'>
														<Trash2 className='h-4 w-4' />
													</button>
												</div>

												<Link href={`/blog?category=${encodeURIComponent(category)}`} className='block'>
													<p className='line-clamp-3 text-sm leading-7 text-[#667785]'>
														{guest.description || 'Open this guest category to collect invited articles and research shares.'}
													</p>
												</Link>

												<Link
													href={`/blog?category=${encodeURIComponent(category)}`}
													className='mt-auto flex items-center justify-between border-t border-[#edf1f5] pt-4 text-sm text-[#50606d]'>
													<span>Open Guest Articles</span>
													<ArrowUpRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
												</Link>
											</div>
										</motion.div>
									)
								})}
							</div>
						) : (
							<div className='surface-card max-w-4xl px-8 py-12 text-center'>
								<div className='mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf7f8] text-[#35bfab]'>
									<Globe2 className='h-6 w-6' />
								</div>
								<div className='mt-5 text-2xl font-semibold tracking-[-0.04em] text-[#243442]'>No guest cards yet</div>
								<p className='mx-auto mt-3 max-w-xl text-sm leading-7 text-[#6d7c89]'>
									Start with `Add Guest` above. New cards will be published to the repository, and existing guest-only article lanes can also appear here
									automatically.
								</p>
							</div>
						)}
					</section>
				</section>
			</div>
		</>
	)
}
