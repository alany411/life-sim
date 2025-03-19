'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { useIsMounted } from 'usehooks-ts'

import { useCharacterAssets } from '~/hooks/use-character-assets'
import { useCharacterInfo } from '~/hooks/use-character-info'
import { useCharacterStats } from '~/hooks/use-character-stats'
import { useCharacterStatus } from '~/hooks/use-character-status'
import { useGame } from '~/hooks/use-game'

import { CharacterCreation } from './character-creation'
import { Dashboard } from './dashboard'

export function Game() {
  const { game, updateGame } = useGame()
  const { resetCharacterAssets } = useCharacterAssets()
  const { resetCharacterInfo } = useCharacterInfo()
  const { resetCharacterStats } = useCharacterStats()
  const { resetCharacterStatus } = useCharacterStatus()
  const isMounted = useIsMounted()()

  useEffect(() => {
    const resetCharacter = () => {
      resetCharacterAssets()
      resetCharacterInfo()
      resetCharacterStats()
      resetCharacterStatus()
    }

    if (!game.initialized) {
      resetCharacter()
      updateGame('initialized', true)
    }

    if (!game.started) {
      resetCharacter()
    }
  }, [
    game.initialized,
    game.started,
    resetCharacterAssets,
    resetCharacterInfo,
    resetCharacterStats,
    resetCharacterStatus,
    updateGame,
  ])

  if (!isMounted) {
    return null
  }

  return (
    <AnimatePresence mode='wait'>
      {!game.started ? (
        <motion.div
          key='character-creation'
          animate={{ opacity: 1, scale: 1 }}
          className='flex flex-1'
          exit={{ opacity: 0, scale: 0.95 }}
          initial={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <CharacterCreation />
        </motion.div>
      ) : (
        <motion.div
          key='dashboard'
          animate={{ opacity: 1 }}
          className='flex flex-1'
          exit={{ opacity: 0, transition: { duration: 0 } }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Dashboard />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
