"use client";
import { ClerkProvider } from "@clerk/nextjs";

interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  return (
    <>
      <ClerkProvider>
        {children}
        
      </ClerkProvider>
    </>
  );
};
