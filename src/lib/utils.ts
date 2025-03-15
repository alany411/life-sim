import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { names, uniqueNamesGenerator } from 'unique-names-generator'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomName() {
  return uniqueNamesGenerator({
    dictionaries: [names, names],
    length: 2,
    separator: ' ',
    style: 'capital',
  })
}

export function randomDate() {
  const date = new Date(Math.floor(Math.random() * Date.now()))
  date.setUTCHours(12, 0, 0, 0)

  return date
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}
