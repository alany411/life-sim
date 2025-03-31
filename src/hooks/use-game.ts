import { useLocalStorage } from 'usehooks-ts'

import type { Game } from '~/schemas/game'
import { gameSaveSchema } from '~/schemas/game'

import { useCharacterAssets } from './use-character-assets'
import { useCharacterInfo } from './use-character-info'
import { useCharacterStats } from './use-character-stats'
import { useCharacterStatus } from './use-character-status'

export function useGame() {
  const { characterAssets, setCharacterAssets } = useCharacterAssets()
  const { characterInfo, setCharacterInfo } = useCharacterInfo()
  const { characterStats, setCharacterStats } = useCharacterStats()
  const { characterStatus, setCharacterStatus } = useCharacterStatus()
  const [game, setGame] = useLocalStorage<Game>('game', {
    initialized: false,
    started: false,
  })

  const updateGame = <K extends keyof Game>(key: K, value: Game[K]) => {
    setGame((prev) => ({ ...prev, [key]: value }))
  }

  const exportGameSave = () => {
    try {
      const saveData = gameSaveSchema.parse({
        characterAssets,
        characterInfo,
        characterStats,
        characterStatus,
      })

      return btoa(JSON.stringify(saveData))
    } catch (_error) {
      return null
    }
  }

  const loadGameSave = (gameSave: string) => {
    try {
      const saveData = gameSaveSchema.parse(JSON.parse(atob(gameSave)))

      setCharacterAssets(saveData.characterAssets)
      setCharacterInfo(saveData.characterInfo)
      setCharacterStats(saveData.characterStats)
      setCharacterStatus(saveData.characterStatus)
      setGame({
        initialized: true,
        started: true,
      })
    } catch (_error) {
      return null
    }
  }

  return {
    game,
    setGame,
    updateGame,
    exportGameSave,
    loadGameSave,
  }
}
