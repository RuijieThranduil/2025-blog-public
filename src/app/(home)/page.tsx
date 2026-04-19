'use client'

import Link from 'next/link'
import dayjs from 'dayjs'
import { motion } from 'motion/react'
import { ArrowUpRight, Mail, Pause, Settings2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useBlogIndex, type BlogIndexItem } from '@/hooks/use-blog-index'
import { useConfigStore } from './stores/config-store'
import ConfigDialog from './config-dialog'
import SnowfallBackground from '@/layout/backgrounds/snowfall'
import ScrollFilledSVG from '@/svgs/scroll-filled.svg'
import ProjectsOutlineSVG from '@/svgs/projects-outline.svg'
import AboutOutlineSVG from '@/svgs/about-outline.svg'
import ShareOutlineSVG from '@/svgs/share-outline.svg'
import WebsiteOutlineSVG from '@/svgs/website-outline.svg'
import PenSVG from '@/svgs/pen.svg'
import DotsSVG from '@/svgs/dots.svg'
import MusicSVG from '@/svgs/music.svg'
import PlaySVG from '@/svgs/play.svg'
import LikeButton from '@/components/like-button'

type SocialButton = {
	id: string
	type: string
	value: string
	label?: string
	order: number
}

const HOME_NAV_ITEMS = [
	{ href: '/blog', icon: ScrollFilledSVG, label: '近期文章' },
	{ href: '/projects', icon: ProjectsOutlineSVG, label: '我的项目' },
	{ href: '/about', icon: AboutOutlineSVG, label: '关于网站' },
	{ href: '/share', icon: ShareOutlineSVG, label: '推荐分享' },
	{ href: '/bloggers', icon: WebsiteOutlineSVG, label: '优秀博客' }
] as const

const MUSIC_FILES = ['/music/close-to-you.mp3']

function getGreeting() {
	const hour = new Date().getHours()

	if (hour >= 6 && hour < 12) return 'Good morning'
	if (hour >= 12 && hour < 18) return 'Good afternoon'
	if (hour >= 18 && hour < 22) return 'Good evening'
	return 'Good night'
}

function getLinkMeta(button: SocialButton) {
	const rawLabel = button.label?.trim()
	const label = rawLabel || (button.type === 'email' ? 'Email' : button.type)
	const isEmail = button.type === 'email' || button.value.includes('@')
	const href = isEmail ? `mailto:${button.value}` : button.value

	return { label, href, isExternal: !isEmail }
}

function formatCategory(category?: string) {
	return category?.trim() || 'Writing'
}

function formatSummary(blog: BlogIndexItem) {
	if (blog.summary?.trim()) return blog.summary
	return 'A new note from the archive.'
}

function StatCard({ label, value, hint }: { label: string; value: string; hint: string }) {
	return (
		<div className='rounded-[28px] border border-black/6 bg-white/60 p-4 shadow-[0_20px_60px_-48px_rgba(15,23,42,0.35)] backdrop-blur-xl'>
			<p className='text-[11px] uppercase tracking-[0.22em] text-black/40'>{label}</p>
			<p className='mt-3 text-2xl font-semibold tracking-[-0.04em] text-black/80'>{value}</p>
			<p className='mt-2 text-sm leading-6 text-black/50'>{hint}</p>
		</div>
	)
}

function HomeNavRail() {
	return (
		<div className='inline-flex items-center gap-3 rounded-[30px] border border-white/75 bg-white/62 px-4 py-4 shadow-[0_30px_90px_-68px_rgba(15,23,42,0.45)] backdrop-blur-2xl'>
			<Link
				href='/'
				aria-label='Home'
				className='flex h-16 w-16 items-center justify-center rounded-full border border-black/6 bg-white/74 shadow-[0_16px_36px_-18px_rgba(15,23,42,0.25)] transition-transform hover:-translate-y-0.5'>
				<img src='/images/avatar.png' alt='avatar' className='h-14 w-14 rounded-full object-cover' />
			</Link>

			<div className='flex items-center gap-2 sm:gap-3'>
				{HOME_NAV_ITEMS.map(item => {
					const Icon = item.icon
					return (
						<Link
							key={item.href}
							href={item.href}
							aria-label={item.label}
							className='flex h-16 w-16 items-center justify-center rounded-full border border-transparent text-black/42 transition-all hover:border-black/6 hover:bg-white/72 hover:text-black/72'>
							<Icon className='h-8 w-8' />
						</Link>
					)
				})}
			</div>
		</div>
	)
}

