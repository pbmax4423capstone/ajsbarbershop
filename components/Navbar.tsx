'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/info', label: 'Info' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-primary text-white shadow-md">
      <nav className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo / Shop Name */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight hover:text-accent transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          A.J&apos;s Barbershop
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`font-medium transition-colors hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded ${
                  pathname === href ? 'text-accent' : 'text-white'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden text-2xl focus:outline-none focus:ring-2 focus:ring-accent rounded"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-primary-dark px-4 pb-4">
          <ul className="flex flex-col gap-2">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block py-3 font-medium transition-colors hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary-dark rounded ${
                    pathname === href ? 'text-accent' : 'text-white'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
