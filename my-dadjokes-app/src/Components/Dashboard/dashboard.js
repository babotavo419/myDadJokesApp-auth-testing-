import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';

import './dashboard.scss';

function Dashboard() {
  const { user } = useAuth();
  const [jokes, setJokes] = useState([]);
  const [newJoke, setNewJoke] = useState('');

  useEffect(() => {
    // Fetch jokes submitted by other profiles
    axios.get('/api/jokes').then((response) => {
      setJokes(response.data);
    });
  }, []);

  const handleSubmitJoke = (e) => {
    e.preventDefault();

    // Send a POST request to submit a new joke
    axios.post('/api/jokes', { text: newJoke, userId: user.id }).then(() => {
      // Refresh the jokes list after submission
      axios.get('/api/jokes').then((response) => {
        setJokes(response.data);
      });

      // Clear the input field
      setNewJoke('');
    });
  };

  const handleApproveJoke = (jokeId) => {
    // Implement logic to approve a joke by its ID
    axios.put(`/api/jokes/${jokeId}/approve`).then(() => {
      // Refresh the jokes list after approval
      axios.get('/api/jokes').then((response) => {
        setJokes(response.data);
      });
    });
  };

  const handleRejectJoke = (jokeId) => {
    // Implement logic to reject a joke by its ID
    axios.put(`/api/jokes/${jokeId}/reject`).then(() => {
      // Refresh the jokes list after rejection
      axios.get('/api/jokes').then((response) => {
        setJokes(response.data);
      });
    });
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.username}!</h2>
      <h3>Submit Your Joke</h3>
      <form onSubmit={handleSubmitJoke}>
        <input
          type="text"
          placeholder="Your joke goes here"
          value={newJoke}
          onChange={(e) => setNewJoke(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <h3>Jokes from Other Profiles</h3>
      <ul>
        {jokes.map((joke) => (
          <li key={joke.id}>
            {joke.text}
            {joke.approved ? (
              <span className="approved">Approved</span>
            ) : (
              <span className="rejected">Rejected</span>
            )}
            <button onClick={() => handleApproveJoke(joke.id)}>Approve</button>
            <button onClick={() => handleRejectJoke(joke.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
