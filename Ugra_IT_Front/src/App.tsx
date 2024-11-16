import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Wrapper from "./components/wrapper";
import Home from "./pages/Tests";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AuthProvider from "./utils/AuthProvider";
import NextForm from "./pages/NextForm";
import PrivateRoute from "./utils/PrivateRoute";
import Event from "./pages/Event";
import Account from "./pages/Account";

function App() {
  const [count, setCount] = useState(0);
  const location = useLocation();
  return (
    <Routes key={location.pathname} location={location}>
      <Route element={<Wrapper />}>
        <Route element={<AuthProvider />}>
          <Route path={"/next"} element={<NextForm />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/signin"} element={<Signin />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path={"tests"} element={<Home />} />
          <Route path={"event"} element={<Event />} />
          <Route path={"account"} element={<Account />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
