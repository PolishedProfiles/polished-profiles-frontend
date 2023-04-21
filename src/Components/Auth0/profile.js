import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
console.log(user)
  if (isLoading) {
    return <div>Loading your profile...</div>;
  }

  return (
    isAuthenticated && (
      <div style={{margin: 'auto'}}>
        <img src={user.picture} alt={user.name} style={{display: 'flex', alignItems: 'center', margin: 'auto', marginTop: 10}} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;