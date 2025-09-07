import { BrowserRouter } from "react-router-dom"

const Providers = ({children}: {children: React.ReactNode}) => {
  return (
    <>
        <BrowserRouter>
            {children}
        </BrowserRouter>
    </>
  )
}

export default Providers