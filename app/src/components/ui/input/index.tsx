import { ChangeEvent, HTMLInputTypeAttribute } from 'react'

import './index.css'

type Props = {
  type: HTMLInputTypeAttribute
  label: string
  placeholder: string
  value: any
  setFunc: (val: any) => void
  className?: string
  required?: boolean
}

export default function Input({
  type,
  label,
  placeholder,
  value,
  setFunc,
  className,
  required
}: Props) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFunc(e.target.value)
  }

  return (
    <div className="ui-get-values">
      <label>{label}</label>

      <input
        className={`ui-input ${className}`}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        required={required}
      />
    </div>
  )
}
