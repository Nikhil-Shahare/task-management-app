import React, { useState, useEffect } from 'react';

const UserSelector = ({ users, ownerId, onDone }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`;
      return fullName.toLowerCase().includes(search.toLowerCase());
    });

    // Exclude the owner of the project
    const filteredWithoutOwner = filtered.filter((user) => user.id !== ownerId);

    setFilteredUsers(filteredWithoutOwner);
  }, [search, users, ownerId]);

  const handleUserSelect = (userId) => {
    if (!selectedUsers.includes(userId)) {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleDoneClick = () => {
    onDone(selectedUsers);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        multiple
        size="5"
        onChange={(e) => handleUserSelect(e.target.value)}
      >
        {filteredUsers.map((user) => (
          <option key={user.id} value={user.id}>
            {user.firstName} {user.lastName}
          </option>
        ))}
      </select>
      <button onClick={handleDoneClick}>Done</button>
    </div>
  );
};

export default UserSelector;
