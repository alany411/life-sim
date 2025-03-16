'use client'

import { format } from 'date-fns'
import { LucideSettings as LucideSettingsIcon } from 'lucide-react'
import { useState } from 'react'
import { RandomAvatar } from 'react-random-avatar'
import type { Entries } from 'type-fest'

import { useCharacterInfo } from '~/hooks/use-character-info'
import { useCharacterStats } from '~/hooks/use-character-stats'
import { useCharacterStatus } from '~/hooks/use-character-status'
import { useGame } from '~/hooks/use-game'
import { cn, formatCurrency } from '~/lib/utils'

import { Modal } from './modal'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

export function Dashboard() {
  const { characterInfo } = useCharacterInfo()
  const { characterStats } = useCharacterStats()
  const { characterStatus } = useCharacterStatus()
  const { resetGame } = useGame()
  const [activeTab, setActiveTab] = useState('1')
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)

  const characterStatsEntries = Object.entries(
    characterStats
  ) as Entries<CharacterStats>

  const characterStatsTotal = Object.values(characterStats).reduce(
    (acc, curr) => acc + curr,
    0
  )

  return (
    <div className='flex flex-1 flex-col'>
      <div className='bg-sidebar text-sidebar-foreground border-sidebar-border flex w-full border-b'>
        <div className='mx-auto flex w-full max-w-6xl flex-1 items-center justify-between p-4 text-3xl leading-none font-semibold'>
          <div>LifeSim</div>
          <Button
            size='icon'
            variant='ghost'
            onClick={() => {
              setIsSettingsModalOpen(true)
            }}
          >
            <LucideSettingsIcon className='size-6' />
          </Button>
        </div>
      </div>
      <div className='mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 p-4'>
        <Card>
          <CardContent>
            <div className='flex flex-1 flex-col gap-6 md:flex-row'>
              <div className='flex w-full items-center justify-center gap-4 md:max-w-1/2'>
                <RandomAvatar seed={characterInfo.avatar} size={12} />
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
                      <div className='text-muted-foreground text-sm'>Money</div>
                      <div
                        className={cn(
                          characterInfo.money > 0 && 'text-positive-money',
                          characterInfo.money < 0 && 'text-negative-money'
                        )}
                      >
                        {formatCurrency(characterInfo.money)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex w-full flex-1 flex-col gap-2 md:max-w-1/2'>
                <div className='flex justify-center'>
                  <div className='flex flex-row flex-wrap gap-2'>
                    {characterStatsEntries.map(([stat, point]) => {
                      return (
                        <div
                          key={stat}
                          className='bg-muted flex aspect-square h-12 flex-col items-center justify-center rounded-lg text-sm/4'
                        >
                          <div className='font-bold tracking-wider tabular-nums'>
                            {stat.slice(0, 3).toUpperCase()}
                          </div>
                          <div className='tabular-nums'>{point}</div>
                        </div>
                      )
                    })}
                    <div className='bg-muted flex aspect-square h-12 flex-col items-center justify-center rounded-lg text-sm/4 invert'>
                      <div className='font-bold tracking-wider tabular-nums'>
                        TOT
                      </div>
                      <div className='tabular-nums'>{characterStatsTotal}</div>
                    </div>
                  </div>
                </div>
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
                    title='Happiness percentage'
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
                    title='Health percentage'
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

      <Modal
        open={isSettingsModalOpen}
        setOpen={setIsSettingsModalOpen}
        title='Settings'
        content={
          <div className='flex flex-1'>
            <AlertDialog>
              <AlertDialogTrigger asChild={true}>
                <Button className='w-full' variant='destructive'>
                  Reset Life
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Continuing will end this
                    current life so you can start a new one.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      resetGame()
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        }
      />
    </div>
  )
}
