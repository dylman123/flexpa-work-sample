# Flexpa Work Sample
My goal is to implement: https://www.flexpa.com/docs/about/work-sample

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Prerequisites

In order to authenticate with the Flexpa test API server, you will need to first:
1. Register to the portal: https://portal.flexpa.com/
2. Retrieve a set of test API keys via the portal
3. Load your test API keys into a new file called `.env.local`:
```bash
NEXT_PUBLIC_PUBLISHABLE_KEY=<your-publishable-key>
SECRET_KEY=<your-secret-key>
```