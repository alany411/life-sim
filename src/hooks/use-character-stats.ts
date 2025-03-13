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
      agility: randomInt(1, 5),
      charisma: randomInt(1, 5),
      intelligence: randomInt(1, 5),
      strength: randomInt(1, 5),
      wisdom: randomInt(1, 5),
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
