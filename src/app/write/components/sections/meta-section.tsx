import { motion } from 'motion/react'
import { useWriteStore } from '../../stores/write-store'
import { TagInput } from '../ui/tag-input'
import { useCategories } from '@/hooks/use-categories'
import { useConfigStore } from '@/app/(home)/stores/config-store'
import { Select } from '@/components/select'
import { isGuestCategoryName } from '@/lib/guest-posts'

type MetaSectionProps = {
	delay?: number
}

export function MetaSection({ delay = 0 }: MetaSectionProps) {
	const { form, updateForm, pdfFile, setPdfFile } = useWriteStore()
	const invalidPdfUrl = !!form.pdf && !/\.pdf([?#].*)?$/i.test(form.pdf)
	const guestMode = !!form.guest || isGuestCategoryName(form.category)

	const { categories } = useCategories()
	const { siteContent } = useConfigStore()
	const enableCategories = siteContent.enableCategories ?? false

	const categoryOptions = [{ value: '', label: '未分类' }, ...categories.map(cat => ({ value: cat, label: cat }))]

	return (
		<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay }} className='card relative'>
			<h2 className='text-sm'>元信息</h2>

			<div className='mt-3 space-y-2'>
				<textarea
					placeholder='为这篇文章写一段简短摘要'
					rows={2}
					className='bg-card block w-full resize-none rounded-xl border p-3 text-sm'
					value={form.summary}
					onChange={e => updateForm({ summary: e.target.value })}
				/>

				<TagInput tags={form.tags} onChange={tags => updateForm({ tags })} />
				{enableCategories && (
					<Select className='w-full text-sm' value={form.category || ''} onChange={value => updateForm({ category: value })} options={categoryOptions} />
				)}
				{guestMode && <div className='rounded-xl border border-[#d6ece8] bg-[#eef9f6] px-3 py-2 text-xs leading-6 text-[#2f6b63]'>这篇文章会作为 guest 分享发布，只会出现在对应的 Guest 分类页，不会进入首页「近期文章」。</div>}
				<input
					type='datetime-local'
					placeholder='日期'
					className='bg-card w-full rounded-lg border px-3 py-2 text-sm'
					value={form.date}
					onChange={e => {
						updateForm({ date: e.target.value })
					}}
				/>
				<input
					type='text'
					placeholder={pdfFile ? '已导入本地 PDF，无需填写 URL' : 'PDF URL（可选，留空表示无 PDF）'}
					className='bg-card w-full rounded-lg border px-3 py-2 text-sm'
					value={form.pdf || ''}
					disabled={!!pdfFile}
					onChange={e => {
						setPdfFile(null)
						updateForm({ pdf: e.target.value })
					}}
				/>
				<div className='text-secondary text-xs'>
					导入本地 PDF 时这里不用填；发布后系统会自动写入 `/blogs/你的slug/xxx.pdf`。
				</div>
				{invalidPdfUrl && <div className='text-xs text-amber-600'>当前值不是 .pdf 链接，发布时会自动忽略。</div>}
				{pdfFile && <div className='text-secondary text-xs'>已选择 PDF：{pdfFile.name}</div>}
				{(pdfFile || form.pdf) && (
					<button
						type='button'
						className='text-secondary rounded-lg border px-3 py-1 text-xs hover:bg-white/50'
						onClick={() => {
							setPdfFile(null)
							updateForm({ pdf: '' })
						}}>
						清除 PDF
					</button>
				)}

				<div className='flex items-center gap-2'>
					<input
						type='checkbox'
						id='hidden-check'
						checked={form.hidden || false}
						onChange={e => updateForm({ hidden: e.target.checked })}
						className='h-4 w-4 rounded border-gray-300'
					/>
					<label htmlFor='hidden-check' className='cursor-pointer text-sm text-gray-600 select-none'>
						隐藏此文章（仅管理员可见）
					</label>
				</div>
			</div>
		</motion.div>
	)
}
