import { toast } from 'sonner'
import type { SuperJSONResult } from 'superjson'
import { deserialize, serialize } from 'superjson'

import type { Game } from '~/schemas/game'
import { gameSaveSchema } from '~/schemas/game'

import { useCharacterAssets } from './use-character-assets'
import { useCharacterInfo } from './use-character-info'
import { useCharacterStats } from './use-character-stats'
import { useCharacterStatus } from './use-character-status'
import { useStorage } from './use-storage'

export function useGame() {
  const { characterAssets, setCharacterAssets } = useCharacterAssets()
  const { characterInfo, setCharacterInfo } = useCharacterInfo()
  const { characterStats, setCharacterStats } = useCharacterStats()
  const { characterStatus, setCharacterStatus } = useCharacterStatus()
  const [game, setGame] = useStorage<Game>('game', {
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

      const { json, meta } = serialize(saveData)
      return btoa(JSON.stringify({ json, meta }))
    } catch (_error) {
      toast.error('There was an error generating your game save export code.')
      return ''
    }
  }

  const importGameSave = (gameSave: string) => {
    try {
      const { json, meta } = JSON.parse(atob(gameSave)) as SuperJSONResult
      const saveData = gameSaveSchema.parse(deserialize({ json, meta }))

      setCharacterAssets(saveData.characterAssets)
      setCharacterInfo(saveData.characterInfo)
      setCharacterStats(saveData.characterStats)
      setCharacterStatus(saveData.characterStatus)
      setGame({
        initialized: true,
        started: true,
      })

      toast.success('Game save imported successfully.')
    } catch (_error) {
      toast.error('There was an error importing your game save.')
    }
  }

  return {
    game,
    setGame,
    updateGame,
    exportGameSave,
    importGameSave,
  }
}
