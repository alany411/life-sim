import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from './button'
import { Calendar } from './calendar'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

type DatePickerProps = {
  id?: string
  selected: Date
  onSelect: (date: Date) => void
}

function DatePicker({ id, selected, onSelect }: DatePickerProps) {
  const [date, setDate] = useState<Date>(selected)

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
          id={id}
          initialFocus={true}
          mode='single'
          selected={date}
          onSelect={(date) => {
            if (date) {
              setDate(date)
              onSelect(date)
            }
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
