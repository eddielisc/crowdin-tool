import 'nes.css/css/nes.min.css';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components'
import otaClient, { LanguageStrings, LanguageTranslations } from '@crowdin/ota-client';
import { Input } from './components/Input';
import { Button } from './components/Button';
import { InputType } from './types/InputType';

function App() {
  const [hash, setHash] = useState<string>("")

  const [inputType, setInputType] = useState<InputType>("normal")


  const onSubmit = useCallback(async () => {
    try {
      setInputType("wait")
      if (!hash) {
        setInputType("error")
        return
      }
      const client = new otaClient(hash);
      const languages = await client.listLanguages()
      setInputType("success")
    } catch (ex) {
      setInputType("error")
    }
  }, [setInputType, hash])


  return (
    <Main className="App">
      <div className="nes-container with-title">
        <p className="title">Crowdin Tool</p>
        <p>A tool can preview crowdin content (TBD)</p>
        <Input inputType={inputType} onChange={(e) => {
          setHash(e.target.value)
        }} placeholder={"Please input the crowdin hash here"} />

        <Button onClick={() => onSubmit()} text="Start" />

      </div>
    </Main>
  );
}


const Main = styled.div`
  margin: 10px
`
export default App;
