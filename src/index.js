/*
 * @Author: linsdfghj 2214112680@qq.com
 * @Date: 2024-06-14 19:49:56
 * @LastEditors: linsdfghj 2214112680@qq.com
 * @LastEditTime: 2024-09-20 02:21:52
 * @FilePath: \second_code_1-main\second_code_1-main\src\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/reset.css'; // 引入antd全局样式
import { Provider } from 'react-redux';
import store from './store';
import { InfoProvider } from './pages/Personal/Project/InfoContext/InfoContext'; 
// 导入路由
import router from './router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <InfoProvider>
                {/* 包裹在 InfoProvider 中 */}
                <App />
                {/* <Apply />
                <Wait /> */}
            </InfoProvider>
        </React.StrictMode>
    </Provider>
);
