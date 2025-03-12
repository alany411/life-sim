import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { names, uniqueNamesGenerator } from 'unique-names-generator'
import { useLocalStorage } from 'usehooks-ts'
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
    separator: ' ',
    length: 2,
    style: 'capital',
  })
}

export function useGameState() {
  const [date, setDate] = useLocalStorage('date', new Date())

  return { date, setDate }
}

export function useCharacterStats() {
  const [name, setName] = useLocalStorage('name', '')
  const [age, setAge] = useLocalStorage('age', 0)
  const [gender, setGender] = useLocalStorage('gender', '')
  const [height, setHeight] = useLocalStorage('height', 0)
  const [weight, setWeight] = useLocalStorage('weight', 0)
  const [profession, setProfession] = useLocalStorage('profession', '')
  const [strength, setStrength] = useLocalStorage('strength', 1)
  const [agility, setAgility] = useLocalStorage('agility', 1)
  const [intelligence, setIntelligence] = useLocalStorage('intelligence', 1)
  const [wisdom, setWisdom] = useLocalStorage('wisdom', 1)
  const [charisma, setCharisma] = useLocalStorage('charisma', 1)

  return {
    name,
    setName,
    age,
    setAge,
    gender,
    setGender,
    height,
    setHeight,
    weight,
    setWeight,
    profession,
    setProfession,
    strength,
    setStrength,
    agility,
    setAgility,
    intelligence,
    setIntelligence,
    wisdom,
    setWisdom,
    charisma,
    setCharisma,
  }
}

export function useCharacterInventory() {
  const [money, setMoney] = useLocalStorage('money', 0)
  const [items, setItems] = useLocalStorage('items', [])

  return { money, setMoney, items, setItems }
}

export function useRelations() {
  const [relations, setRelations] = useLocalStorage('relations', [])

  return { relations, setRelations }
}
