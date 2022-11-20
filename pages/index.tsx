import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import FlexpaLink from '@flexpa/link'
import { JsonViewer } from '@textea/json-viewer'
import { ocean } from '../styles/jsonViewer'
import { useEffect, useState } from 'react'

export default function Home() {

  const [accessToken, setAccessToken] = useState("")
  const [patientId, setPatientId] = useState("")
  const [patientData, setPatientData] = useState({})

  useEffect(() => {
    // Run on client-side only
    FlexpaLink.create({
      // Replace with your publishable key
      publishableKey: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY ?? '',
      onSuccess: (publicToken) => {
        // Send `publicToken` to your backend to exchange it for a patient `access_token`
        // https://www.flexpa.com/docs/sdk/login#exchange
        getAccessToken(publicToken)
          .then(at => {
            at && setAccessToken(at)
            return at && getPatientId(at)
          })
          .then(id => {
            id && setPatientId(id)
          })
      }
    })
  }, [accessToken, setAccessToken, patientId, setPatientId])

  const getAccessToken = async (pt: string): Promise<string | undefined> => {
    // Fixme: sometimes returns a 404 error on /api/link/exchange
    const response = await fetch('/api/link/exchange', {
      method: 'POST',
      body: JSON.stringify({ publicToken: pt }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    return data.data.access_token
  }

  const getPatientId = async (at: string): Promise<string | undefined> => {
    const response = await fetch('/api/link/introspect', {
      method: 'POST',
      body: JSON.stringify({ accessToken: at }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    const regex = new RegExp('([^\/]+$)')
    const patientId = data.data.sub && data.data.sub.match(regex)[0]
    return patientId
  }

  const getExplanationOfBenefit = async (id: string): Promise<object | undefined> => {
    const response = await fetch('/api/fhir/ExplanationOfBenefit', {
      method: 'POST',
      body: JSON.stringify({
        patientId: id,
      }),
      headers: {
        'Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    return data.data
  }

  const handleGetData = () => {
    setPatientData({})
    getExplanationOfBenefit(patientId)
      .then(d => d && setPatientData(d))
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.column}>
          <div>
            { patientId ? (
              <button onClick={handleGetData}>Download your data</button>
            ) : (
              <button onClick={() => FlexpaLink.open()}>Link your health data</button>
            ) }
          </div>
          <div>
            { Object.keys(patientData).length !== 0 ? (
              <JsonViewer value={patientData} theme={ocean}/>
            ) : (
              null
            )}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
