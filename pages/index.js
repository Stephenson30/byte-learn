import Head from 'next/head'
import  Header  from '@/component/Header'
import  Footer  from '@/component/Footer'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function ByteLearn() {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false) 

  const onUserChangedText = (e) => { 
    setUserInput(e.target.value)
  }

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    const response = await fetch('/api/fetcher', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log(output)
    setApiOutput(output.text)
    setIsGenerating(false);
  } 

  return (
    <>
      <Head>
        <title>Byte-Learn</title>
        <meta name="description" content="Built for Medical Student" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='main-cont'>
        <Header />
        <div className="header-title">
          <h1>Easily Learn Your Medical Courses</h1>
        </div>
        <div className='prompt-cont'>
          <div className='input-cont'> 
            <textarea 
              placeholder='Type in your questions for clarity'
              onChange={onUserChangedText} 
              value={userInput}
              className='input'
              />
            {
              !isGenerating?  <button onClick={callGenerateEndpoint}>send</button> 
              : <h2 className='Trend'>
                  <span id='one'>.</span>
                  <span id='two'>.</span>
                  <span id='three'>.</span>
                </h2>
            }
          </div>

          <div className='output-cont'>
            <p>Answer: </p>
            <p>{apiOutput}</p>
          </div>
        </div>

        <div className='contact-cont'>
          <div className="badge-container grow">
                  <a
                  href="https://twitter.com/Melprotocol?t=gqcIKIdp6iGojKrShFCH5A&s=09"
                  target="_blank"
                  rel="noreferrer"
                  >
                  <div className="badge">
                      <p>built by Stephen</p>
                  </div>
                  </a>
          </div>
          <div className='support'>
              <a href='https://www.buymeacoffee.com/stephenokwK'> 
                <p>Support_Us</p>
              </a>
            </div>
        </div> 
        <Footer />
      </div>
    </>
  )
}
