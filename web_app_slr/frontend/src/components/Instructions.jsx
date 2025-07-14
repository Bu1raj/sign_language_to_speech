import React from 'react'
import { IoIosInformationCircle } from "react-icons/io";
export default function Instructions() {
  return (
    <div className='w-[600px] bg-darkBackground text-lg border border-primary p-4 rounded-lg flex gap-4 text-slate-300 items-start'>
        <IoIosInformationCircle className='text-4xl'/>
        <div>
            <p>Perform a series of different signs and then click on 'Convert' to get the interpreted sentence</p>
        </div>
    </div>
  )
}
