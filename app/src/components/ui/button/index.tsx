import { MouseEventHandler, ReactNode } from 'react'

import './index.css'

type Props = {
  children?: ReactNode
  type?: 'normal' | 'important'
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}

export default function Button({ children, type = 'normal', onClick }: Props) {
  return (
    <button className={`btn ${type}`} onClick={onClick}>
      {children}
    </button>
  )
}
