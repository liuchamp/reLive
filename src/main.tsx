import React from 'react'
import ReactDOM from 'react-dom/client'

// import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from 'antd';

// import routes from '~react-pages'

import {
  BrowserRouter,
} from 'react-router-dom'


import './index.less'
import AppRoutes from './router';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider>
      <BrowserRouter>
      <AppRoutes />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>,
)
