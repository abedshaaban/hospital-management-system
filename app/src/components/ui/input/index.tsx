import { ChangeEvent, HTMLInputTypeAttribute } from 'react'

import './index.css'

type Props = {
  type: HTMLInputTypeAttribute
  placeholder: string
  className?: string
  value: any
  setFunc: (val: any) => void
}

export default function Input({ type, placeholder, value, setFunc, className }: Props) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFunc(e.target.value)
  }

  return (
    <input
      className={`ui-input ${className}`}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
    />
  )
}
