import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee, updateUser, fetchUserById } from '../Redux/UserSlice';
import { Form, Input, Button, message } from 'antd';

function CreateEmployeeForm({ onClose, id }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const userDetails = useSelector((state) => state.users.userDetails);

  useEffect(() => {
    if (id) {
      form.setFieldsValue(userDetails);
    } else {
      form.resetFields();
    }
  }, [id, userDetails, form]);

  const onFinish = (values) => {
    if (id) {
      dispatch(updateUser({ userId: id, employeeData: values }))
        .unwrap()
        .then(() => {
          message.success('Employee updated successfully!');
          form.resetFields();
          onClose();
        })
        .catch(() => {
          message.error('Failed to update employee.');
        });
    } else {
      dispatch(createEmployee(values))
        .unwrap()
        .then(() => {
          message.success('Employee created successfully!');
          form.resetFields();
          onClose();
        })
        .catch(() => {
          message.error('Failed to create employee.');
        });
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="age" label="Age" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="salary" label="Salary" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="image" label="Image URL">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">{id ? 'Update Employee' : 'Create Employee'}</Button>
      </Form.Item>
    </Form>
  );
}

export default CreateEmployeeForm;
