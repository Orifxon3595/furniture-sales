import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import About from './pages/About'
import Cart from './pages/Cart'
import Home from './pages/Home'
import ProductItem from './pages/ProductItem'
import Products from './pages/Products'

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/About",
          element: <About />,
        },
        {
          path: "/Products",
          element: <Products />,
        },
        {
          path: "/Cart",
          element: <Cart />,
        },
        {
          path: "products/:id",
          element: <ProductItem />,
        },
      ]
    }
  ])
  return <RouterProvider router={routes} />
}

export default App