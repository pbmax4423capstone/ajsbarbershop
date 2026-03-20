import Link from 'next/link'
import { BUSINESS } from '@/lib/business'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Brand */}
        <div>
          <h3 className="text-lg font-bold mb-2">{BUSINESS.name}</h3>
          <p className="text-sm text-gray-300">{BUSINESS.tagline}</p>
        </div>

        {/* Column 2: Location */}
        <div>
          <h4 className="font-semibold mb-2 text-accent">Location</h4>
          <p className="text-sm text-gray-300 mb-3">
            {BUSINESS.address.street}<br />
            {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}
          </p>
          <a
            href={BUSINESS.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded"
          >
            Get Directions →
          </a>
        </div>

        {/* Column 3: Hours + Contact */}
        <div>
          <h4 className="font-semibold mb-2 text-accent">Hours</h4>
          <ul className="text-sm text-gray-300 space-y-1 mb-3">
            <li>Tue – Fri: 9:00 AM – 5:00 PM</li>
            <li>Saturday: 9:00 AM – 4:00 PM</li>
            <li>Sun &amp; Mon: Closed</li>
          </ul>
          <a
            href={`mailto:${BUSINESS.email}`}
            className="text-sm text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded"
          >
            {BUSINESS.email}
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 px-4 py-4">
        <p className="text-center text-xs text-gray-400">
          &copy; {currentYear} {BUSINESS.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
