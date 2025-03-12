import { useLocalStorage } from 'usehooks-ts'

import { useCharacterAssets } from './use-character-assets'
import { useCharacterStats } from './use-character-stats'

export function useGame() {
  const [game, setGame] = useLocalStorage('game', {
    initialized: false,
  })
  const { resetCharacterAssets } = useCharacterAssets()
  const { resetCharacterStats } = useCharacterStats()

  const resetGame = () => {
    resetCharacterAssets()
    resetCharacterStats()
  }

  const updateGame = <K extends keyof typeof game>(
    key: K,
    value: (typeof game)[K]
  ) => {
    setGame((prev) => ({ ...prev, [key]: value }))
  }

  return {
    ...game,
    resetGame,
    updateGame,
  }
}
