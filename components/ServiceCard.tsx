import type { Service } from '@/lib/business'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-surface border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 px-5 py-4">
      <div className="flex items-start justify-between gap-4">
        {/* Left: name + optional details */}
        <div className="flex-1">
          <h3 className="font-semibold text-text-main text-base leading-snug">
            {service.name}
          </h3>
          {service.duration && (
            <p className="text-sm text-text-secondary mt-0.5">
              {service.duration}
            </p>
          )}
          {service.description && (
            <p className="text-sm text-text-secondary mt-1">
              {service.description}
            </p>
          )}
        </div>

        {/* Right: price */}
        <div className="flex-shrink-0">
          <span className="text-xl font-bold text-accent">
            {service.price}
          </span>
        </div>
      </div>
    </div>
  )
}
