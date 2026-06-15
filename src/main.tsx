import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from "react-router-dom";
import { App as AntdApp, ConfigProvider, theme } from "antd";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ConfigProvider theme={{
      algorithm: theme.darkAlgorithm,
    }}>
      <AntdApp>
        <App />
      </AntdApp>
    </ConfigProvider>
  </BrowserRouter>
);