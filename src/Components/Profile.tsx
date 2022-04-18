import React from 'react';

function Profile(props: any) {
  return (
    <div>
      <h2>Logged In!</h2>
	    <h1>{props.userprofile.name}</h1>
	    <p>{props.userprofile.email}</p>
	    <p>ID: {props.userprofile.$id}</p>
	    <button onClick={() => props.logout()}>Logout</button>
    </div>
  )
}

export default Profile;