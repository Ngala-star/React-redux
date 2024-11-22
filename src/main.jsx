import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { fetchUsers } from './features/users/userSlice.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'open-props/style'
import App from './App.jsx'



store.dispatch(fetchUsers())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
