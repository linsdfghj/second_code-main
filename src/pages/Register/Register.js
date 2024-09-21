import React, { useEffect } from 'react';
import './Register.scss'
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined, MehOutlined, SafetyOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    // 表单成功提交
    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        try {
            const response = await axios.post('https://your-backend-api.com/register', values);
            if (response.data.success) {
                message.success('注册成功！');
                // 处理注册成功的逻辑
            } else {
                message.error('注册失败，请重试！');
            }
        } catch (error) {
            message.error('注册失败，请重试！');
        }
    };

    // 获取验证码的处理函数
    const handleGetCaptcha = async () => {
        try {
            const username = form.getFieldValue('username');
            if (!username) {
                message.error('请输入手机号后再获取验证码！');
                return;
            }
            const response = await axios.post('https://your-backend-api.com/get-captcha', { username });
            if (response.data.success) {
                message.success('验证码已发送！');
            } else {
                message.error('获取验证码失败，请重试！');
            }
        } catch (error) {
            message.error('获取验证码失败，请重试！');
        }
    };

    return (
        <div className='background-container'>
            <div className='wrap-contain'>
                <div className='center-contain'>
                    <div className='shareCommunity'>
                        <div className='content'>
                            <Form
                                form={form}
                                name="register_form"
                                className="username-password"
                                validateTrigger='onBlur'
                                initialValues={{
                                    remember: true,
                                    username: '',
                                    name: '',
                                    password: '',
                                    safePassword: ''
                                }}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入您的用户名！',
                                        },
                                        {
                                            pattern: /^1[3-9]\d{9}$/,
                                            message: '请输入正确的手机号！'
                                        }
                                    ]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                </Form.Item>
                                <Form.Item
                                    name='name'
                                    rules={[
                                        {
                                            required: true,
                                            message: "请输入您的昵称"
                                        }
                                    ]}
                                >
                                    <Input
                                        prefix={<MehOutlined className="site-form-item-icon" />}
                                        type='name'
                                        placeholder='Name'
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入您的密码！',
                                        },
                                    ]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="safePassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入验证码！',
                                        },
                                    ]}
                                >
                                    <Input
                                        prefix={<SafetyOutlined className="site-form-item-icon" />}
                                        placeholder="safePassword"
                                    />
                                    <br></br>
                                    <br></br>
                                    <Button onClick={handleGetCaptcha}>获取验证码</Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        注册
                                    </Button>
                                </Form.Item>
                            </Form>
                            <Form className='remember-forgot-container'>
                                <Link to="/Login" className="login-form-forgot" >
                                    返回登录>>
                                </Link>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
