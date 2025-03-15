'use client'

import { useEffect } from 'react'
import { useIsMounted } from 'usehooks-ts'

import { useGame } from '~/hooks/use-game'

import { CharacterCreation } from './character-creation'
import { Dashboard } from './dashboard'

export function Game() {
  const { game, resetGame, updateGame } = useGame()
  const isMounted = useIsMounted()()

  useEffect(() => {
    if (!game.initialized) {
      resetGame()
      updateGame('initialized', true)
    }
  }, [game.initialized, resetGame, updateGame])

  if (!isMounted) {
    return null
  }

  return <>{!game.started ? <CharacterCreation /> : <Dashboard />}</>
}
