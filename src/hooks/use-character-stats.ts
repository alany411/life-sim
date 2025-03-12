import { useLocalStorage } from 'usehooks-ts'

import { randomDate, randomInt, randomName } from '~/lib/utils'

export function useCharacterStats() {
  const [characterStats, setCharacterStats] = useLocalStorage(
    'character-stats',
    {
      avatar: '',
      name: '',
      birthday: new Date(),
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
    setCharacterStats({
      avatar: randomInt(1, 100_000).toString(),
      name: randomName(),
      birthday: randomDate(),
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

  const info = {
    avatar: characterStats.avatar,
    name: characterStats.name,
    birthday: characterStats.birthday,
    age: characterStats.age,
    gender: characterStats.gender,
    profession: characterStats.profession,
  }

  const stats = {
    agility: characterStats.agility,
    charisma: characterStats.charisma,
    intelligence: characterStats.intelligence,
    strength: characterStats.strength,
    wisdom: characterStats.wisdom,
  }

  return {
    info,
    stats,
    resetCharacterStats,
    updateCharacterStats,
  }
}
