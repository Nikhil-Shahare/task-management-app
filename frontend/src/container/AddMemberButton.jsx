import React, { useState } from 'react';

function AddMember({ users, onAddMember, selectedUsers }) {
  const [selectedUser, setSelectedUser] = useState('');

  const handleAddMember = () => {
    if (selectedUser) {
      onAddMember(selectedUser);
      setSelectedUser('');
    }
  }

  return (
    <div className="p-4 border rounded shadow-md">
      <h3 className="text-lg font-bold mb-2">Add Member</h3>
      <div className="flex items-center space-x-4">
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="w-2/3 px-2 py-1 border rounded"
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstName} {user.lastName}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddMember}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {selectedUsers.length > 0 && (
        <div className="mt-4">
          <h4 className="text-lg font-bold mb-2">Selected Members:</h4>
          <ul>
            {selectedUsers.map((userId) => {
              const user = users.find((u) => u.id === userId);
              return (
                <li key={userId}>
                  {user.firstName} {user.lastName}
                </li>
              );
            })}
          </ul>
        </div>
     ) }
    </div>
  );
}

export default AddMember;
