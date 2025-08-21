import { AnimatePresence, motion } from 'motion/react'
import { useFloating, offset, flip, shift, useHover, useInteractions, arrow, type Placement } from '@floating-ui/react'
import React, { useRef, useState } from 'react'

interface Props {
  initialOpen?: boolean
  children: React.ReactNode
  renderPopover: React.ReactNode
  placement?: Placement
  className?: string
}

export default function Popover({
  placement = 'bottom',
  initialOpen = false,
  children,
  renderPopover,
  className
}: Props) {
  const arrowRef = useRef(null)
  const [open, setOpen] = useState(initialOpen)

  const { x, y, strategy, refs, context, middlewareData } = useFloating({
    placement: placement,
    middleware: [offset(5), flip(), shift(), arrow({ element: arrowRef })],
    open,
    onOpenChange: setOpen
  })

  // For delay when hover to popcover
  const hover = useHover(context, {
    delay: { open: 50, close: 50 }, // delay in ms
    restMs: 50 // optional small delay to prevent flicker
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([hover])
  return (
    <div className={className} ref={refs.setReference} {...getReferenceProps()} onClick={() => setOpen(!open)}>
      {children}
      {/* Tooltip */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={refs.setFloating}
            {...getFloatingProps()}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              transformOrigin: `${middlewareData.arrow?.x}px top`,
              zIndex: 1000
            }}
            initial={{ opacity: 0, transform: 'scale(0)' }}
            animate={{ opacity: 1, transform: 'scale(1)' }}
            exit={{ opacity: 0, transform: 'scale(0)' }}
            transition={{ duration: 0.2 }}
          >
            <span
              ref={arrowRef}
              className='border-x-transparent border-t-transparent border-b-white border-[11px] absolute -translate-y-[90%]'
              style={{
                left: middlewareData.arrow?.x,
                right: middlewareData.arrow?.y
              }}
            />
            {renderPopover}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
