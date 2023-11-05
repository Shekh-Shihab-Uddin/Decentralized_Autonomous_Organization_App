import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './Home';
// import Root from "./components/Root";
import Welcome from './components/Welcome';

const router = createBrowserRouter([
  { path: "/", element: <Welcome />},
  { path: "/home", element: <Home />},
]);

function App() {

  return (
    <>
    <RouterProvider router={router}>
    </RouterProvider>
  </>
  )
}

export default App
