import type { Metadata } from 'next'
import { BUSINESS } from '@/lib/business'
import ServiceCard from '@/components/ServiceCard'
import BookingCTA from '@/components/BookingCTA'

export const metadata: Metadata = {
  title: 'Services & Pricing',
  description:
    "View all services and pricing at A.J's Barbershop in Greenwood Village, CO. Men's cuts, senior cuts, kids cuts, beard detail, and more.",
}

export default function ServicesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          Our Services
        </h1>
        <p className="text-text-secondary">
          All cuts are by appointment only. Book online through our Square booking page.
        </p>
      </div>

      {/* Services list */}
      <div className="space-y-3 mb-12">
        {BUSINESS.services.map((service) => (
          <ServiceCard key={service.name} service={service} />
        ))}
      </div>

      {/* Booking CTA */}
      <div className="text-center bg-primary rounded-xl px-6 py-10">
        <h2 className="text-2xl font-bold text-white mb-3">
          Ready to book?
        </h2>
        <p className="text-gray-300 mb-6">
          Schedule your appointment online in just a few clicks.
        </p>
        <BookingCTA size="lg" label="Book Your Appointment" />
      </div>

    </div>
  )
}
