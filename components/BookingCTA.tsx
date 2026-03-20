import { BUSINESS } from '@/lib/business'

interface BookingCTAProps {
  label?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function BookingCTA({
  label = 'Book Appointment',
  className = '',
  size = 'md',
}: BookingCTAProps) {
  return (
    <a
      href={BUSINESS.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book an appointment at A.J's Barbershop (opens in new tab)"
      className={`
        inline-block
        bg-accent hover:bg-accent-dark
        text-primary
        font-bold
        rounded-lg
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {label}
    </a>
  )
}
