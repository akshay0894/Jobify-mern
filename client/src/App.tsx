import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { useEffect } from "react"
import { checkDefaultTheme } from "./context/DashBoardContext"

 const  App = () =>  {
  useEffect(()=>{
    checkDefaultTheme();
  },[])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
