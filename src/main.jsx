import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './App.css'; // Make sure the path is correct
import {BrowserRouter} from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'

createRoot(document.getElementById('root')).render(
    
    <BrowserRouter> 
    <ShopContextProvider  >
       <App />
       </ShopContextProvider>
    </BrowserRouter>
)
