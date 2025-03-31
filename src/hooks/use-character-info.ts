import { useStorage } from '~/hooks/use-storage'
import { randomDate, randomInt, randomName } from '~/lib/utils'
import type { CharacterInfo } from '~/schemas/character-info'

export function useCharacterInfo() {
  const [characterInfo, setCharacterInfo] = useStorage<CharacterInfo>(
    'character-info',
    {
      avatar: '',
      name: '',
      birthday: new Date(),
      age: 0,
      gender: '',
      profession: '',
      money: 0,
    }
  )

  const resetCharacterInfo = () => {
    setCharacterInfo({
      avatar: randomInt(1, 100_000).toString(),
      name: randomName(),
      birthday: randomDate(),
      age: 0,
      gender: '',
      profession: '',
      money: 0,
    })
  }

  const updateCharacterInfo = <K extends keyof CharacterInfo>(
    key: K,
    value: CharacterInfo[K]
  ) => {
    setCharacterInfo((prev) => ({ ...prev, [key]: value }))
  }

  return {
    characterInfo,
    setCharacterInfo,
    resetCharacterInfo,
    updateCharacterInfo,
  }
}
