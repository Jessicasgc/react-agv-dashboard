import React, { useState } from 'react';
import useProfile from '../custom_hooks/GET_HOOKS/useProfile';
import use5LogAuth from '../custom_hooks/GET_HOOKS/Logs/useLog5Auth';
import useLogAuthedUser from '../custom_hooks/GET_HOOKS/Logs/useLogActionAuthedUser';
import { Typography, DatePicker, List, Card } from 'antd';
import ReusableTable from '../components/ReusableTable';
import ThemeContext from '../contexts/ThemeContext';
import useUsers from '../custom_hooks/GET_HOOKS/useUsers';
import LocaleContext from '../contexts/LocaleContext';

const { Title, Text } = Typography;

const OperatorProfilePage = () => {
  const {locale} = React.useContext(LocaleContext);
  const { profile, loading } = useProfile();
  const { users, loading: loadingUsers } = useUsers();
  const { logauth5, loading: loadingLogAuth } = use5LogAuth();
  const { logAuthedUser, loading: loadingLogAuthedUser } = useLogAuthedUser();
  const [selectedDate, setSelectedDate] = useState(null);
  const { theme } = React.useContext(ThemeContext);

  if (loading || loadingLogAuth || loadingLogAuthedUser) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>No profile data available</div>;
  }

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString); 
  };

  const filteredLogAuthedUser = selectedDate && logAuthedUser
    ? logAuthedUser.filter((log) => {
        const logDate = new Date(log.action_time);
        const selectedDateStart = new Date(selectedDate);
        const selectedDateEnd = new Date(selectedDate);
        selectedDateEnd.setDate(selectedDateEnd.getDate() + 1); 

        return logDate >= selectedDateStart && logDate < selectedDateEnd;
      }): logAuthedUser;

  const columns = [
    {
      title: 'Table Name',
      dataIndex: 'table_name',
      key: 'table_name',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Data',
      dataIndex: 'data',
      key: 'data',
    },
    {
      title: 'Row',
      dataIndex: 'row_id',
      key: 'row',
    },
    {
      title: 'Action Time',
      dataIndex: 'action_time',
      key: 'action_time',
    },
  ];

  return (
    <div className="profile-page">
      <Title level={2}style={{ color: 'var(--on-background)' }}>{locale=== 'id' ? 'Profil':'Profile'}</Title>
      <Card className='profile-card'>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {profile.role}</p>
      </Card>
      
      
      <Title level={3} style={{ color: 'var(--on-background)' }}>{locale=== 'id' ? `Log Aksimu, ${profile.name}`: `Log Action by ${profile.name}`}</Title>
      <div className="date-picker-container" style={{ marginBottom: '20px' }}>
        <DatePicker onChange={handleDateChange} />
      </div>

      {selectedDate ? (
        <div className="table-container"style={{ width: '100%', maxWidth: '1000px', marginBottom: '20px' }}>
        <ReusableTable data={filteredLogAuthedUser} columns={columns} theme={theme} />
        </div>
      ):(
        <div className="table-container"style={{ width: '100%', maxWidth: '1000px', marginBottom: '20px' }}>
          <ReusableTable data={logAuthedUser} columns={columns} theme={theme} />
        </div>
      
      )}
      <Title level={3} style={{ color: 'var(--on-background)' }}>{locale=== 'id' ? '5 Log Login Terakhir':'Last 5 Log Auth'}</Title>
      <List
        dataSource={logauth5}
        renderItem={(log, index) => {
          const user = users.find((user) => user.id === log.id_user);
          const userName = user ? user.name : 'Unknown User';
          
          return (
            <List.Item key={index}>
              <Text style={{ color: 'var(--on-background)' }}>{userName} - {log.action_time} - {log.ip_address}</Text>
            </List.Item>
          );
        }}
      />
    </div>
  );
}

export default OperatorProfilePage;
