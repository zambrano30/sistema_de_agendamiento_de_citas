import { Route, Routes } from "react-router"

function App() {
 

  return (
    <>
     <Routes>
      <Route path="/" element={<h1>Login</h1>}/>
      <Route path="/main" element={<h1>Main</h1>}/>

     </Routes>
    </>
  )
}

export default App
