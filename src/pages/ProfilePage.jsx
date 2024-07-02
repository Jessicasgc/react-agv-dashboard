import React from 'react';
import useProfile from '../custom_hooks/GET_HOOKS/useProfile'; // Assuming this is where you define useProfile hook

const ProfilePage = () => {
  const { profile, loading } = useProfile();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>No profile data available</div>;
  }

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {profile.role}</p>
        {/* You can format dates and handle null values as needed */}
      </div>
    </div>
  );
}

export default ProfilePage;