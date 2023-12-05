import { MouseEventHandler, ReactNode } from 'react'

import './index.css'

type Props = {
  children?: ReactNode
  type?: 'normal' | 'important'
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  className?: string
}

export default function Button({ children, type = 'normal', onClick, className }: Props) {
  return (
    <button className={`btn ${type} ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}
