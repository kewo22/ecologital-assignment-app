import React from 'react'

import { useLocation } from 'react-router-dom';

import { Button, Form, Input, message, Select, Space, Typography } from 'antd';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { User } from '../../interfaces/user.interface';

export default function Register() {

    const location = useLocation();
    const state = location.state || null;

    const [users, setUsers] = useLocalStorage("users", null);
    const [form] = Form.useForm();

    const { Option } = Select;
    const { Title } = Typography;

    const PageTitle = state && state.from === 'admin' ? 'Create User' : 'Create an account';

    const onFinish = (values: User) => {
        const tempUsers: User[] = [...users];
        const newUser: User = { ...values, id: tempUsers.length + 1, role: values.role ? values.role : 'user' };
        tempUsers.push(newUser);
        setUsers(tempUsers);
        form.resetFields();
        message.success('User created successfully');
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <>

            <div className='register-wrapper'>
                <Title level={2}>{PageTitle}</Title>

                <Form layout='vertical' form={form} name="registerForm" onFinish={onFinish}>
                    <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Please input first name' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Please input last name' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email' }, { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' }]}
                    >
                        <Input size='large' />
                    </Form.Item>
                    <Form.Item name="gender" label="Gender" rules={[{ required: true, message: 'Please select gender' }]}>
                        <Select
                            allowClear
                        >
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    {
                        (state && state.from === 'admin') &&
                        <Form.Item
                            name="role"
                            label="Role"
                            rules={[{
                                required: true,
                                message: 'Please select role',
                            }]}
                        >
                            <Select
                                allowClear
                            >
                                <Option value="admin">Admin</Option>
                                <Option value="user">User</Option>
                            </Select>
                        </Form.Item>
                    }
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>

        </>
    )
}