function WriteEntry({ onCustomize, showCustomize }: { onCustomize: () => void; showCustomize: boolean }) {
	return (
		<div className='flex items-center gap-3'>
			<Link
				href='/write'
				className='inline-flex items-center gap-3 rounded-[24px] border border-white/80 bg-[#43c8ea] px-5 py-4 text-lg font-semibold text-white shadow-[inset_0_0_0_2px_rgba(255,255,255,0.7),0_24px_70px_-48px_rgba(38,166,194,0.8)] transition-transform hover:-translate-y-0.5'>
				<PenSVG className='h-7 w-7' />
				<span>写文章</span>
			</Link>

			{showCustomize && (
				<button
					type='button'
					onClick={onCustomize}
					aria-label='Customize home'
					className='flex h-14 w-14 items-center justify-center rounded-[20px] border border-white/70 bg-white/55 text-black/45 shadow-[0_20px_50px_-38px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-colors hover:bg-white/78 hover:text-black/72'>
					<DotsSVG className='h-6 w-6' />
				</button>
			)}
		</div>
	)
}

function HomeMusicCard() {
	const [isPlaying, setIsPlaying] = useState(false)
	const [progress, setProgress] = useState(0)
	const [currentIndex, setCurrentIndex] = useState(0)
	const audioRef = useRef<HTMLAudioElement | null>(null)

	useEffect(() => {
		if (!audioRef.current) {
			audioRef.current = new Audio()
		}

		const audio = audioRef.current

		const updateProgress = () => {
			if (audio.duration) {
				setProgress((audio.currentTime / audio.duration) * 100)
			}
		}

		const handleEnded = () => {
			const nextIndex = (currentIndex + 1) % MUSIC_FILES.length
			setCurrentIndex(nextIndex)
			setProgress(0)
		}

		audio.addEventListener('timeupdate', updateProgress)
		audio.addEventListener('loadedmetadata', updateProgress)
		audio.addEventListener('ended', handleEnded)

		return () => {
			audio.removeEventListener('timeupdate', updateProgress)
			audio.removeEventListener('loadedmetadata', updateProgress)
			audio.removeEventListener('ended', handleEnded)
			audio.pause()
			audio.src = ''
		}
	}, [currentIndex])

	useEffect(() => {
		if (!audioRef.current) return

		const audio = audioRef.current
		audio.pause()
		audio.src = MUSIC_FILES[currentIndex]
		audio.loop = false
		setProgress(0)
	}, [currentIndex])

	useEffect(() => {
		if (!audioRef.current) return

		const audio = audioRef.current
		if (isPlaying) {
			audio.play().catch(() => undefined)
			return
		}

		audio.pause()
	}, [isPlaying])

	return (
		<div className='flex items-center gap-4 rounded-[32px] border border-white/78 bg-white/62 px-6 py-5 shadow-[0_30px_90px_-68px_rgba(15,23,42,0.45)] backdrop-blur-2xl'>
			<MusicSVG className='h-9 w-9 shrink-0' />

			<div className='min-w-0 flex-1'>
				<p className='text-2xl tracking-[-0.04em] text-[#8d766c]'>Close To You</p>
				<div className='mt-3 h-3 rounded-full bg-white/70'>
					<div className='bg-linear h-full rounded-full transition-all duration-300' style={{ width: `${progress}%` }} />
				</div>
			</div>

			<button
				type='button'
				onClick={() => setIsPlaying(value => !value)}
				className='flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-brand shadow-[0_18px_40px_-28px_rgba(15,23,42,0.35)] transition-transform hover:-translate-y-0.5'>
				{isPlaying ? <Pause className='h-5 w-5' /> : <PlaySVG className='ml-1 h-5 w-5' />}
			</button>
		</div>
	)
}

