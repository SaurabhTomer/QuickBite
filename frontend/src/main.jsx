
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store';

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Root element not found! Make sure there is a div with id="root" in your HTML');
}

createRoot(rootElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
)
