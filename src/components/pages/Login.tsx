import React from 'react'

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message, Typography } from 'antd';

import { useAuth } from '../../hooks/useAuth';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { User } from '../../interfaces/user.interface';

type LoginRequest = {
    email: string,
    password: string
}

export default function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();
    const [users] = useLocalStorage("users", null);

    const { Title } = Typography;

    const initialValues = { email: '', password: '' }

    const onFinish = (values: LoginRequest) => {
        const foundUser = users.find((user: User) => {
            return user.email === values.email && user.password === values.password
        });
        if (foundUser) {
            login!(foundUser)
        } else {
            message.error('Login failed, Invalid credentials.');
        }
    };

    const onRegisterClick = (e: any) => {
        e.preventDefault();
        navigate('/register');
    }

    return (
        <>
            <div className='login-wrapper'>
                <Title level={2}>Login</Title>
                <Form
                    name="login-form"
                    className="login-form"
                    initialValues={initialValues}
                    onFinish={onFinish}
                    layout='vertical'
                >
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input size='large' prefix={<UserOutlined className="site-form-item-icon" />} />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            size='large'
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        &nbsp; Or &nbsp; <a href="" onClick={(e) => onRegisterClick(e)}>register now!</a>
                    </Form.Item>
                </Form>

            </div>
        </>
    )
}
