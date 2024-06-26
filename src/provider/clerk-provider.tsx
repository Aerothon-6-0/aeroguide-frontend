import { ClerkProvider } from "@clerk/clerk-react"
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function ClerkReactProvider({ children }: { children: React.ReactNode }) {
    return <ClerkProvider publishableKey={PUBLISHABLE_KEY}>{children}</ClerkProvider>
}
export default ClerkReactProvider