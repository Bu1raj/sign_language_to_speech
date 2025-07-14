import React from 'react'
import TextBox from './TextBox'
import WaveLoader from './WaveLoader'
import { useULC } from '../contexts/UniqueLabelsContext';

function Error(){
  return <div className='text-2xl text-slate-500'>Oops!, no signs were detected</div>;
}

export default function DetectedWords() {
  const {uniqueLabels, loadingUniqueLabels} = useULC();
  var text = '';
  var isEmpty = true;

  if(!loadingUniqueLabels){
    text = uniqueLabels.join(', ');
    isEmpty = uniqueLabels.length === 0;
  }
  
  return (
    <div className='flex flex-col gap-4 h-[300px]'>
        <h1 className='text-3xl text-slate-300'>Detected signs</h1>
        {loadingUniqueLabels ? <WaveLoader /> : isEmpty ? <Error /> : <TextBox text={text}/>}
    </div>
  )
}
