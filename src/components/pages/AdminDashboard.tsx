import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { Space, Table, Typography, Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { User } from '../../interfaces/user.interface';

export default function AdminDashboardPage() {

    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tableHeight, setTableHeight] = useState(0);
    const [users, setUsers] = useState<User[] | null>(null);
    const [userToBeDeleted, setUserToBeDeleted] = useState<User | null>(null);
    const [usersFromStorage, setUsersToStorage] = useLocalStorage("users", null);

    const ref = useRef<HTMLDivElement>(null);

    const { Column } = Table;
    const { Title } = Typography;

    useLayoutEffect(() => {
        const node = ref.current;
        const { top } = node!.getBoundingClientRect();
        setTableHeight(window.innerHeight - top - (55 + 32));
    }, [ref]);

    useEffect(() => {
        setUsers(usersFromStorage)
    }, [usersFromStorage])

    const onEditUser = (user: User) => {
        navigate(`/auth/admin/dashboard/user/${user.id}`);
    }

    const onAddUserClick = () => {
        navigate('/auth/admin/dashboard/add-user', { state: { from: 'admin' } });
    }

    const onDeleteUser = (user: User) => {
        setUserToBeDeleted(user);
        setIsModalOpen(true);
    }

    const handleOk = () => {
        const tempUsers: User[] = users!;
        const index = tempUsers.findIndex(user => {
            return user.id === userToBeDeleted!.id;
        });
        if (index !== -1) {
            tempUsers.splice(index, 1);
            setUsersToStorage(tempUsers)
            setUsers([...tempUsers])
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setUserToBeDeleted(null);
        setIsModalOpen(false);
    };

    return (
        <>

            <Space align="baseline" size={1170}>
                <Title level={2}>Users</Title>
                <Button type="primary" onClick={onAddUserClick}>Add User</Button>
            </Space>

            {/* {
                users && */}
            <Table dataSource={users || []} pagination={false} scroll={{ y: tableHeight }} ref={ref}>
                <Column title="First Name" dataIndex="firstName" key="firstName" />
                <Column title="Last Name" dataIndex="lastName" key="lastName" />
                <Column title="Email" dataIndex="email" key="email" />
                <Column title="Gender" dataIndex="gender" key="gender" />
                <Column title="Age" dataIndex="age" key="age" width={75} />
                <Column title="Address" dataIndex="address" key="address" />
                <Column title="Role" dataIndex="role" key="role" />
                <Column
                    title="Action"
                    key="action"
                    render={(_, record: User) => (
                        <Space size="middle">
                            <a onClick={() => { onEditUser(record) }}>Edit</a>
                            <a onClick={() => { onDeleteUser(record) }}>Delete</a>
                        </Space>
                    )}
                />
            </Table>
            {/* } */}


            <Modal title="Confirm Delete User" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                Are you sure ?
            </Modal>
        </>
    )
}
