import { useLocalStorage } from 'usehooks-ts'

import { randomInt } from '~/lib/utils'

export function useCharacterStats() {
  const [characterStats, setCharacterStats] = useLocalStorage<CharacterStats>(
    'character-stats',
    {
      charisma: 0,
      dexterity: 0,
      intelligence: 0,
      strength: 0,
      wisdom: 0,
    }
  )

  const resetCharacterStats = () => {
    setCharacterStats({
      charisma: randomInt(0, 5),
      dexterity: randomInt(0, 5),
      intelligence: randomInt(0, 5),
      strength: randomInt(0, 5),
      wisdom: randomInt(0, 5),
    })
  }

  const zeroCharacterStats = () => {
    setCharacterStats({
      charisma: 0,
      dexterity: 0,
      intelligence: 0,
      strength: 0,
      wisdom: 0,
    })
  }

  const updateCharacterStats = <K extends keyof CharacterStats>(
    key: K,
    value: CharacterStats[K]
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
