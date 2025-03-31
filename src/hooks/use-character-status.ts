import { randomInt } from '~/lib/utils'
import type { CharacterStatus } from '~/schemas/character-status'

import { useStorage } from './use-storage'

export function useCharacterStatus() {
  const [characterStatus, setCharacterStatus] = useStorage<CharacterStatus>(
    'character-status',
    {
      happiness: 0,
      health: 0,
    }
  )

  const resetCharacterStatus = () => {
    setCharacterStatus({
      happiness: randomInt(50, 100),
      health: randomInt(50, 100),
    })
  }

  const updateCharacterStatus = <K extends keyof CharacterStatus>(
    key: K,
    value: CharacterStatus[K]
  ) => {
    setCharacterStatus((prev) => ({ ...prev, [key]: value }))
  }

  return {
    characterStatus,
    setCharacterStatus,
    resetCharacterStatus,
    updateCharacterStatus,
  }
}
