'use client'

import { useEffect } from 'react'
import { RandomAvatar } from 'react-random-avatar'
import { useIsMounted, useLocalStorage } from 'usehooks-ts'

import { useCharacterStats } from '~/lib/utils'
import { randomFloat, randomInt, randomName } from '~/lib/utils'

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
  const { name, setName, height, setHeight, weight, setWeight } =
    useCharacterStats()
  const [avatarSeed, setAvatarSeed] = useLocalStorage('avatar-seed', '')
  const isMounted = useIsMounted()()

  /* Fix hydration issue caused by RandomAvatar */
  useEffect(() => {
    setName(randomName())
    setAvatarSeed(randomInt(1, 100_000).toString())
    setHeight(randomFloat(45, 60)) // cm
    setWeight(randomFloat(2.5, 4)) // kg
  }, [setName, setAvatarSeed, setHeight, setWeight])

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
          <RandomAvatar seed={avatarSeed} size={15} />
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
                  setName(e.target.value)
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
            setName(randomName())
            setAvatarSeed(randomInt(1, 100_000).toString())
            setHeight(randomFloat(45, 60)) // cm
            setWeight(randomFloat(2.5, 4)) // kg
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
