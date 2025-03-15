'use client'

import { format } from 'date-fns'
import { RandomAvatar } from 'react-random-avatar'
import type { Entries } from 'type-fest'

import { useCharacterAssets } from '~/hooks/use-character-assets'
import { useCharacterInfo } from '~/hooks/use-character-info'
import { useCharacterStats } from '~/hooks/use-character-stats'
import { useGame } from '~/hooks/use-game'
import { capitalize } from '~/lib/utils'

import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const statEmojis = {
  charisma: '✨',
  dexterity: '🏃',
  intelligence: '🧠',
  strength: '💪',
  wisdom: '🔮',
}

export function Dashboard() {
  const { resetGame } = useGame()
  const { characterInfo } = useCharacterInfo()
  const { characterStats } = useCharacterStats()
  const { characterAssets } = useCharacterAssets()

  return (
    <Card className='mx-auto w-full max-w-4xl'>
      <CardHeader className='pb-2'>
        <div className='flex items-start justify-between gap-8'>
          <div className='flex items-start gap-4'>
            <RandomAvatar seed={characterInfo.avatar} size={12} />
            <div className='space-y-2'>
              <div>
                <CardTitle>{characterInfo.name}</CardTitle>
                <div className='text-muted-foreground text-sm'>
                  Born: {format(characterInfo.birthday, 'MMMM d')}
                </div>
              </div>
              <Button
                size='sm'
                variant='destructive'
                onClick={() => {
                  resetGame()
                }}
              >
                Start Over
              </Button>
            </div>
          </div>
          <div className='flex flex-wrap items-center gap-2'>
            {(
              Object.entries(characterStats) as Entries<typeof characterStats>
            ).map(([stat, point]) => (
              <div
                key={stat}
                className='bg-muted flex min-w-24 flex-col gap-0.5 rounded-lg px-3 py-1.5'
              >
                <div className='flex items-center justify-between text-sm'>
                  <div className='flex items-center gap-1'>
                    {statEmojis[stat]}
                    <span className='text-xs'>{capitalize(stat)}</span>
                  </div>
                  <div className='font-medium'>{point}</div>
                </div>
                <Progress className='h-0.5' max={5} value={point} />
              </div>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='assets'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='assets'>Assets</TabsTrigger>
            <TabsTrigger value='actions'>Actions</TabsTrigger>
          </TabsList>

          <TabsContent className='mt-4' value='assets'>
            <div className='grid gap-4'>
              <div>
                <h3 className='font-semibold'>Inventory</h3>
                {characterAssets.inventory.length === 0 ? (
                  <p className='text-muted-foreground text-sm'>Empty</p>
                ) : (
                  <ul>
                    {characterAssets.inventory.map((item, index) => (
                      <li key={index}>
                        {item.name} (x{item.quantity})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h3 className='font-semibold'>Houses</h3>
                {characterAssets.houses.length === 0 ? (
                  <p className='text-muted-foreground text-sm'>No properties</p>
                ) : (
                  <ul>
                    {characterAssets.houses.map((house, index) => (
                      <li key={index}>{house.name}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h3 className='font-semibold'>Vehicles</h3>
                {characterAssets.vehicles.length === 0 ? (
                  <p className='text-muted-foreground text-sm'>No vehicles</p>
                ) : (
                  <ul>
                    {characterAssets.vehicles.map((vehicle, index) => (
                      <li key={index}>{vehicle.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent className='mt-4' value='actions'>
            <div className='grid grid-cols-2 gap-2'>
              <Button
                className='h-auto flex-col items-center py-4'
                variant='outline'
              >
                <span>👔 Get a Job</span>
                <span className='text-muted-foreground text-xs'>
                  Find employment
                </span>
              </Button>
              <Button
                className='h-auto flex-col items-center py-4'
                variant='outline'
              >
                <span>🎓 Study</span>
                <span className='text-muted-foreground text-xs'>
                  Improve your skills
                </span>
              </Button>
              <Button
                className='h-auto flex-col items-center py-4'
                variant='outline'
              >
                <span>🏠 Real Estate</span>
                <span className='text-muted-foreground text-xs'>
                  Buy or sell property
                </span>
              </Button>
              <Button
                className='h-auto flex-col items-center py-4'
                variant='outline'
              >
                <span>🚗 Vehicles</span>
                <span className='text-muted-foreground text-xs'>
                  Buy or sell vehicles
                </span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
