import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import MainLayout from "./components/MainLayout";
import { UserProvider } from "./context/userContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/body-measurement-tracker/" element={<Login />}></Route>
          <Route path="/body-measurement-tracker/home" element={<MainLayout />}></Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
