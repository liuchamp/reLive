import React from 'react'
import ReactDOM from 'react-dom/client'

import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from 'antd';


import router from './router'
import './index.less'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>,
)
