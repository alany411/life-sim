import type { SuperJSONResult } from 'superjson'
import superjson from 'superjson'
import { useLocalStorage } from 'usehooks-ts'

import { randomDate, randomInt, randomName } from '~/lib/utils'
import type { CharacterInfo } from '~/schemas/character-info'

export function useCharacterInfo() {
  const [characterInfo, setCharacterInfo] = useLocalStorage<CharacterInfo>(
    'character-info',
    {
      avatar: '',
      name: '',
      birthday: new Date(),
      age: 0,
      gender: '',
      profession: '',
      money: 0,
    },
    {
      deserializer: (value) => {
        const { json, meta } = JSON.parse(value) as SuperJSONResult
        return superjson.deserialize({ json, meta })
      },
      serializer: (value) => {
        const { json, meta } = superjson.serialize(value)
        return JSON.stringify({ json, meta })
      },
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
