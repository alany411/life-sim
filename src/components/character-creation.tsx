'use client'

import { format } from 'date-fns'
import { DicesIcon, DownloadIcon, SkullIcon } from 'lucide-react'
import { useState } from 'react'
import { RandomAvatar } from 'react-random-avatar'
import type { Entries } from 'type-fest'

import { useCharacterInfo } from '~/hooks/use-character-info'
import { useCharacterStats } from '~/hooks/use-character-stats'
import { useGame } from '~/hooks/use-game'
import { capitalize } from '~/lib/utils'
import type { CharacterStats } from '~/schemas/character-stats'

import { AlertModal } from './alert-modal'
import { Modal } from './modal'
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
import { Textarea } from './ui/textarea'

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
  const { updateGame, importGameSave } = useGame()
  const [activeTab, setActiveTab] = useState('basic-info')
  const [isImportSaveModalOpen, setIsImportSaveModalOpen] = useState(false)
  const [importGameSaveCode, setImportGameSaveCode] = useState('')
  const characterStatsEntries = Object.entries(
    characterStats
  ) as Entries<CharacterStats>

  const characterStatsTotal = Object.values(characterStats).reduce(
    (acc, curr) => acc + curr,
    0
  )

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
                  <DicesIcon aria-hidden='true' className='size-4' /> Reroll
                  Info
                </Button>
              </div>
            </TabsContent>

            <TabsContent className='mt-4 space-y-4' value='stat-points'>
              <div className='grid grid-cols-2 gap-1'>
                {characterStatsEntries.map(([stat, point]) => (
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
                    <Progress max={5} title={`${stat} points`} value={point} />
                  </div>
                ))}
                <div className='bg-muted flex flex-1 flex-col gap-2 rounded-lg p-3 text-sm invert'>
                  <div className='flex flex-1 flex-row items-center justify-between'>
                    <div className='flex'>
                      <span className='invert'>🟰</span> Total
                    </div>
                    <div className='flex font-bold'>{characterStatsTotal}</div>
                  </div>
                  <Progress
                    max={25}
                    title='Total points'
                    value={characterStatsTotal}
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
                <Button
                  className='flex flex-1'
                  variant='secondary'
                  onClick={() => {
                    resetCharacterStats()
                  }}
                >
                  <DicesIcon aria-hidden='true' className='size-4' /> Reroll
                  Stat Points
                </Button>

                <AlertModal
                  description='This action cannot be undone. Continuing will set your stats to 0.'
                  trigger={
                    <Button className='flex flex-1' variant='destructive'>
                      <SkullIcon aria-hidden='true' className='size-4' /> Hard
                      Mode
                    </Button>
                  }
                  onConfirm={() => {
                    zeroCharacterStats()
                  }}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className='flex w-full flex-col gap-2'>
          <Button
            className='flex w-full flex-1'
            variant='secondary'
            onClick={() => {
              setIsImportSaveModalOpen(true)
            }}
          >
            <DownloadIcon aria-hidden='true' className='size-4' /> Import Save
          </Button>
          <Button
            className='flex w-full flex-1'
            onClick={() => {
              updateGame('started', true)
            }}
          >
            Start Life
          </Button>
        </CardFooter>
      </Card>

      <Modal
        open={isImportSaveModalOpen}
        setOpen={setIsImportSaveModalOpen}
        title='Game Save Import'
        content={
          <div className='flex w-full flex-col gap-2'>
            <Textarea
              className='min-h-32 break-all'
              defaultValue={importGameSaveCode}
              onChange={(e) => {
                setImportGameSaveCode(e.currentTarget.value)
              }}
            />
            <Button
              onClick={() => {
                importGameSave(importGameSaveCode)
              }}
            >
              <DownloadIcon aria-hidden='true' className='size-4' />
              Import Save
            </Button>
          </div>
        }
      />
    </div>
  )
}
