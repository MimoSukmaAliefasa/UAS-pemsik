import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './views/Home'
import Dashboard from './views/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router'
import store from './store/store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)
