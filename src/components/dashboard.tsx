'use client'

import { format } from 'date-fns'
import { useState } from 'react'
import { RandomAvatar } from 'react-random-avatar'
import type { Entries } from 'type-fest'

import { useCharacterInfo } from '~/hooks/use-character-info'
import { useCharacterStats } from '~/hooks/use-character-stats'
import { useCharacterStatus } from '~/hooks/use-character-status'
import { formatCurrency } from '~/lib/utils'

import { Card, CardContent } from './ui/card'
import { Progress } from './ui/progress'
import { Separator } from './ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

export function Dashboard() {
  const { characterInfo } = useCharacterInfo()
  const { characterStats } = useCharacterStats()
  const { characterStatus } = useCharacterStatus()
  const [activeTab, setActiveTab] = useState('1')

  return (
    <div className='mx-auto flex max-w-6xl flex-1 flex-col gap-4'>
      <Card>
        <CardContent>
          <div className='flex flex-col gap-6 py-4 md:flex-row'>
            <div className='flex flex-shrink-0 gap-6'>
              <RandomAvatar seed={characterInfo.avatar} size={15} />
              <div className='flex flex-col gap-4'>
                <div>
                  <div className='text-3xl font-semibold'>
                    {characterInfo.name}
                  </div>
                  <div className='text-muted-foreground flex gap-2 text-sm'>
                    <span>{characterInfo.age} years old</span>
                    <span>•</span>
                    <span>
                      Born {format(characterInfo.birthday, 'MMMM dd')}
                    </span>
                  </div>
                </div>
                <div className='flex items-center gap-6'>
                  <div className='flex flex-col'>
                    <div className='text-muted-foreground text-sm'>
                      Profession
                    </div>
                    <div>{characterInfo.profession || 'Unemployed'}</div>
                  </div>
                  <div className='flex flex-col'>
                    <div className='text-muted-foreground text-sm'>
                      Net Worth
                    </div>
                    <div>{formatCurrency(characterInfo.money)}</div>
                  </div>
                </div>
                <div className='flex flex-row flex-wrap gap-2'>
                  {(
                    Object.entries(characterStats) as Entries<
                      typeof characterStats
                    >
                  ).map(([stat, point]) => {
                    return (
                      <div
                        key={stat}
                        className='bg-muted flex aspect-square h-13 flex-col items-center justify-center rounded-lg text-sm/4'
                      >
                        <div className='font-bold tracking-wider tabular-nums'>
                          {stat.slice(0, 3).toUpperCase()}
                        </div>
                        <div className='tabular-nums'>{point}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className='h-auto'>
              <Separator orientation='vertical' />
            </div>

            <div className='flex flex-1 flex-col gap-2'>
              <div className='flex flex-col gap-1'>
                <div className='flex items-center justify-between'>
                  <div className='text-sm font-medium'>Happiness</div>
                  <div className='text-muted-foreground text-sm tabular-nums'>
                    {characterStatus.happiness}%
                  </div>
                </div>
                <Progress
                  className='h-2'
                  max={100}
                  value={characterStatus.happiness}
                />
              </div>

              <div className='flex flex-col gap-1'>
                <div className='flex items-center justify-between'>
                  <div className='text-sm font-medium'>Health</div>
                  <div className='text-muted-foreground text-sm tabular-nums'>
                    {characterStatus.health}%
                  </div>
                </div>
                <Progress
                  className='h-2'
                  max={100}
                  value={characterStatus.health}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Tabs defaultValue='1' value={activeTab} onValueChange={setActiveTab}>
        <TabsList className='grid w-full grid-cols-5'>
          <TabsTrigger value='1'>Some Tab 1</TabsTrigger>
          <TabsTrigger value='2'>Some Tab 2</TabsTrigger>
          <TabsTrigger value='3'>Some Tab 3</TabsTrigger>
          <TabsTrigger value='4'>Some Tab 4</TabsTrigger>
          <TabsTrigger value='5'>Some Tab 5</TabsTrigger>

          <TabsContent className='col-span-5 mt-5' value='1'>
            <Card>
              <CardContent>
                <div>Tab 1</div>
              </CardContent>
            </Card>
          </TabsContent>
        </TabsList>
      </Tabs>
    </div>
  )
}
