import React from 'react'
import TextBox from './TextBox'
import { useULC } from '../contexts/UniqueLabelsContext'
import WaveLoader from './WaveLoader';

function Error(){
  return <div className='text-2xl text-slate-500'>Oops!, no signs were detected</div>;
}

export default function InterpretedSentence() {
  const {uniqueLabels, sentences, loadingSentence} = useULC();
  const englishText = sentences["English"];
  return (
    <div className='flex flex-col gap-4'>
        <h1 className='text-3xl text-slate-300'>Interpreted sentence</h1>
        {loadingSentence ? <WaveLoader /> : uniqueLabels.length === 0 ? <Error /> : <TextBox text={englishText}/>}
    </div>
  )
}
