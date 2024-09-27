import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUserById, fetchUserById } from '../Redux/UserSlice';
import { Table, Spin, Alert, Button, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import CreateEmployeeForm from './CreateEmployeeForm';
import { Link } from 'react-router-dom';

const UserTable = () => {
  const dispatch = useDispatch();
  const { users, loading, error, userDetails } = useSelector((state) => state.users);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = async (record) => {
    message.info(`Editing ${record.fullName}`);
    setIsModalVisible(true);
    setId(record._id);
    await dispatch(fetchUserById(record._id));
  };

  const confirmDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => handleDelete(id),
    });
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUserById(id)).unwrap();
      message.success(`Deleted user with ID: ${id}`);
      dispatch(fetchUsers());
    } catch (error) {
      message.error(`Failed to delete user: ${error}`);
    }
  };

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
      render: (text) => `$${text.toLocaleString()}`,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div>
          <Link to={`/${record._id}`}>
            <Button icon={<EyeOutlined />} style={{ marginRight: 8 }} size="small" />
          </Link>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} style={{ marginRight: 8 }} size="small" />
          <Button icon={<DeleteOutlined />} onClick={() => confirmDelete(record._id)} size="small" danger />
        </div>
      ),
    },
  ];

  return (
    <div className="App" style={{ padding: '20px' }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>User List</h1>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Add Employee
        </Button>
      </div>
      {loading && <Spin tip="Loading users..." />}
      {error && <Alert message="Error" description={error} type="error" showIcon />}

      <Modal
        title={id ? "Edit Employee" : "Create New Employee"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <CreateEmployeeForm onClose={() => setIsModalVisible(false)} id={id} />
      </Modal>

      {!loading && !error && (
        <Table dataSource={users} columns={columns} rowKey="_id" pagination={false} />
      )}
    </div>
  );
}

export default UserTable;
