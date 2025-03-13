'use client'

import type { ReactNode } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'

type ModalProps = {
  title: string
  description?: string
  content: ReactNode
  footer?: string
  open: boolean
  setOpen: (open: boolean) => void
}

export function Modal({
  title,
  description,
  content,
  footer,
  open,
  setOpen,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className='flex py-4'>{content}</div>
        {footer && (
          <DialogFooter className='sm:justify-start'>
            <div className='text-muted-foreground text-xs'>{footer}</div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
