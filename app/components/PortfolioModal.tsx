import { motion, AnimatePresence } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

type Portfolio = {
  _id: string
  title: string
  description?: PortableTextBlock[]
  tools?: string[]
  view?: string
}

type Props = {
  project: Portfolio
  onClose: () => void
}

export default function PortfolioModal({ project, onClose }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/60 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="min-h-screen flex items-center justify-center p-4">
          <motion.div
            onClick={e => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-white dark:bg-[#2b2b2b] rounded-xl w-full max-w-2xl max-h-[85vh] overflow-hidden"
          >            
            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="
                absolute top-3 right-3
                w-8 h-8
                flex items-center justify-center
                rounded-full
                bg-black/10 hover:bg-black/20
                dark:bg-white/10 dark:hover:bg-white/20
                transition
              "
            >
              ✕
            </button>

            {/* CONTENT SCROLL */}
            <div className="overflow-y-auto max-h-[85vh] p-6">
              <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
              {project.description && (
                <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                  <PortableText value={project.description} />
                </div>
              )}
              {project.view && (
                <a
                  href={project.view}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-[#ff4040] font-semibold hover:underline"
                >
                  View Project →
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
