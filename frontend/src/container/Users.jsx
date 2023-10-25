// import React from 'react'
// import { useAuth } from '../context/AuthContext';

// const Users = () => {
//     const { user,allUsers,getAllUsers} = useAuth();


//     useEffect(() => {
//         {
    
//             async function fetchUsers() {
//                 try {
//                     const response = await axios.get('http://localhost:4000/api/v1/users'); 
//                     getAllUsers(response.data);
//                 } catch (error) {
//                     console.error('Error fetching users:', error);
//                 }
//             }
            
//              fetchUsers();
//         }
//     }, []);
//   return (
//     <div>Users</div>
//   )
// }

// export default Users