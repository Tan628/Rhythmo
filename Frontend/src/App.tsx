import { Routes ,Route } from "react-router-dom"
import HomePage from "./Pages/Home/Homepage.tsx"
import AuthCallBackPage from "./Pages/auth-callback/AuthCallBackpage.tsx"

function App() {
     
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth-callback" element={<AuthCallBackPage />} />
    </Routes>
    </>
  )
}
 
export default App
