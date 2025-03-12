'use client'

import { useEffect } from 'react'
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
import { Input } from './ui/input'
import { Label } from './ui/label'

export function CharacterCreation() {
  const { avatar, name, height, weight, updateCharacterStats } =
    useCharacterStats()
  const { initialized, resetGame, updateGame } = useGame()
  const isMounted = useIsMounted()()

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
      `Congratulations! You were just born. Your parents have named you ${name} and you are ${height.toString()}cm tall and weight ${weight.toString()}kg.`
    )
  }

  return (
    <Card className='mx-auto w-full max-w-md'>
      <CardHeader className='text-center'>
        <CardTitle className='text-3xl'>LifeSim</CardTitle>
        <CardDescription>Create your character</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='relative mb-4 flex items-center justify-center'>
          <RandomAvatar seed={avatar} size={15} />
        </div>
        <form>
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
          </div>
        </form>
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
