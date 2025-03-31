'use client'

import { format } from 'date-fns'
import {
  CopyIcon,
  DownloadIcon,
  LucideSettings as LucideSettingsIcon,
  MonitorIcon,
  MoonIcon,
  SunIcon,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { RandomAvatar } from 'react-random-avatar'
import { toast } from 'sonner'
import type { Entries } from 'type-fest'

import { useCharacterInfo } from '~/hooks/use-character-info'
import { useCharacterStats } from '~/hooks/use-character-stats'
import { useCharacterStatus } from '~/hooks/use-character-status'
import { useGame } from '~/hooks/use-game'
import { cn, formatCurrency } from '~/lib/utils'
import type { CharacterStats } from '~/schemas/character-stats'

import { AlertModal } from './alert-modal'
import { Modal } from './modal'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Textarea } from './ui/textarea'

export function Dashboard() {
  const { characterInfo } = useCharacterInfo()
  const { characterStats } = useCharacterStats()
  const { characterStatus } = useCharacterStatus()
  const { updateGame, exportGameSave, importGameSave } = useGame()
  const { theme, setTheme } = useTheme()
  const [activeDashboardTab, setActiveDashboardTab] = useState('1')
  const [activeGameSaveTab, setActiveGameSaveTab] = useState('export')
  const [isGameSaveModalOpen, setIsGameSaveModalOpen] = useState(false)
  const [importGameSaveCode, setImportGameSaveCode] = useState('')

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

          <DropdownMenu>
            <DropdownMenuTrigger asChild={true}>
              <Button size='icon' variant='ghost'>
                <LucideSettingsIcon aria-hidden='true' className='size-6' />{' '}
                <span className='sr-only'>Settings</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup
                      value={theme}
                      onValueChange={setTheme}
                    >
                      <DropdownMenuRadioItem
                        value='system'
                        onSelect={(e) => {
                          e.preventDefault()
                        }}
                      >
                        <MonitorIcon aria-hidden='true' className='size-4' />{' '}
                        System
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem
                        value='light'
                        onSelect={(e) => {
                          e.preventDefault()
                        }}
                      >
                        <SunIcon aria-hidden='true' className='size-4' /> Light
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem
                        value='dark'
                        onSelect={(e) => {
                          e.preventDefault()
                        }}
                      >
                        <MoonIcon aria-hidden='true' className='size-4' /> Dark
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault()
                  setIsGameSaveModalOpen(true)
                }}
              >
                Game Save
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertModal
                description='This action cannot be undone. Continuing will end this current life so you can start a new one.'
                trigger={
                  <DropdownMenuItem
                    variant='destructive'
                    onSelect={(e) => {
                      e.preventDefault()
                    }}
                  >
                    Reset Life
                  </DropdownMenuItem>
                }
                onConfirm={() => {
                  updateGame('started', false)
                }}
              />
            </DropdownMenuContent>
          </DropdownMenu>
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
        <Tabs
          defaultValue='1'
          value={activeDashboardTab}
          onValueChange={setActiveDashboardTab}
        >
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
        open={isGameSaveModalOpen}
        setOpen={setIsGameSaveModalOpen}
        title='Game Save'
        content={
          <div className='flex w-full flex-col'>
            <Tabs
              defaultValue='export'
              value={activeGameSaveTab}
              onValueChange={setActiveGameSaveTab}
            >
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='export'>Export</TabsTrigger>
                <TabsTrigger value='import'>Import</TabsTrigger>
              </TabsList>
              <TabsContent value='export'>
                <div className='flex flex-col gap-2'>
                  <Textarea
                    className='min-h-32 break-all'
                    defaultValue={exportGameSave()}
                    readOnly={true}
                    onClick={(e) => {
                      e.currentTarget.select()
                    }}
                  />
                  <Button
                    onClick={() => {
                      void navigator.clipboard.writeText(exportGameSave())
                      toast.success('Game save code copied to clipboard.')
                    }}
                  >
                    <CopyIcon aria-hidden='true' className='size-4' /> Copy to
                    Clipboard
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value='import'>
                <div className='flex flex-col gap-2'>
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
              </TabsContent>
            </Tabs>
          </div>
        }
      />
    </div>
  )
}
