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

export function randomFloat(min: number, max: number) {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100
}

export function randomName() {
  return uniqueNamesGenerator({
    dictionaries: [names, names],
    length: 2,
    separator: ' ',
    style: 'capital',
  })
}
