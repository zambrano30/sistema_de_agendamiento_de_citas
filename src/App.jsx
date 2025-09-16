import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import MainLayout from "./layouts/MainLayout";
import Main from "./pages/Main";
import RegisterCustomer from "./pages/RegisterCustomer";
import RegisterPet from "./pages/RegisterPet";
import RescheduleConsult from "./pages/RescheduleConsult";
import ScheduleConsult from "./pages/ScheduleConsult";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={
        <MainLayout>
          <Main />
        </MainLayout>
      } />
      <Route path="/register-customer" element={
        <MainLayout>
          <RegisterCustomer />
        </MainLayout>
      } />
      <Route path="/register-pet" element={
        <MainLayout>
          <RegisterPet />
        </MainLayout>
      } />
      <Route path="/schedule-consult" element={
        <MainLayout>
          <ScheduleConsult/>
        </MainLayout>
      } />
      <Route path="/reschedule-consult" element={
        <MainLayout>
          <RescheduleConsult />
        </MainLayout>
      } />
    </Routes>
  );
}

export default App;
