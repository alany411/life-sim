'use client'

import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { RandomAvatar } from 'react-random-avatar'
import { useIsMounted } from 'usehooks-ts'

import { useCharacterStats } from '~/hooks/use-character-stats'
import { useGame } from '~/hooks/use-game'

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

export function CharacterCreation() {
  const { avatar, name, birthday, updateCharacterStats } = useCharacterStats()
  const { initialized, resetGame, updateGame } = useGame()
  const isMounted = useIsMounted()()
  const [activeTab, setActiveTab] = useState('basic-info')

  useEffect(() => {
    if (!initialized) {
      resetGame()
      updateGame('initialized', true)
    }
  }, [initialized, resetGame, updateGame])

  if (!isMounted) {
    return null
  }

  const startLife = () => {
    window.alert(
      `Congratulations! You were born on ${format(birthday, 'MMMM d')}. Your parents have named you ${name}.`
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
            <TabsTrigger value='stats'>Stats</TabsTrigger>
          </TabsList>

          <TabsContent className='mt-4 space-y-4' value='basic-info'>
            <div className='relative flex items-center justify-center'>
              <RandomAvatar seed={avatar} size={15} />
            </div>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='name'>Name</Label>
                <Input
                  id='name'
                  placeholder=''
                  type='text'
                  value={name}
                  onChange={(e) => {
                    updateCharacterStats('name', e.target.value)
                  }}
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='birthday'>Birthday</Label>
                <DatePicker
                  id='birthday'
                  selected={birthday}
                  calendarProps={{
                    formatters: {
                      formatCaption: (date) => format(date, 'MMMM'),
                    },
                  }}
                  onSelect={(date) => {
                    updateCharacterStats('birthday', date)
                  }}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent className='mt-4 space-y-4' value='stats'>
            <div>Hi</div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className='flex gap-4'>
        <Button
          className='flex flex-1'
          variant='secondary'
          onClick={() => {
            resetGame()
          }}
        >
          🎲 Reroll
        </Button>
        <Button className='flex flex-1' onClick={startLife}>
          Start Life
        </Button>
      </CardFooter>
    </Card>
  )
}
