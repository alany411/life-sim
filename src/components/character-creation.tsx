'use client'

import { format } from 'date-fns'
import { useState } from 'react'
import { RandomAvatar } from 'react-random-avatar'
import type { Entries } from 'type-fest'

import { useCharacterInfo } from '~/hooks/use-character-info'
import { useCharacterStats } from '~/hooks/use-character-stats'
import { useGame } from '~/hooks/use-game'
import { capitalize } from '~/lib/utils'

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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { DatePicker } from './ui/date-picker'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const statEmojis = {
  charisma: '✨',
  dexterity: '🏃',
  intelligence: '🧠',
  strength: '💪',
  wisdom: '🔮',
}

export function CharacterCreation() {
  const { characterInfo, resetCharacterInfo, updateCharacterInfo } =
    useCharacterInfo()
  const { characterStats, resetCharacterStats, zeroCharacterStats } =
    useCharacterStats()
  const { updateGame } = useGame()
  const [activeTab, setActiveTab] = useState('basic-info')

  return (
    <div className='flex flex-1 items-center justify-center p-4'>
      <Card className='mx-auto w-full max-w-md'>
        <CardHeader className='text-center'>
          <CardTitle className='text-3xl'>LifeSim</CardTitle>
          <CardDescription>Create your character</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue='basic-info'
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='basic-info'>Basic Info</TabsTrigger>
              <TabsTrigger value='stat-points'>Stat Points</TabsTrigger>
            </TabsList>

            <TabsContent className='mt-4 space-y-4' value='basic-info'>
              <div className='relative flex items-center justify-center'>
                <RandomAvatar seed={characterInfo.avatar} size={15} />
              </div>
              <div className='grid w-full items-center gap-4'>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='name'>Name</Label>
                  <Input
                    autoComplete='off'
                    id='name'
                    placeholder=''
                    type='text'
                    value={characterInfo.name}
                    onChange={(e) => {
                      updateCharacterInfo('name', e.target.value)
                    }}
                  />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='birthday'>Birthday</Label>
                  <DatePicker
                    id='birthday'
                    selected={characterInfo.birthday}
                    calendarProps={{
                      formatters: {
                        formatCaption: (date) => format(date, 'MMMM'),
                      },
                    }}
                    onSelect={(date) => {
                      updateCharacterInfo('birthday', date)
                    }}
                  />
                </div>
              </div>
              <div className='flex'>
                <Button
                  className='flex flex-1'
                  variant='secondary'
                  onClick={() => {
                    resetCharacterInfo()
                  }}
                >
                  🎲 Reroll Info
                </Button>
              </div>
            </TabsContent>

            <TabsContent className='mt-4 space-y-4' value='stat-points'>
              <div className='grid grid-cols-2 gap-1'>
                {(
                  Object.entries(characterStats) as Entries<
                    typeof characterStats
                  >
                ).map(([stat, point]) => (
                  <div
                    key={stat}
                    className='bg-muted flex flex-1 flex-col gap-2 rounded-lg p-3 text-sm'
                  >
                    <div className='flex flex-1 flex-row items-center justify-between'>
                      <div className='flex'>
                        {statEmojis[stat]} {capitalize(stat)}
                      </div>
                      <div className='flex font-bold'>{point}</div>
                    </div>
                    <Progress max={5} value={point} />
                  </div>
                ))}
                <div className='bg-muted flex flex-1 flex-col gap-2 rounded-lg p-3 text-sm'>
                  <div className='flex flex-1 flex-row items-center justify-between'>
                    <div className='flex'>🟰 Total</div>
                    <div className='flex font-bold'>
                      {Object.values(characterStats).reduce(
                        (acc, curr) => acc + curr,
                        0
                      )}
                    </div>
                  </div>
                  <Progress
                    max={25}
                    value={Object.values(characterStats).reduce(
                      (acc, curr) => acc + curr,
                      0
                    )}
                  />
                </div>
              </div>
              <div className='text-muted-foreground text-center text-sm'>
                You start a life with between{' '}
                <span className='text-foreground font-medium'>0</span> and{' '}
                <span className='text-foreground font-medium'>25</span> stat
                points.
              </div>
              <div className='flex flex-col gap-2'>
                <AlertDialog>
                  <AlertDialogTrigger asChild={true}>
                    <Button className='flex flex-1' variant='destructive'>
                      💀 Hard Mode
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. Continuing will set your
                        stats to 0.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          zeroCharacterStats()
                        }}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button
                  className='flex flex-1'
                  variant='secondary'
                  onClick={() => {
                    resetCharacterStats()
                  }}
                >
                  🎲 Reroll Stat Points
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className='flex gap-4'>
          <Button
            className='flex flex-1'
            onClick={() => {
              updateGame('started', true)
            }}
          >
            Start Life
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
