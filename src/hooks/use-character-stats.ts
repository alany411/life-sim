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
      agility: randomInt(0, 5),
      charisma: randomInt(0, 5),
      intelligence: randomInt(0, 5),
      strength: randomInt(0, 5),
      wisdom: randomInt(0, 5),
    })
  }

  const zeroCharacterStats = () => {
    setCharacterStats({
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
    characterStats,
    resetCharacterStats,
    zeroCharacterStats,
    updateCharacterStats,
  }
}
