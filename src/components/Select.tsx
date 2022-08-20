import React from 'react'
import { InputType } from '../types/InputType'

type Props = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: { key: string; value: string }[]
  selectType: InputType
  text: string
}

export const Select = (props: Props) => {
  const { onChange, options, text, selectType } = props
  const className = {
    success: 'nes-select is-success',
    error: 'nes-select is-error',
    wait: 'nes-select is-warning',
    normal: 'nes-select',
  }[selectType]

  return (
    <div className={className}>
      <select required id="default_select" defaultValue="" onChange={onChange}>
        <option value="" disabled hidden>
          {text}
        </option>
        {options.map(({ key, value }) => (
          <option key={key} value={value}>
            {key}
          </option>
        ))}
      </select>
    </div>
  )
}
