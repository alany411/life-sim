'use client'

import { useEffect, useState } from 'react'
import { RandomAvatar } from 'react-random-avatar'
import type { Config } from 'unique-names-generator'
import { names, uniqueNamesGenerator } from 'unique-names-generator'

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

const customConfig: Config = {
  dictionaries: [names, names],
  separator: ' ',
  length: 2,
  style: 'capital',
}

export function CharacterCreation() {
  const [mounted, setMounted] = useState(false)
  const [name, setName] = useState('')
  const [seed, setSeed] = useState('')

  /* Fix hydration issue caused by RandomAvatar */
  useEffect(() => {
    setMounted(true)
    setName(uniqueNamesGenerator(customConfig))
    setSeed(Math.random().toString())
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Card className='mx-auto w-full max-w-md'>
      <CardHeader className='text-center'>
        <CardTitle className='text-3xl'>LifeSim</CardTitle>
        <CardDescription>Create your character</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='relative mb-4 flex items-center justify-center'>
          <RandomAvatar seed={seed} size={15} />
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
            setName(uniqueNamesGenerator(customConfig))
            setSeed(Math.random().toString())
          }}
        >
          🎲 Reroll
        </Button>
        <Button className='flex flex-1'>Start Life</Button>
      </CardFooter>
    </Card>
  )
}
