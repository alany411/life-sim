import { useLocalStorage } from 'usehooks-ts'

import { randomDate, randomInt, randomName } from '~/lib/utils'

export function useCharacterStats() {
  const [characterStats, setCharacterStats] = useLocalStorage(
    'character-stats',
    {
      avatar: '',
      name: '',
      birthday: {
        label: '',
        value: new Date(),
      },
      age: 0,
      gender: '',
      profession: '',
      agility: 0,
      charisma: 0,
      intelligence: 0,
      strength: 0,
      wisdom: 0,
    }
  )

  const resetCharacterStats = () => {
    const { label, value } = randomDate()

    setCharacterStats({
      avatar: randomInt(1, 100_000).toString(),
      name: randomName(),
      birthday: {
        label,
        value,
      },
      age: 0,
      gender: '',
      profession: '',
      agility: 0,
      charisma: 0,
      intelligence: 0,
      strength: 0,
      wisdom: 0,
    })
  }

  const updateCharacterStats = <K extends keyof typeof characterStats>(
    key: K,
    value: (typeof characterStats)[K]
  ) => {
    setCharacterStats((prev) => ({ ...prev, [key]: value }))
  }

  return {
    ...characterStats,
    resetCharacterStats,
    updateCharacterStats,
  }
}
