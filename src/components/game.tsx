'use client'

import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { RandomAvatar } from 'react-random-avatar'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'
import { useIsMounted } from 'usehooks-ts'

import { useCharacterInfo } from '~/hooks/use-character-info'
import { useCharacterStats } from '~/hooks/use-character-stats'
import { useGame } from '~/hooks/use-game'
import { capitalize } from '~/lib/utils'

import { CharacterCreation } from './character-creation'
import { Modal } from './modal'
import { Button } from './ui/button'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart'

export function Game() {
  const { game, resetGame, updateGame } = useGame()
  const { characterInfo } = useCharacterInfo()
  const { characterStats } = useCharacterStats()
  const isMounted = useIsMounted()()
  const [showCharacterModal, setShowCharacterModal] = useState(false)

  useEffect(() => {
    if (!game.initialized) {
      resetGame()
      updateGame('initialized', true)
    }
  }, [game.initialized, resetGame, updateGame])

  if (!isMounted) {
    return null
  }

  return (
    <>
      {!game.started ? (
        <CharacterCreation setShowCharacterModal={setShowCharacterModal} />
      ) : (
        <div>
          <div>Game Started</div>
          <Button
            onClick={() => {
              resetGame()
            }}
          >
            Start Over
          </Button>
        </div>
      )}

      <Modal
        description={`${characterInfo.name} was born on ${format(characterInfo.birthday, 'MMMM d')}.`}
        open={showCharacterModal}
        setOpen={setShowCharacterModal}
        title='Welcome to LifeSim 😎'
        content={
          <div className='grid w-full grid-cols-1 place-items-center gap-4 sm:grid-cols-2'>
            <RandomAvatar seed={characterInfo.avatar} size={15} />
            <ChartContainer
              className='mx-auto h-full w-full'
              config={{
                point: {
                  label: 'Stat Points',
                  color: 'var(--chart-1)',
                },
              }}
            >
              <RadarChart
                data={Object.entries(characterStats).map(([stat, point]) => ({
                  stat: capitalize(stat),
                  point: point,
                }))}
              >
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  cursor={false}
                />
                <PolarAngleAxis dataKey='stat' />
                <PolarGrid />
                <Radar
                  animationDuration={0}
                  dataKey='point'
                  fill='var(--color-point)'
                  fillOpacity={0.6}
                  dot={{
                    r: 4,
                    fillOpacity: 1,
                  }}
                />
              </RadarChart>
            </ChartContainer>
          </div>
        }
      />
    </>
  )
}
