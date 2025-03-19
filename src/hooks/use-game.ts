import { useLocalStorage } from 'usehooks-ts'

export function useGame() {
  const [game, setGame] = useLocalStorage<Game>('game', {
    initialized: false,
    started: false,
  })

  const updateGame = <K extends keyof Game>(key: K, value: Game[K]) => {
    setGame((prev) => ({ ...prev, [key]: value }))
  }

  return {
    game,
    updateGame,
  }
}