function PostRow({ blog, featured = false }: { blog: BlogIndexItem; featured?: boolean }) {
	const category = formatCategory(blog.category)
	const date = dayjs(blog.date)
	const dateLabel = date.isValid() ? date.format('MMM D, YYYY') : 'Recent'

	if (featured) {
		return (
			<Link
				href={`/blog/${encodeURIComponent(blog.slug)}`}
				className='group block overflow-hidden rounded-[32px] border border-black/6 bg-white/72 shadow-[0_32px_90px_-60px_rgba(15,23,42,0.5)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5'>
				<div className='grid gap-8 p-6 md:grid-cols-[1.25fr_0.9fr] md:p-8'>
					<div className='flex flex-col justify-between gap-8'>
						<div>
							<div className='flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-black/40'>
								<span>{category}</span>
								<span className='h-1 w-1 rounded-full bg-black/20' />
								<span>{dateLabel}</span>
							</div>
							<h2 className='mt-5 max-w-3xl text-3xl leading-[1.02] font-semibold tracking-[-0.05em] text-black/85 md:text-5xl'>
								{blog.title || blog.slug}
							</h2>
							<p className='mt-5 max-w-2xl text-base leading-7 text-black/55 md:text-lg'>{formatSummary(blog)}</p>
						</div>

						<div className='flex items-center gap-2 text-sm font-medium text-black/75'>
							<span>Read article</span>
							<ArrowUpRight className='size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
						</div>
					</div>

					<div className='overflow-hidden rounded-[24px] border border-black/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(241,245,249,0.9))]'>
						{blog.cover ? (
							<img src={blog.cover} alt={blog.title || blog.slug} className='aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]' />
						) : (
							<div className='flex aspect-[4/3] h-full w-full flex-col justify-between p-6'>
								<div className='flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-black/35'>
									<span>Featured note</span>
									<span>{String(blog.tags?.length || 0).padStart(2, '0')}</span>
								</div>
								<div>
									<p className='text-sm text-black/45'>Latest writing</p>
									<p className='mt-2 text-2xl font-semibold tracking-[-0.04em] text-black/80'>{blog.title || blog.slug}</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</Link>
		)
	}

	return (
		<Link
			href={`/blog/${encodeURIComponent(blog.slug)}`}
			className='group flex items-start gap-4 rounded-[24px] border border-transparent px-1 py-4 transition-colors hover:border-black/6 hover:bg-white/45'>
			<div className='min-w-0 flex-1'>
				<div className='flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-black/35'>
					<span>{category}</span>
					<span className='h-1 w-1 rounded-full bg-black/20' />
					<span>{dateLabel}</span>
				</div>
				<h3 className='mt-3 text-xl font-medium tracking-[-0.03em] text-black/80'>{blog.title || blog.slug}</h3>
				<p className='mt-2 line-clamp-2 text-sm leading-6 text-black/52'>{formatSummary(blog)}</p>
			</div>
			<ArrowUpRight className='mt-1 size-4 shrink-0 text-black/30 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-black/65' />
		</Link>
	)
}

export default function Home() {
	const { items, loading } = useBlogIndex()
	const { siteContent, configDialogOpen, setConfigDialogOpen } = useConfigStore()
	const socialButtons = useMemo(
		() => [...((siteContent.socialButtons || []) as SocialButton[])].sort((a, b) => a.order - b.order),
		[siteContent.socialButtons]
	)
	const sortedPosts = useMemo(
		() => [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
		[items]
	)
	const featuredPost = sortedPosts[0]
	const recentPosts = sortedPosts.slice(1, 6)
	const categories = useMemo(() => {
		const values = sortedPosts.map(item => formatCategory(item.category))
		return Array.from(new Set(values))
	}, [sortedPosts])
	const greeting = getGreeting()
	const title = siteContent.meta.title || 'Blog'
	const username = siteContent.meta.username || 'Writer'
	const description = siteContent.meta.description || 'Notes on the web, design, and technology.'
	const latestDate = featuredPost?.date ? dayjs(featuredPost.date).format('MMM D, YYYY') : 'No updates yet'

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && (e.key === 'l' || e.key === ',')) {
				e.preventDefault()
				setConfigDialogOpen(true)
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [setConfigDialogOpen])

	return (
		<>
			{siteContent.enableChristmas && <SnowfallBackground zIndex={0} count={24} />}

			<div className='mx-auto flex w-full max-w-7xl flex-col px-5 pt-28 pb-20 sm:px-8 lg:px-10'>
				<motion.section
					initial={{ opacity: 0, y: 14 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.35, ease: 'easeOut' }}
					className='mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between'>
					<HomeNavRail />
					<WriteEntry onCustomize={() => setConfigDialogOpen(true)} showCustomize={!siteContent.hideEditButton} />
				</motion.section>

				<motion.section
					initial={{ opacity: 0, y: 18 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45, ease: 'easeOut' }}
					className='rounded-[36px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.52))] px-6 py-8 shadow-[0_40px_120px_-72px_rgba(15,23,42,0.45)] backdrop-blur-2xl sm:px-8 sm:py-10 lg:px-10 lg:py-12'>
					<div className='grid gap-10 lg:grid-cols-[1.35fr_0.85fr] lg:gap-16'>
						<div>
							<p className='text-[11px] uppercase tracking-[0.28em] text-black/38'>{greeting}</p>
							<h1 className='mt-5 max-w-4xl text-5xl leading-[0.95] font-semibold tracking-[-0.08em] text-black/85 sm:text-6xl lg:text-7xl'>
								{title}
							</h1>
							<p className='mt-6 max-w-3xl text-lg leading-8 text-black/58 sm:text-xl'>
								A quieter, sharper home for notes on frontend craft, AI systems, and the small details that make products feel considered.
							</p>
						</div>

						<div className='flex flex-col justify-between gap-8 border-t border-black/6 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10'>
							<div>
								<p className='text-sm uppercase tracking-[0.22em] text-black/35'>About</p>
								<p className='mt-4 text-2xl leading-tight font-medium tracking-[-0.05em] text-black/82'>{username}</p>
								<p className='mt-4 text-sm leading-7 text-black/52'>{description}</p>
							</div>

							<div className='flex flex-wrap gap-3'>
								<Link
									href={featuredPost ? `/blog/${encodeURIComponent(featuredPost.slug)}` : '/blog'}
									className='inline-flex items-center gap-2 rounded-full bg-[#111111] px-5 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5'>
									<span>{featuredPost ? 'Read latest' : 'Browse archive'}</span>
									<ArrowUpRight className='size-4' />
								</Link>
								<Link
									href='/blog'
									className='inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-5 py-3 text-sm font-medium text-black/75 backdrop-blur transition-colors hover:bg-white'>
									View all posts
								</Link>
								{!siteContent.hideEditButton && (
									<button
										type='button'
										onClick={() => setConfigDialogOpen(true)}
										className='inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/65 px-5 py-3 text-sm font-medium text-black/68 backdrop-blur transition-colors hover:bg-white'>
										<Settings2 className='size-4' />
										Customize
									</button>
								)}
							</div>
						</div>
					</div>
				</motion.section>

				<motion.section
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
					className='mt-6 grid gap-4 md:grid-cols-3'>
					<StatCard label='Latest update' value={latestDate} hint='Fresh writing, kept close to the front page.' />
					<StatCard label='Archive size' value={String(sortedPosts.length).padStart(2, '0')} hint='A growing collection of essays, notes, and experiments.' />
					<StatCard label='Topics' value={String(categories.length).padStart(2, '0')} hint='Organized around recurring themes instead of noise.' />
				</motion.section>

				<section className='mt-8'>
					<div className='flex items-end justify-between gap-4'>
						<div>
							<p className='text-[11px] uppercase tracking-[0.22em] text-black/35'>Featured</p>
							<h2 className='mt-2 text-3xl font-semibold tracking-[-0.05em] text-black/82 sm:text-4xl'>Start with the latest thinking.</h2>
						</div>
					</div>

					<div className='mt-5'>
						{loading ? (
							<div className='rounded-[32px] border border-black/6 bg-white/65 px-6 py-10 text-sm text-black/45 backdrop-blur-xl'>Loading the archive...</div>
						) : featuredPost ? (
							<PostRow blog={featuredPost} featured />
						) : (
							<div className='rounded-[32px] border border-black/6 bg-white/65 px-6 py-10 text-sm text-black/45 backdrop-blur-xl'>No posts yet.</div>
						)}
					</div>
				</section>

				<section className='mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]'>
					<div className='rounded-[32px] border border-black/6 bg-white/68 p-6 shadow-[0_30px_90px_-70px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-8'>
						<div className='flex items-center justify-between gap-4'>
							<div>
								<p className='text-[11px] uppercase tracking-[0.22em] text-black/35'>Recent writing</p>
								<h2 className='mt-2 text-2xl font-semibold tracking-[-0.04em] text-black/82'>From the archive</h2>
							</div>
							<Link href='/blog' className='text-sm font-medium text-black/58 transition-colors hover:text-black/82'>
								See archive
							</Link>
						</div>

						<div className='mt-4 divide-y divide-black/6'>
							{loading ? (
								<div className='py-6 text-sm text-black/45'>Loading posts...</div>
							) : recentPosts.length > 0 ? (
								recentPosts.map(blog => <PostRow key={blog.slug} blog={blog} />)
							) : (
								<div className='py-6 text-sm text-black/45'>More writing will appear here soon.</div>
							)}
						</div>
					</div>

					<div className='space-y-6'>
						<div className='rounded-[32px] border border-black/6 bg-white/66 p-6 shadow-[0_30px_90px_-70px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-8'>
							<p className='text-[11px] uppercase tracking-[0.22em] text-black/35'>Profile</p>
							<div className='mt-5 flex items-center gap-4'>
								<img src='/images/avatar.png' alt={username} className='h-16 w-16 rounded-full border border-black/8 object-cover shadow-[0_16px_36px_-18px_rgba(15,23,42,0.35)]' />
								<div>
									<p className='text-xl font-semibold tracking-[-0.04em] text-black/82'>{username}</p>
									<p className='mt-1 text-sm text-black/48'>Independent builder and notebook keeper.</p>
								</div>
							</div>

							<div className='mt-6 flex flex-wrap gap-3'>
								{socialButtons.map(button => {
									const { label, href, isExternal } = getLinkMeta(button)

									return (
										<a
											key={button.id}
											href={href}
											target={isExternal ? '_blank' : undefined}
											rel={isExternal ? 'noreferrer' : undefined}
											className='inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/72 px-4 py-2 text-sm text-black/68 transition-colors hover:bg-white hover:text-black/82'>
											{button.type === 'email' || button.value.includes('@') ? <Mail className='size-4' /> : <ArrowUpRight className='size-4' />}
											<span>{label}</span>
										</a>
									)
								})}
							</div>
						</div>

						<div className='rounded-[32px] border border-black/6 bg-white/66 p-6 shadow-[0_30px_90px_-70px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-8'>
							<p className='text-[11px] uppercase tracking-[0.22em] text-black/35'>Focus areas</p>
							<div className='mt-5 space-y-5'>
								<div>
									<p className='text-base font-medium text-black/80'>Frontend systems</p>
									<p className='mt-2 text-sm leading-7 text-black/52'>Interface structure, visual rhythm, and product polish that feels deliberate rather than decorative.</p>
								</div>
								<div>
									<p className='text-base font-medium text-black/80'>AI and applied notes</p>
									<p className='mt-2 text-sm leading-7 text-black/52'>LLM learning trails, recommendation systems, PDF workflows, and experiments that turn research into usable knowledge.</p>
								</div>
								<div>
									<p className='text-base font-medium text-black/80'>Personal archive</p>
									<p className='mt-2 text-sm leading-7 text-black/52'>A blog that reads more like an evolving studio notebook than a generic content feed.</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className='mt-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center'>
					<HomeMusicCard />
					<div className='flex justify-start lg:justify-end'>
						<LikeButton
							className='rounded-[30px] border border-white/78 bg-white/62 px-6 py-5 shadow-[0_30px_90px_-68px_rgba(15,23,42,0.45)] backdrop-blur-2xl'
							delay={0}
						/>
					</div>
				</section>
			</div>

			{siteContent.enableChristmas && <SnowfallBackground zIndex={2} count={24} />}
			<ConfigDialog open={configDialogOpen} onClose={() => setConfigDialogOpen(false)} />
		</>
	)
}
