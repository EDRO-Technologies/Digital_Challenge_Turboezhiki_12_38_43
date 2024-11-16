import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Wrapper from "./components/wrapper";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AuthProvider from "./utils/AuthProvider";
import NextForm from "./pages/NextForm";
import PrivateRoute from "./utils/PrivateRoute";
import Event from "./pages/Event";
function App() {
  const [count, setCount] = useState(0);
  const location = useLocation();
  return (
    <Routes key={location.pathname} location={location}>
      <Route path="/" element={<Wrapper />}>
        <Route element={<AuthProvider />}>
          <Route path={"next"} element={<NextForm />} />
          <Route path={"signup"} element={<Signup />} />
          <Route path={"signin"} element={<Signin />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path={"home"} element={<Home />} />
          <Route path={"event"} element={<Event />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
