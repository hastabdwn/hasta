'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import * as motion from 'motion/react-client'
import { sanityClient } from '../lib/sanity.client'
import { portfolioQuery, aboutQuery } from '../lib/queries'
import PortfolioModal from './components/PortfolioModal'
import { ModeToggle } from './components/dark'
import FormContact from './components/formcontact'
import { menu, linkcontact } from './data.js'
import type { PortableTextBlock } from '@portabletext/types'
import { PortableText } from '@portabletext/react'

// =====================
// Types
// =====================
type Portfolio = {
  _id: string
  title: string
  description?: PortableTextBlock[]
  tools?: string[]
  view?: string
  content?: PortableTextBlock[]
}


type About = {
  title: string
  content?: PortableTextBlock[]
  techStack?: string[]
}

export default function Page() {
  // =====================
  // State
  // =====================
  const [portfolioData, setPortfolioData] = useState<Portfolio[]>([])
  const [selectedProject, setSelectedProject] = useState<Portfolio | null>(null)
  const [aboutData, setAboutData] = useState<About | null>(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const mobileRef = useRef<HTMLDivElement | null>(null)

  // =====================
  // Fetch Portfolio (Sanity)
  // =====================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const portfolio: Portfolio[] = await sanityClient.fetch(portfolioQuery)
        setPortfolioData(portfolio)

        const about: About = await sanityClient.fetch(aboutQuery)
        setAboutData(about)
      } catch (error) {
        console.error('Sanity fetch error:', error)
      }
    }

    fetchData()
  }, [])

  // =====================
  // Navbar helpers
  // =====================
  const toggleMobileMenu = () => setIsMobileOpen(prev => !prev)

  // Close mobile menu when click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) {
        setIsMobileOpen(false)
      }
    }

    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close modal with ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null)
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Lock scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : 'auto'
  }, [selectedProject])

  // =====================
  // Active menu on scroll
  // =====================
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -60% 0px' }
    )

    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const renderMenu = (isMobile = false) =>
    menu.map(item => {
      const isActive = activeSection === item.href.replace('#', '')
      return (
        <Link
          key={item.id}
          href={item.href}
          aria-current={isActive ? 'page' : undefined}
          onClick={() => setIsMobileOpen(false)}
          className={`${isMobile ? 'py-2 text-xl' : 'px-1'} hover:underline ${isActive ? 'underline font-semibold text-[#ff4040]' : ''
            }`}
        >
          {item.name}
        </Link>
      )
    })

  return (
    <main>
      {/* ================= Navbar ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/20 dark:border-white/10 bg-white/70 dark:bg-[#282828]/70">
        <nav className="max-w-5xl mx-auto flex items-center justify-between p-2">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold">
              Hasta
            </Link>
            <div className="hidden md:flex gap-3">{renderMenu()}</div>
          </div>

          <div className="flex items-center gap-3">
            <ModeToggle />
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg border"
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>

          {isMobileOpen && (
            <div
              ref={mobileRef}
              className="absolute top-18 left-2 right-2 bg-white dark:bg-[#3c3c3c] rounded-xl border p-4 md:hidden"
            >
              <div className="flex flex-col text-center">
                {renderMenu(true)}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* ================= Hero ================= */}
      <section id="hero" className="scroll-mt-24 min-h-dvh p-2 flex justify-center">
        <div className="py-16 space-y-4 w-full max-w-5xl text-center">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between">
            <div className="space-y-6 text-center md:text-left">
              <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-medium m-4">
                👋 Hello
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold">
                I&apos;m Hasta <br />
                <span className="text-[#ff4040]">Frontend Developer</span>          
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  href="#portfolio"
                  className="bg-[#ff4040] text-white px-6 py-3 rounded-lg font-semibold"
                >
                  View My Work →
                </Link>
                <Link
                  href="#contact"
                  className="border border-[#ff4040] text-[#ff4040] px-6 py-3 rounded-lg font-semibold"
                >
                  Contact Me
                </Link>
              </div>
            </div>

            <Image
              src="/face.png"
              alt="Avatar Hasta"
              width={400}
              height={400}
              className="w-60 md:w-80 h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* ================= About ================= */}
      <section id="about" className="scroll-mt-24 min-h-dvh p-2 flex justify-center"
      >
        <div className="py-16 space-y-4 w-full max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            {aboutData?.title || 'About Me'}
          </h1>

          {aboutData?.content && (
            <div className="prose dark:prose-invert max-w-none">
              <PortableText value={aboutData.content} />
            </div>
          )}

          {aboutData?.techStack && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {aboutData.techStack.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-white bg-[#ff4040] rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= Portfolio ================= */}
      <section id="portfolio" className="scroll-mt-24 min-h-dvh p-2 flex justify-center">
        <div className="py-16 space-y-4 w-full max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-extrabold">Portfolio</h1>

          <div className="grid gap-4">
            {portfolioData.map(item => (
              <motion.div
                key={item._id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedProject(item)}
                className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>

                {/* {item.description && (
                  <div className="prose prose-sm dark:prose-invert line-clamp-3 mb-4">
                    <PortableText value={item.description} />
                  </div>
                )} */}

                <div className="flex flex-wrap gap-2 mt-3">
                  {item.tools?.map(tool => (
                    <span key={tool} className="px-3 py-1 text-xs rounded-full bg-neutral-200 dark:bg-neutral-700">
                      {tool}
                    </span>
                  ))}
                </div>

                <span className="text-sm text-[#ff4040]">
                  Click to see details →
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* ================= MODAL Portfolio ================= */}
      {selectedProject && (
        <PortfolioModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* ================= Contact ================= */}
      <section id="contact" className="scroll-mt-24 min-h-dvh p-2 flex justify-center">
        <div className="py-16 space-y-4 w-full max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-extrabold">Contact</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h2>Get in touch</h2>
              {linkcontact.map(item => (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline"
                >
                  {item.icon}
                  {item.name}
                </a>
              ))}
            </div>
            <FormContact />
          </div>
        </div>
      </section>

      {/* ================= Footer ================= */}
      <footer className="p-2 text-center text-sm">
        © {new Date().getFullYear()} Made with ❤️ by Hasta
      </footer>
    </main>
  )
}
