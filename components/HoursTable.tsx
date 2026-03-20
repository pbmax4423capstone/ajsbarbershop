import { BUSINESS } from '@/lib/business'
import { getTodayHours, formatTimeRange } from '@/lib/hours'

interface HoursTableProps {
  highlightToday?: boolean
}

export default function HoursTable({ highlightToday = true }: HoursTableProps) {
  // NOTE: In a static export, new Date() runs at BUILD TIME, not at the user's
  // request time. The highlighted row reflects the day the site was last deployed.
  const todayEntry = getTodayHours(BUSINESS.hours)

  return (
    <div className="w-full">
      <dl className="divide-y divide-border">
        {BUSINESS.hours.map((entry) => {
          const isToday = highlightToday && entry.day === todayEntry.day
          const hoursText = formatTimeRange(entry.open, entry.close)

          return (
            <div
              key={entry.day}
              className={`flex justify-between items-center py-3 px-2 ${
                isToday
                  ? 'bg-accent/10 border-l-4 border-accent pl-3 rounded-sm'
                  : ''
              }`}
            >
              <dt
                className={`font-medium ${
                  isToday
                    ? 'text-primary font-bold'
                    : entry.isClosed
                    ? 'text-text-secondary'
                    : 'text-text-main'
                }`}
              >
                {entry.day}
                {isToday && (
                  <span className="ml-2 text-xs font-normal text-accent">
                    (Today)
                  </span>
                )}
              </dt>
              <dd
                className={`text-sm ${
                  entry.isClosed
                    ? 'text-text-secondary italic'
                    : isToday
                    ? 'text-primary font-semibold'
                    : 'text-text-main'
                }`}
              >
                {hoursText}
              </dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
