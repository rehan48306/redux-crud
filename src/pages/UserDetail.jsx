import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../Redux/UserSlice';
import { Card, Spin, Alert } from 'antd';
import { useParams } from 'react-router-dom';

const UserDetail = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  
  const { userDetails, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (_id) {
      dispatch(fetchUserById(_id));
    }
  }, [dispatch, _id]);

  if (loading) {
    return <Spin tip="Loading user details..." />;
  }

  if (error) {
    return (
      <Alert
        message="Error Fetching User Details"
        description={error}
        type="error"
        showIcon
        style={{ margin: '20px' }}
      />
    );
  }

  return (
    <Card title="User Details" style={{ width: 300, margin: '20px auto' }}>
      <p><strong>Full Name:</strong> {userDetails?.fullName}</p>
      <p><strong>Email:</strong> {userDetails?.email}</p>
      <p><strong>Phone:</strong> {userDetails?.phone}</p>
      <p><strong>Age:</strong> {userDetails?.age}</p>
      <p><strong>Salary:</strong> ${userDetails?.salary?.toLocaleString()}</p>
      {userDetails?.image && (
        <img
          src={userDetails.image}
          alt="User"
          style={{ width: '100%', height: 'auto' }}
        />
      )}
    </Card>
  );
};

export default UserDetail;
