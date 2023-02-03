import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { Excalidraw } from "@excalidraw/excalidraw"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"


const inter = Inter({ subsets: ['latin'] })
const Drawboard = dynamic(()=>import("../components/drawboard"),{ssr:false})


export default function Home() {

  const [userInput, setUserInput] = useState('')
  const [apiOutput, setApiOutput] = useState('')

  const callGenerateEndpoint = async () => {

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
  
    const data = await response.json();
    const { output } = data;
  
    setApiOutput(`${output.text}`);
  }
  
    const onUserChangedText = (e) => {
      setUserInput(e.target?.value);
    };

  
  

  return (
    <>
      <Head>
        <title>Welcome To Algo_Lego</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head> 

      <div>
          <Drawboard text={apiOutput}/>    
      </div>
      
      <div>
      <div>
        <textarea
          placeholder="start typing here"
          value={userInput}
          onChange={onUserChangedText}
        />
        </div>

        <div className='bg-black items-center'>
        <h1 className='text-red-600 border-black'>Testing for Tailwind</h1>
        <button
        onClick={callGenerateEndpoint}>
          Make API Call
        </button>
        </div>
        <div >
        {apiOutput && (
      <div>
        <div>
        </div>
        <div>
        <h3 contentEditable="true">
          {apiOutput}
        </h3>
        </div>
      </div>
      )}    </div>
      </div> 
    </>
  );
}
