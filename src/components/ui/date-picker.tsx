import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import type { ComponentProps } from 'react'

import { Button } from './button'
import { Calendar } from './calendar'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

type DatePickerProps = {
  id?: string
  selected: Date
  onSelect: (date: Date) => void
  calendarProps?: Omit<
    ComponentProps<typeof Calendar>,
    | 'autoFocus'
    | 'defaultMonth'
    | 'id'
    | 'mode'
    | 'selected'
    | 'showYearSwitcher'
    | 'onSelect'
  >
}

function DatePicker({
  id,
  selected,
  onSelect,
  calendarProps,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild={true}>
        <Button
          className='text-muted-foreground justify-start text-left font-normal'
          variant={'outline'}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {format(selected, 'MMMM d')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          autoFocus={true}
          defaultMonth={selected}
          id={id}
          mode='single'
          selected={selected}
          showYearSwitcher={false}
          onSelect={(date) => {
            if (date) {
              onSelect(date)
            }
          }}
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
