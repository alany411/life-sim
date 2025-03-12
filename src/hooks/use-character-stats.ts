import { useLocalStorage } from 'usehooks-ts'

import { randomInt } from '~/lib/utils'

export function useCharacterStats() {
  const [characterStats, setCharacterStats] = useLocalStorage(
    'character-stats',
    {
      agility: 0,
      charisma: 0,
      intelligence: 0,
      strength: 0,
      wisdom: 0,
    }
  )

  const resetCharacterStats = () => {
    setCharacterStats({
      agility: randomInt(0, 3),
      charisma: randomInt(0, 3),
      intelligence: randomInt(0, 3),
      strength: randomInt(0, 3),
      wisdom: randomInt(0, 3),
    })
  }

  const updateCharacterStats = <K extends keyof typeof characterStats>(
    key: K,
    value: (typeof characterStats)[K]
  ) => {
    setCharacterStats((prev) => ({ ...prev, [key]: value }))
  }

  return {
    characterStats,
    resetCharacterStats,
    updateCharacterStats,
  }
}
