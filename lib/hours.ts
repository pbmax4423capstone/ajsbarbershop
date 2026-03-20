import type { DayHours } from './business'

/**
 * Returns the DayHours entry for today (based on the client's local time).
 * Falls back to Sunday if the day index is out of range.
 */
export function getTodayHours(hours: DayHours[]): DayHours {
  // getDay() returns 0 = Sunday, 1 = Monday, ... 6 = Saturday
  // BUSINESS.hours array is ordered Monday=0 through Sunday=6
  const jsDay = new Date().getDay() // 0 (Sun) – 6 (Sat)
  // Remap: JS Sunday(0) → index 6, Monday(1) → index 0, etc.
  const idx = jsDay === 0 ? 6 : jsDay - 1
  return hours[idx] ?? hours[6]
}

/**
 * Returns true if the shop is currently open based on today's hours
 * and the current local time.
 */
export function isOpenNow(hours: DayHours[]): boolean {
  const today = getTodayHours(hours)
  if (today.isClosed || !today.open || !today.close) return false

  const now = new Date()
  const [openTime, openPeriod] = today.open.split(' ')
  const [closeTime, closePeriod] = today.close.split(' ')
  const [openH, openM] = openTime.split(':').map(Number)
  const [closeH, closeM] = closeTime.split(':').map(Number)

  let openMinutes = openH * 60 + openM
  let closeMinutes = closeH * 60 + closeM
  const nowMinutes = now.getHours() * 60 + now.getMinutes()

  // Convert 12-hour to 24-hour
  if (openPeriod === 'PM' && openH !== 12) openMinutes += 12 * 60
  if (openPeriod === 'AM' && openH === 12) openMinutes -= 12 * 60
  if (closePeriod === 'PM' && closeH !== 12) closeMinutes += 12 * 60
  if (closePeriod === 'AM' && closeH === 12) closeMinutes -= 12 * 60

  return nowMinutes >= openMinutes && nowMinutes < closeMinutes
}

/**
 * Formats an open/close time pair into a readable string.
 * Returns "Closed" if either value is null.
 */
export function formatTimeRange(
  open: string | null,
  close: string | null
): string {
  if (!open || !close) return 'Closed'
  return `${open} – ${close}`
}

/**
 * Returns a short status label and whether the shop is open.
 */
export function getStatusLabel(hours: DayHours[]): {
  label: string
  isOpen: boolean
} {
  const open = isOpenNow(hours)
  return {
    label: open ? 'Open Now' : 'By Appointment',
    isOpen: open,
  }
}
