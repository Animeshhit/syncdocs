'use client'

import { ReactNode } from 'react'
import { Authenticated, AuthLoading, ConvexReactClient, Unauthenticated } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { SignIn, useAuth } from '@clerk/react'
import FullScreenLoading from './FullScreenLoading'

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file')
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL)

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>
      {children}
      </Authenticated>
      <Unauthenticated>
        <div className='h-screen flex items-center justify-center'>
        <SignIn/>
        </div>
      </Unauthenticated>
      <AuthLoading>
        <FullScreenLoading/>
      </AuthLoading>
    </ConvexProviderWithClerk>
  )
}