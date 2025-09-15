import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import MainLayout from "./layouts/MainLayout";
import Main from "./pages/Main"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={
        <MainLayout>
          <Main />
        </MainLayout>
      } />
    </Routes>
  );
}

export default App;
