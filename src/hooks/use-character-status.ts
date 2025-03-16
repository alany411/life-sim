import { useLocalStorage } from 'usehooks-ts'

import { randomInt } from '~/lib/utils'

export function useCharacterStatus() {
  const [characterStatus, setCharacterStatus] =
    useLocalStorage<CharacterStatus>('character-status', {
      happiness: 0,
      health: 0,
    })

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
    resetCharacterStatus,
    updateCharacterStatus,
  }
}
