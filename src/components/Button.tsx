import React, { FormEvent } from "react";
import styled from "styled-components";

type Props = {
  onClick: (e: FormEvent<HTMLButtonElement>) => void
  text: string
}

export const Button = (props: Props) => {
  const { onClick, text } = props
  return (
    <StyledButton onClick={onClick} type="button" className="nes-btn">{text}</StyledButton>
  )
 }

const StyledButton = styled.button`
margin: 10px;
`
