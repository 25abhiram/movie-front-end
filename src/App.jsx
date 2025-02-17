import { useState } from "react";
import "./App.css";
import { Header, Footer, LoginPage } from "./components";
import AllRoutes from "./routes/AllRoutes";

function App() {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
      {showLogin ? <LoginPage setShowLogin={setShowLogin} /> : <></>}
      <div>
        <Header setShowLogin={setShowLogin} />
        <AllRoutes />
        <Footer />
      </div>
    </>
  );
}

export default App;
