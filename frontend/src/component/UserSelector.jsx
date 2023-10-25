import React, { useState, useEffect } from 'react';

const UserSelector = ({ users, ownerId, onDone }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
    console.log("i am user in selector",users)
  useEffect(() => {
    const filtered = users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`;
      return fullName.toLowerCase().includes(search.toLowerCase());
    });
    console.log("i am owner id",ownerId)

    // Exclude the owner of the project
    const filteredWithoutOwner = filtered.filter((user) => user._id !== ownerId);

    setFilteredUsers(filteredWithoutOwner);
  }, [search, users, ownerId]);

  const handleUserSelect = (userId) => {
    if (!selectedUsers.includes(userId)) {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleUserDeselect = (userId) => {
    const updatedSelectedUsers = selectedUsers.filter((id) => id !== userId);
    setSelectedUsers(updatedSelectedUsers);
  };

  const handleDoneClick = () => {
    onDone(selectedUsers);
  };

  return (
    <div className="p-4 border rounded shadow-md relative">
      <div className="absolute top-0 left-0 right-0 bg-gray-200 px-4 py-2 border-b">
        {selectedUsers.map((userId) => (
          <div
            key={userId}
            className="bg-blue-200 px-2 py-1 rounded-full m-1 inline-block cursor-pointer"
            onClick={() => handleUserDeselect(userId)}
          >
            {users.find((user) => user._id === userId).firstName}  {users.find((user) => user._id === userId).lastName}{' '}
            <span className="text-red-500 font-bold">x</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Search for a user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border rounded mb-4"
      />
      <select
        multiple
        size="5"
        onChange={(e) => handleUserSelect(e.target.value)}
        className="w-full px-4 py-2 border rounded mb-4"
      >
        {filteredUsers.map((user) => (
          <option key={user._id} value={user._id}>
            {user.firstName} {user.lastName}
          </option>
        ))}
      </select>
      <button
        onClick={handleDoneClick}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Done
      </button>
    </div>
  );
};

export default UserSelector;
