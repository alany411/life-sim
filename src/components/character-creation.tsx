'use client'

import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { RandomAvatar } from 'react-random-avatar'
import type { Entries } from 'type-fest'
import { useIsMounted } from 'usehooks-ts'

import { useCharacterInfo } from '~/hooks/use-character-info'
import { useCharacterStats } from '~/hooks/use-character-stats'
import { useGame } from '~/hooks/use-game'
import { capitalize } from '~/lib/utils'

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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const statEmojis = {
  agility: '🏃',
  charisma: '✨',
  intelligence: '🧠',
  strength: '💪',
  wisdom: '🔮',
}

export function CharacterCreation() {
  const { characterInfo, resetCharacterInfo, updateCharacterInfo } =
    useCharacterInfo()
  const { characterStats, resetCharacterStats } = useCharacterStats()
  const { game, resetGame, updateGame } = useGame()
  const isMounted = useIsMounted()()
  const [activeTab, setActiveTab] = useState('basic-info')

  useEffect(() => {
    if (!game.initialized) {
      resetGame()
      updateGame('initialized', true)
    }
  }, [game.initialized, resetGame, updateGame])

  if (!isMounted) {
    return null
  }

  const startLife = () => {
    window.alert(
      `Congratulations! You were born on ${format(characterInfo.birthday, 'MMMM d')}. Your parents have named you ${characterInfo.name}.`
    )
  }

  return (
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
            <Table>
              <TableCaption>
                You start a life with between{' '}
                <span className='text-foreground font-medium'>0</span> and{' '}
                <span className='text-foreground font-medium'>15</span> stat
                points.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Stat</TableHead>
                  <TableHead className='text-right'>Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(
                  Object.entries(characterStats) as Entries<
                    typeof characterStats
                  >
                ).map(([stat, value]) => (
                  <TableRow key={stat}>
                    <TableCell>
                      {statEmojis[stat]} {capitalize(stat)}
                    </TableCell>
                    <TableCell className='text-right'>{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={1}>Total</TableCell>
                  <TableCell className='text-right'>
                    {Object.values(characterStats).reduce(
                      (acc, value) => acc + value,
                      0
                    )}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <div className='flex'>
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
        <Button className='flex flex-1' onClick={startLife}>
          Start Life
        </Button>
      </CardFooter>
    </Card>
  )
}
