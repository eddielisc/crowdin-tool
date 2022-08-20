import React from "react";
import { InputType } from "../types/InputType";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  inputType: InputType
}

export const Input = (props: Props) => {
  const { onChange, placeholder, inputType } = props;
  const className= {
    success: "nes-input is-success",
    error: "nes-input is-error",
    wait: "nes-input is-warning",
    normal: 'nes-input'
  }[inputType]
  return (
    <input
        onChange={onChange}
        type="text"
        className={className || 'nes-input'}
        placeholder={placeholder}
    />

  )
 }
