import { useLocalStorage } from 'usehooks-ts'

import { randomDate, randomInt, randomName } from '~/lib/utils'

export function useCharacterInfo() {
  const [characterInfo, setCharacterInfo] = useLocalStorage('character-info', {
    avatar: '',
    name: '',
    birthday: new Date(),
    age: 0,
    gender: '',
    profession: '',
  })

  const resetCharacterInfo = () => {
    setCharacterInfo({
      avatar: randomInt(1, 100_000).toString(),
      name: randomName(),
      birthday: randomDate(),
      age: 0,
      gender: '',
      profession: '',
    })
  }

  const updateCharacterInfo = <K extends keyof typeof characterInfo>(
    key: K,
    value: (typeof characterInfo)[K]
  ) => {
    setCharacterInfo((prev) => ({ ...prev, [key]: value }))
  }

  return {
    characterInfo,
    resetCharacterInfo,
    updateCharacterInfo,
  }
}
