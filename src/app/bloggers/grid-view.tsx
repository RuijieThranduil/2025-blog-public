'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, Globe2, Plus, Trash2 } from 'lucide-react'

interface GuestCard {
	name: string
	avatar: string
	description: string
}

const STORAGE_KEY = 'guest-cards'

function buildGuestCategory(name: string) {
	return `Guest · ${name}`
}

function createFallbackAvatar(name: string) {
	return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ecf5f8&color=243442&bold=true`
}

export default function GridView() {
	const [guestCards, setGuestCards] = useState<GuestCard[]>([])
	const [isCreateOpen, setIsCreateOpen] = useState(false)
	const [draft, setDraft] = useState<GuestCard>({
		name: '',
		avatar: '',
		description: ''
	})

	useEffect(() => {
		try {
			const saved = window.localStorage.getItem(STORAGE_KEY)
			if (!saved) return
			const parsed = JSON.parse(saved)
			if (Array.isArray(parsed)) {
				setGuestCards(parsed)
			}
		} catch (error) {
			console.error('Failed to load guest cards', error)
		}
	}, [])

	useEffect(() => {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(guestCards))
	}, [guestCards])

	const handleCreateGuest = () => {
		const name = draft.name.trim()
		const description = draft.description.trim()
		if (!name) return

		setGuestCards(prev => [
			...prev,
			{
				name,
				description,
				avatar: draft.avatar.trim() || createFallbackAvatar(name)
			}
		])
		setDraft({ name: '', avatar: '', description: '' })
		setIsCreateOpen(false)
	}

	const handleDeleteGuest = (name: string) => {
		setGuestCards(prev => prev.filter(card => card.name !== name))
	}

	return (
		<div className='mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pt-24 pb-16 max-sm:px-4 max-sm:pt-20'>
			<section className='card mx-auto w-full max-w-4xl overflow-hidden px-8 py-10 max-sm:px-5 max-sm:py-8'>
				<div className='flex flex-col gap-6'>
					<div className='inline-flex w-fit items-center gap-3 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm text-[#4f6474] shadow-[0_10px_30px_rgba(159,177,193,0.12)]'>
						<span className='flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#35d4c5] shadow-[0_8px_24px_rgba(53,212,197,0.18)]'>
							<Globe2 className='h-5 w-5' />
						</span>
						<span className='font-medium tracking-[0.14em] uppercase'>Guest Archive</span>
					</div>

					<div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
						<div className='space-y-4'>
							<h1 className='text-3xl font-semibold tracking-[-0.04em] text-[#1c2a38] max-sm:text-2xl'>Invited Guest Article and Research Share</h1>
							<p className='max-w-2xl text-sm leading-7 text-[#6d7c89]'>保留小卡片样式。你可以直接在前端新增 guest，卡片会链接到对应的分类文章页。</p>
						</div>

						<button
							type='button'
							onClick={() => setIsCreateOpen(open => !open)}
							className='inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-5 py-3 text-sm font-medium text-[#243442] shadow-[0_10px_24px_rgba(160,178,193,0.14)] transition-colors hover:bg-white'>
							<Plus className='h-4 w-4' />
							Add Guest
						</button>
					</div>

					{isCreateOpen && (
						<div className='grid gap-3 rounded-[28px] border border-white/70 bg-white/70 p-5 shadow-[0_14px_36px_rgba(160,178,193,0.14)] md:grid-cols-3'>
							<input
								type='text'
								value={draft.name}
								onChange={event => setDraft(prev => ({ ...prev, name: event.target.value }))}
								placeholder='Guest name'
								className='rounded-2xl border border-[#e6edf3] bg-white/90 px-4 py-3 text-sm text-[#243442] outline-none transition-colors focus:border-[#bed2de]'
							/>
							<input
								type='text'
								value={draft.avatar}
								onChange={event => setDraft(prev => ({ ...prev, avatar: event.target.value }))}
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
							<div className='md:col-span-3 flex justify-end gap-3'>
								<button
									type='button'
									onClick={() => {
										setDraft({ name: '', avatar: '', description: '' })
										setIsCreateOpen(false)
									}}
									className='rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm text-[#60717f] transition-colors hover:bg-white'>
									Cancel
								</button>
								<button
									type='button'
									onClick={handleCreateGuest}
									className='rounded-full bg-[#243442] px-4 py-2 text-sm text-white transition-colors hover:bg-[#1b2833]'>
									Save Guest
								</button>
							</div>
						</div>
					)}

					{!!guestCards.length && (
						<div className='space-y-3'>
							<div className='text-xs font-medium tracking-[0.18em] text-[#91a0ad] uppercase'>Categories</div>
							<div className='flex flex-wrap gap-3'>
								{guestCards.map(guest => {
									const category = buildGuestCategory(guest.name)
									return (
										<Link
											key={category}
											href={`/blog?category=${encodeURIComponent(category)}`}
											className='rounded-full border border-white/70 bg-white/75 px-4 py-2 text-sm text-[#50606d] transition-colors hover:border-[#d9e3eb] hover:text-[#1c2a38]'>
											{category}
										</Link>
									)
								})}
							</div>
						</div>
					)}
				</div>
			</section>

			<section className='mx-auto w-full max-w-6xl'>
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
									className='card overflow-hidden p-0'>
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
												className='rounded-full border border-white/80 bg-white/80 p-2 text-[#7d8b97] transition-colors hover:text-[#243442]'>
												<Trash2 className='h-4 w-4' />
											</button>
										</div>

										<Link href={`/blog?category=${encodeURIComponent(category)}`} className='block'>
											<p className='line-clamp-3 text-sm leading-7 text-[#667785]'>{guest.description || 'Open this guest category to collect invited articles and research shares.'}</p>
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
					<div className='card mx-auto max-w-2xl px-8 py-12 text-center'>
						<div className='text-lg font-medium text-[#243442]'>No guest cards yet</div>
						<p className='mt-3 text-sm leading-7 text-[#6d7c89]'>点上面的 `Add Guest` 就可以新增一张小卡片，新增后会自动生成对应的 `Guest · 人名` 分类跳转。</p>
					</div>
				)}
			</section>
		</div>
	)
}
