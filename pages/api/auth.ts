// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.status(400).json({ data: 'Invalid request method' })
  }
  const publicToken: string = req.body.publicToken

  // Make API request to Flexpa endpoint
  await fetch('https://api.flexpa.com/link/exchange', {
    method: 'POST',
    body: JSON.stringify({ 
      'public_token': publicToken,
      'secret_key': process.env.SECRET_KEY,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((r: Response) => {
    res.status(r.status)
    if (r.status !== 200) {  // Error from Flexpa API
      res.json({ data: r.statusText })
    } else {  // Success from Flexpa API
      return r.json()
    }
  })
  .then(d => {
    res.json({ data: d })  // Success parsing JSON
  })
  .catch(e => res.json({ data: e }))  // Error parsing JSON
}
