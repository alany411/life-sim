import { useLocalStorage } from 'usehooks-ts'

import { useCharacterAssets } from './use-character-assets'
import { useCharacterInfo } from './use-character-info'
import { useCharacterStats } from './use-character-stats'

export function useGame() {
  const [game, setGame] = useLocalStorage('game', {
    initialized: false,
    started: false,
  })
  const { resetCharacterAssets } = useCharacterAssets()
  const { resetCharacterInfo } = useCharacterInfo()
  const { resetCharacterStats } = useCharacterStats()

  const resetGame = () => {
    resetCharacterAssets()
    resetCharacterInfo()
    resetCharacterStats()
    setGame((prev) => ({ ...prev, started: false }))
  }

  const updateGame = <K extends keyof typeof game>(
    key: K,
    value: (typeof game)[K]
  ) => {
    setGame((prev) => ({ ...prev, [key]: value }))
  }

  return {
    game,
    resetGame,
    updateGame,
  }
}
