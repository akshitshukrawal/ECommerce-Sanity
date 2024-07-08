import React from 'react';
import { urlFor } from "../utils/client";

const UserProfile = ({ user }) => {
  if (!user) {
    return <p>Loading...</p>; // Handle case where user data is loading or undefined
  }

  return (
    <div>
      <h1>User Profile</h1>
      <div>
        <img src={urlFor(user?.image)} alt="user-image" width={150} />
      </div>
      <div>{user.name}</div>
      <div>{user.email}</div>
    </div>
  );
}

export default UserProfile;
