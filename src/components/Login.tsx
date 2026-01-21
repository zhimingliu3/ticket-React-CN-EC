// 引入 React 核心库和 Hooks
import React, { useState } from 'react';
// 引入 React Router 的 useNavigate Hook 用于页面跳转
import { useNavigate } from 'react-router-dom';
// 引入 Ant Design 的表单、输入框、按钮、卡片、消息提示和布局组件
import { Form, Input, Button, Card, message, Layout } from 'antd';
// 引入用户图标和锁图标
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// 引入登录页面样式文件
// 为解决"找不到模块或其类型声明"的 TypeScript 报错，将 CSS 文件声明为模块
// @ts-ignore
import '../styles/Login.css';

// 从 Form 组件中解构出 Item 子组件
const { Item } = Form;
// 从 Layout 组件中解构出 Content 子组件
const { Content } = Layout;

// 定义登录表单数据接口
interface LoginFormValues {
  // 用户名
  username: string;
  // 密码
  password: string;
}

// 定义登录页面函数组件
const Login: React.FC = () => {
  // 使用 useNavigate Hook 获取导航函数
  const navigate = useNavigate();
  // 表单实例
  const [form] = Form.useForm();
  // 登录加载状态
  const [loading, setLoading] = useState(false);

  // 用户名校验规则
  const usernameRules = [
    // 必填校验
    { required: true, message: '请输入用户名' },
    // 最小长度校验
    { min: 5, message: '用户名至少 5 个字符' },
    // 最大长度校验
    { max: 20, message: '用户名最多 20 个字符' },
    // 正则校验：只允许字母、数字和下划线
    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线' }
  ];

  // 密码校验规则
  const passwordRules = [
    // 必填校验
    { required: true, message: '请输入密码' },
    // 最小长度校验
    { min: 6, message: '密码至少 6 个字符' },
    // 最大长度校验
    { max: 20, message: '密码最多 20 个字符' }
  ];

  // 处理登录提交的函数
  const handleLogin = async (values: LoginFormValues) => {
    // 设置加载状态为 true
    setLoading(true);
    try {
      // 模拟登录请求延迟
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 模拟登录验证（实际项目中应该调用后端 API）
      if (values.username === 'admin' && values.password === '123456') {
        // 登录成功，显示成功消息
        message.success('登录成功！');
        // 将登录状态存储到 localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', values.username);
        // 跳转到商品列表页面
        navigate('/products');
      } else {
        // 登录失败，显示错误消息
        message.error('用户名或密码错误！');
      }
    } catch (error) {
      // 发生错误，显示错误消息
      message.error('登录失败，请重试！');
    } finally {
      // 无论成功或失败，都将加载状态设置为 false
      setLoading(false);
    }
  };

  // 返回 JSX 元素
  return (
    // Ant Design 布局组件
    <Layout className="login-layout">
      {/* 内容区域 */}
      <Content className="login-content">
        {/* 登录卡片 */}
        <Card className="login-card" title="用户登录" bordered={false}>
          {/* 登录表单 */}
          <Form
            // 表单实例
            form={form}
            // 表单名称
            name="login"
            // 表单布局为垂直方向
            layout="vertical"
            // 表单初始值
            initialValues={{ remember: true }}
            // 表单提交时的处理函数
            onFinish={handleLogin}
            // 表单大小为大号
            size="large"
          >
            {/* 用户名输入框 */}
            <Item
              // 字段名为 username
              name="username"
              // 字段标签
              label="用户名"
              // 校验规则
              rules={usernameRules}
            >
              {/* 输入框组件 */}
              <Input
                // 前缀图标为用户图标
                prefix={<UserOutlined />}
                // 占位符文本
                placeholder="请输入用户名（admin）"
              />
            </Item>

            {/* 密码输入框 */}
            <Item
              // 字段名为 password
              name="password"
              // 字段标签
              label="密码"
              // 校验规则
              rules={passwordRules}
            >
              {/* 密码输入框组件 */}
              <Input.Password
                // 前缀图标为锁图标
                prefix={<LockOutlined />}
                // 占位符文本
                placeholder="请输入密码（123456）"
              />
            </Item>

            {/* 登录按钮 */}
            <Item>
              {/* 按钮组件 */}
              <Button
                // 按钮类型为主按钮
                type="primary"
                // 按钮文本
                htmlType="submit"
                // 按钮占满整行
                block
                // 按钮加载状态
                loading={loading}
                // 按钮大小为大号
                size="large"
              >
                登录
              </Button>
            </Item>
          </Form>

          {/* 提示信息 */}
          <div className="login-tips">
            <p>测试账号：admin</p>
            <p>测试密码：123456</p>
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

// 导出登录页面组件
export default Login;
