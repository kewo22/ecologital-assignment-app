import React from 'react'

import { Button, Form, Input, InputNumber, message, Select, Typography } from 'antd';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useParams } from 'react-router-dom';
import { User } from '../../interfaces/user.interface';

export default function AdminUser() {

    const { id } = useParams();

    const [users, setUsers] = useLocalStorage("users", null);

    const [form] = Form.useForm();

    const { Title } = Typography;
    const { Option } = Select;

    const data = users.find((user: User) => {
        return user.id === +id!;
    })

    const initialValues = { ...data }

    const onFinish = (values: User) => {
        const tempUsers: User[] = users;
        const foundUserIndex = tempUsers.findIndex((user: User) => {
            return user.id === data.id
        });
        if (foundUserIndex !== -1) {
            const updatedWithId = { ...data, ...values };
            tempUsers.splice(foundUserIndex, 1, updatedWithId)
            setUsers(tempUsers);
            message.success('User updated successfully');
        }
    };

    return (
        <>
            <Title level={2}>Edit user</Title>

            <Form layout='vertical' form={form} name="registerForm" onFinish={onFinish} initialValues={initialValues}>
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
                <Form.Item name="address" label="Address">
                    <Input />
                </Form.Item>
                <Form.Item name="age" label="Age">
                    <InputNumber min={1} max={80} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
