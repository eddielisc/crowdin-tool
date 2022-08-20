import { LanguageTranslations } from '@crowdin/ota-client'
import React from 'react'
import flatten from 'flat'
import styled from 'styled-components'

type Props = {
  translations: LanguageTranslations[]
}

const Box = styled.div`
  margin: 10px;
`

export const TranslationList = (props: Props) => {
  const { translations } = props
  const items = translations
    .map((translation) => {
      return Object.entries(flatten(translation.content)).map(
        ([key, value]) => ({ key, value: String(value) })
      )
    })
    .flat()
  return (
    <>
      {items.map((item) => (
        <Box className="nes-container with-title">
          <p className="title">{item.key}</p>
          <p>{item.value}</p>
        </Box>
      ))}
    </>
  )
}
