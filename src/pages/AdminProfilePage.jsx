import React, { useState } from 'react';
import useProfile from '../custom_hooks/GET_HOOKS/useProfile';
import use5LogAuth from '../custom_hooks/GET_HOOKS/Logs/useLog5Auth';
import useLogAuthedUser from '../custom_hooks/GET_HOOKS/Logs/useLogActionAuthedUser';
import { Typography, DatePicker, List, Card } from 'antd';
import ReusableTable from '../components/ReusableTable';
import ThemeContext from '../contexts/ThemeContext';
import useAllAuthLog from '../custom_hooks/GET_HOOKS/Logs/useAllAuthLog';
import useAllActionLog from '../custom_hooks/GET_HOOKS/Logs/useAllActionLog';
import useUsers from '../custom_hooks/GET_HOOKS/useUsers';
import LocaleContext from '../contexts/LocaleContext';

const { Title, Text } = Typography;

const AdminProfilePage = () => {
  const {locale} = React.useContext(LocaleContext);
  const { profile, loading } = useProfile();
  const { authLog, loading: loadingLogAuth } = useAllAuthLog();
  const { actionLog, loading: loadingLogAction } = useAllActionLog();
  const { logAuthedUser, loading: loadingLogAuthedUser } = useLogAuthedUser();
  const { logauth5, loading: loadingLogAuth5 } = use5LogAuth();
  const { users, loading: usersLoading } = useUsers();
  const [selectedDateAuthedUser, setSelectedDateAuthedUser] = useState(null);
  const [selectedDateAllAction, setSelectedDateAllAction] = useState(null);
  const [selectedDateAllAuth, setSelectedDateAllAuth] = useState(null);
  const { theme } = React.useContext(ThemeContext);

  if (loading || loadingLogAuth || loadingLogAuthedUser) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>No profile data available</div>;
  }

  const handleDateChangeAuthedUser = (date, dateString) => {
    setSelectedDateAuthedUser(dateString); // Store the selected date string for authed user actions
  };

  const handleDateChangeAllAction = (date, dateString) => {
    setSelectedDateAllAction(dateString); // Store the selected date string for all actions
  };

  const handleDateChangeAllAuth = (date, dateString) => {
    setSelectedDateAllAuth(dateString); // Store the selected date string for all auth actions
  };
  const filterLogsByDate = (logs, selectedDate) => {
    if (!selectedDate) return logs;
    return logs.filter((log) => {
      const logDate = new Date(log.action_time);
      const selectedDateStart = new Date(selectedDate);
      const selectedDateEnd = new Date(selectedDate);
      selectedDateEnd.setDate(selectedDateEnd.getDate() + 1); // End date is next day 00:00:00
      return logDate >= selectedDateStart && logDate < selectedDateEnd;
    });
  };

  const filteredLogAuthedUser = filterLogsByDate(logAuthedUser, selectedDateAuthedUser);
  const filteredAllActionLog = filterLogsByDate(actionLog, selectedDateAllAction);
  const filteredAllAuthLog = filterLogsByDate(authLog, selectedDateAllAuth);
  const authedUserActionLogColumns = [
    {
      title: locale === 'id' ? 'Nama Tabel' : 'Table Name',
      dataIndex: 'table_name',
      key: 'table_name',
    },
    {
      title: locale === 'id' ? 'Aksi' : 'Action',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Data',
      dataIndex: 'data',
      key: 'data',
    },
    {
      title: locale === 'id' ? 'ID Baris' : 'Row ID',
      dataIndex: 'row_id',
      key: 'row',
    },
    {
      title: locale === 'id' ? 'Waktu Aksi' : 'Action Time',
      dataIndex: 'action_time',
      key: 'action_time',
    },
  ];

  const allActionLogColumns = [
    {
      dataIndex: 'id_user',
      title: locale === 'id' ? 'Nama Pengguna' : ' User Name',
      render : (userId) => {
        
          const foundUser = users.find(user => user.id === userId);
          return foundUser ? foundUser.name : usersLoading?'Loading...': 'Unknown';
      }
  },
    {
      title: locale === 'id' ? 'Nama Pengguna' : 'User Name',
      dataIndex: 'table_name',
      key: 'table_name',
    },
    {
      title: locale === 'id' ? 'Nama Tabel' : 'Table Name',
      dataIndex: 'table_name',
      key: 'table_name',
    },
    {
      title: locale === 'id' ? 'Aksi' : 'Action',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Data',
      dataIndex: 'data',
      key: 'data',
    },
    {
      title: locale === 'id' ? 'ID Baris' : 'Row ID',
      dataIndex: 'row_id',
      key: 'row',
    },
    {
      title: locale === 'id' ? 'Waktu Aksi' : 'Action Time',
      dataIndex: 'action_time',
      key: 'action_time',
    },
  ];

  const allAuthLogColumns = [
    {
      dataIndex: 'id_user',
      title: locale === 'id' ? 'Nama Pengguna' : ' User Name',
      render : (userId) => {
        
          const foundUser = users.find(user => user.id === userId);
          return foundUser ? foundUser.name : usersLoading?'Loading...': 'Unknown';
      }
    },
    {
      title: locale === 'id' ? 'Waktu Login':'Login Time',
      dataIndex: 'action_time',
      key: 'action_time',
    },
    {
      title: locale === 'id' ? 'Alamat IP' :'IP Address',
      dataIndex: 'ip_address',
      key: 'ip_address',
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
      <div className="date-picker-container">
        <DatePicker onChange={handleDateChangeAuthedUser} />
      </div>

      {selectedDateAuthedUser ? (
        <div className="table-container" style={{ width: '100%', maxWidth: '1000px', marginBottom: '20px' }}>
          <ReusableTable data={filteredLogAuthedUser} columns={authedUserActionLogColumns} theme={theme} />
        </div>
      ): (
        <div className="table-container" style={{ width: '100%', maxWidth: '1000px', marginBottom: '20px' }}>
          <ReusableTable data={logAuthedUser} columns={authedUserActionLogColumns} theme={theme} />
        </div>
      
      )}

      <Title level={3} style={{ color: 'var(--on-background)' }}>{locale=== 'id' ? 'Semua Log Aksi': 'All Log Action'}</Title>
      <div className="date-picker-container">
        <DatePicker onChange={handleDateChangeAllAction} />
      </div>

      {selectedDateAllAction ? (
        <div className="table-container" style={{ width: '100%', maxWidth: '1000px', marginBottom: '20px' }}>
          <ReusableTable data={filteredAllActionLog} columns={allActionLogColumns} theme={theme} />
        </div>
      ): (
        <div className="table-container" style={{ width: '100%', maxWidth: '1000px', marginBottom: '20px' }}>
          <ReusableTable data={actionLog} columns={allActionLogColumns} theme={theme} />
        </div>
      
      )}

      <Title level={3} style={{ color: 'var(--on-background)' }}>{locale=== 'id' ? 'Semua Log Autentikasi':'All Log Auth'}</Title>
      <div className="date-picker-container">
        <DatePicker onChange={handleDateChangeAllAuth} />
      </div>

      {selectedDateAllAuth ? (
        <div className="table-container" style={{ width: '100%', maxWidth: '1000px', marginBottom: '20px' }}>
          <ReusableTable data={filteredAllAuthLog} columns={allAuthLogColumns} theme={theme} />
        </div>
      ):(
        <div className="table-container" style={{ width: '100%', maxWidth: '1000px', marginBottom: '20px' }}>
          <ReusableTable data={authLog} columns={allAuthLogColumns} theme={theme} />
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

export default AdminProfilePage;
