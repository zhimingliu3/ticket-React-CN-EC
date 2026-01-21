// 引入 React 核心库
import React from 'react';
// 引入 React DOM 客户端 API
import ReactDOM from 'react-dom/client';
// 引入 Ant Design 的配置提供者组件
import { ConfigProvider } from 'antd';
// 引入 Ant Design 的中文语言包
import zhCN from 'antd/locale/zh_CN';
// 引入 React Router 的路由组件
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// 引入登录页面组件
import Login from './components/Login';
// 引入商品列表页面组件
import ProductList from './components/ProductList';
// 引入全局样式文件
// 为解决"找不到模块或其类型声明"的 TypeScript 报错，将 CSS 文件声明为模块
// @ts-ignore
import './styles/App.css';

// 创建 React 根元素并渲染应用
ReactDOM.createRoot(document.getElementById('root')!).render(
  // React 严格模式
  <React.StrictMode>
    {/* Ant Design 配置提供者，设置语言为中文 */}
    <ConfigProvider locale={zhCN}>
      {/* React Router 浏览器路由器 */}
      <BrowserRouter>
        {/* 路由配置 */}
        <Routes>
          {/* 登录页面路由，默认路由 */}
          <Route path="/" element={<Login />} />
          {/* 商品列表页面路由 */}
          <Route path="/products" element={<ProductList />} />
          {/* 重定向路由，将其他路径重定向到登录页面 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
