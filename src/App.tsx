import './App.css'
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"

function App() {
  /**
   * TODO: Implement the following:
   * - Create routing (use react-router-dom)
   * - Create pages folder and add the pages there
   * - Use Components folder to add reusable components
   */

  return (
    <main>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </main>
  )
}

export default App
