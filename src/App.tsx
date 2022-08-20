import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import OtaClient, { LanguageTranslations } from '@crowdin/ota-client'
import { Input } from './components/Input'
import { Button } from './components/Button'
import { InputType } from './types/InputType'
import { Select } from './components/Select'
import { TranslationList } from './components/TranslationList'

const Main = styled.div`
  margin: 10px;
`

const Box = styled.div`
  margin: 10px;
`

function App() {
  const [hash, setHash] = useState<string>('')

  const [inputType, setInputType] = useState<InputType>('normal')
  const [selectType, setSelectType] = useState<InputType>('normal')

  const [langs, setLangs] = useState<string[]>([])
  const [lang, setLang] = useState<string>('')
  const [translations, setTranslations] = useState<LanguageTranslations[]>([])
  const clearState = useCallback(() => {
    setLangs([])
    setLang('')
    setTranslations([])
  }, [])
  const onSubmit = useCallback(async () => {
    try {
      clearState()
      setInputType('wait')
      if (!hash) {
        setInputType('error')
        return
      }
      const client = new OtaClient(hash)
      setLangs(await client.listLanguages())
      setInputType('success')
    } catch (ex) {
      setInputType('error')
    }
  }, [clearState, hash])

  const getTrans = useCallback(
    async (language: string) => {
      try {
        setTranslations([])
        setSelectType('wait')
        if (!language) {
          setSelectType('normal')
          return
        }
        const client = new OtaClient(hash)
        setTranslations(await client.getLanguageTranslations(language))
        setSelectType('success')
      } catch (ex) {
        setSelectType('error')
      }
    },
    [hash]
  )

  useEffect(() => {
    getTrans(lang)
  }, [getTrans, lang])

  return (
    <Main className="App">
      <Box className="nes-container with-title">
        <p className="title">Crowdin Tool</p>
        <p>A tool can preview crowdin content</p>
        <Input
          inputType={inputType}
          onChange={(e) => {
            setHash(e.target.value)
          }}
          placeholder="Please input the crowdin hash here"
        />

        <Button onClick={() => onSubmit()} text="Start" />
      </Box>
      {inputType === 'success' && (
        <Box className="nes-container with-title">
          <p className="title">Select Language</p>
          <Select
            options={langs.map((i) => ({ key: i, value: i }))}
            text="Select ..."
            onChange={(e) => {
              setLang(e.target.value)
            }}
            selectType={selectType}
          />
        </Box>
      )}
      {selectType === 'success' && (
        <Box className="nes-container with-title">
          <p className="title">Translations</p>
          <TranslationList translations={translations} />
        </Box>
      )}
    </Main>
  )
}

export default App
