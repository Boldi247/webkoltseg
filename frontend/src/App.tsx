import NavBar from "./components/NavBar/NavBar"
import Providers from "./providers/Providers"
import Router from "./router/Router"

function App() {
  return (
    <>
      <Providers>
        <NavBar/>
        <Router/>
      </Providers>
    </>
  )
}

export default App
