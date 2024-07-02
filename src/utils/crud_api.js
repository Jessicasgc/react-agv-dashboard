import { toast } from 'react-toastify';
const BASE_URL = 'http://127.0.0.1:8000/api';

//User
function getAccessToken() {
  return localStorage.getItem('access_token');
}

function putAccessToken(access_token) {
  return localStorage.setItem('access_token', access_token);
}

console.log('Stored access token:', getAccessToken());
async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    toast.error(responseJson.message);
    return { error: true, data: null };
  }

  // putAccessToken(responseJson.data.access_token);
  toast.success('Login successful!');
  return { error: false, data: responseJson.data };
}

async function logout() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();

    if (response.status !== 200) {
      toast.error(responseJson.message || 'Unable to logout');
      return { error: true, data: null };
    }

    toast.success('Logout successful');
    return { error: false, data: responseJson.message };

  } catch (error) {
    console.error('Error during logout:', error);
    toast.error('An error occurred while logging out');
    return { error: true, data: null };
  }
}

async function register({ name, role, email, password }) {
  const response = await fetchWithToken(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, role, email, password }),
  });

  const responseJson = await response.json();

  if (!responseJson['success']) {
    toast.error(responseJson.message);
    return { error: true };
  }
  toast.success(responseJson.message);
  return { error: false, data: responseJson };
}

async function getUserLogged() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/auth-check`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    const data = await (contentType && contentType.includes('application/json') ? response.json() : {});

    if (!data.success) {
      // toast.error(data.message || 'Failed to retrieve user data');
      console.log("Failed to retrieve user data")
      return { error: true, data: null };
    }

    // toast.success('Authenticated user data retrieved successfully!');
    console.log("Authenticated user data retrieved successfully!");
    return { error: false, data: data.data };
  } catch (error) {
    console.error('Error retrieving user data:', error);
    toast.error('Failed to retrieve user data');
    return { error: true, data: null };
  }
  
}

// async function getProfile() {
//   const response = await fetchWithToken(`${BASE_URL}/profile`);
//   const responseJson = await response.json();

//   if (responseJson.status !== 'success') {
//     toast.error(responseJson.message);
//     return { error: true, data: null };
//   }
//   // toast.success('Profile data retrieved successfully!');
//   return { error: false, data: responseJson.data };
// }

// async function changePasswordBeforeLogin({ email, current_password, new_password }) {
//   const response = await fetchWithToken(`${BASE_URL}/forgetPs`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ email, current_password, new_password }),
//   });

//   const responseJson = await response.json();

//   if (responseJson['status']!=='success') {
//     toast.error(responseJson.message);
//     return { error: true, data: null };
//   }
//   toast.success('Password changed successfully!');
//   return { error: false, data: responseJson.data };
// }

// async function changePassword({ current_password, new_password }) {
//   const response = await fetchWithToken(`${BASE_URL}/changePs`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ current_password, new_password }),
//   });

//   const responseJson = await response.json();

//   if (responseJson['status']!=='success') {
//     toast.error(responseJson.message);
//     return { error: true, data: null, message: responseJson.error };
//   }
//   toast.success(responseJson.message);
//   return { error: false, data: responseJson.data, message: responseJson.status };
// }

async function getUsers() {
  const response = await fetchWithToken(`${BASE_URL}/user`);
  const responseJson = await response.json();

  if (responseJson['status']!=='success') {
    toast.error(responseJson.message);
    return { error: true, data: null };
  }
  // toast.success('Users data retrieved successfully!');
  return { error: false, data: responseJson.data };
}

async function editUserById( id, {name, role, email }) {
  const response = await fetchWithToken(`${BASE_URL}/user/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, role, email }),
  });

  const responseJson = await response.json();

  if (responseJson['status']!=='success') {
    toast.error(responseJson.message);
    return { error: true, data: null };
  }
  toast.success(responseJson.message);
  return { error: false, data: responseJson.data };
}

async function updateUserStatusById(id, {is_active}) {
  try {
      const response = await fetchWithToken(`${BASE_URL}/user/${id}/isActive`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ is_active }),
      });
      const responseJson = await response.json();
      if (responseJson.status !== 'success') {
          toast.error(responseJson.message);
          return { error: true };
      }
      toast.success(responseJson.message);
      return { error: false, data:responseJson};
  } catch (error) {
      console.error('Error updating user status:', error);
      throw error;
  }
}

async function deleteUserById(id) {
  const response = await fetchWithToken(`${BASE_URL}/user/${id}`, {
    method: 'DELETE',
  });

  const responseJson = await response.json();

  if (response.status !== 200) {
    toast.error(responseJson.message);
    return { error: true, data: null };
  }
  toast.success(`User with ${id} deleted successfully!`);
  return { error: false, data: responseJson.data };
}

// async function addNote({ title, body }) {
//   const response = await fetchWithTokenWithToken(`${BASE_URL}/notes`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ title, body }),
//   });

//   const responseJson = await response.json();

//   if (responseJson.status !== 'success') {
//     return { error: true, data: null };
//   }

//   return { error: false, data: responseJson.data };
// }

// async function getActiveNotes() {
//   const response = await fetchWithTokenWithToken(`${BASE_URL}/notes`);
//   const responseJson = await response.json();

//   if (responseJson.status !== 'success') {
//     return { error: true, data: null };
//   }

//   return { error: false, data: responseJson.data };
// }

//ItemTypes
async function getItemTypes() {
    const response = await fetchWithToken(`${BASE_URL}/itemtype`);
    const responseJson = await response.json();
  
    if (responseJson['status']!== 'success') {
      toast.error(responseJson.message);
      return { error: true, data: null };
    }
  
    return { error: false, data: responseJson.data };
  }
  
  async function addItemType({ type_name }) {
      const response = await fetchWithToken(`${BASE_URL}/itemtype`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type_name }),
  });
    
      const responseJson = await response.json();
    
      if (!responseJson['success']) {
        toast.error(responseJson.message);
        return { error: true, data: null };
      }
      toast.success(responseJson.message);
      return { error: false, data: responseJson.data };
    }
  
    async function editItemTypeById( id, {type_name }) {
      const response = await fetchWithToken(`${BASE_URL}/itemtype/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type_name }),
      });
    
      const responseJson = await response.json();
    
      if (responseJson['status']!=='success') {
        toast.error(responseJson.message);
        return { error: true, data: null };
      }
      toast.success(responseJson.message);
      return { error: false, data: responseJson.data };
    }
  
    async function deleteItemTypeById(id) {
      const response = await fetchWithToken(`${BASE_URL}/itemtype/${id}`, {
        method: 'DELETE',
      });
    
      const responseJson = await response.json();
    
      if (responseJson['status']!=='success') {
        toast.error(responseJson.message);
        return { error: true, data: null };
      }
      toast.success(responseJson.message);
      return { error: false, data: responseJson.data };
    }
  

//Items
async function getItems() {
  const response = await fetchWithToken(`${BASE_URL}/item`);
  const responseJson = await response.json();

  if (responseJson['status']!=='success') {
    toast.error(responseJson.message);
    return { error: true, data: null };
  }
  return { error: false, data: responseJson.data };
}

async function addItem({ id_type, item_name }) {
    const response = await fetchWithToken(`${BASE_URL}/item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_type, item_name }),
});
  
    const responseJson = await response.json();
  
    if (responseJson['status']!=='success') {
      toast.error(responseJson.message);
      return { error: true, data: null };
    }
    toast.success(responseJson.message);
    return { error: false, data: responseJson.data };
  }

  async function editItemById( id, { id_type, item_name }) {
    const response = await fetchWithToken(`${BASE_URL}/item/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_type, item_name }),
    });
  
    const responseJson = await response.json();
  
    if (responseJson['status']!=='success') {
      toast.error(responseJson.message);
      return { error: true, data: null };
    }
    toast.success(responseJson.message);
    return { error: false, data: responseJson.data };
  }

  async function deleteItemById(id) {
    const response = await fetchWithToken(`${BASE_URL}/item/${id}`, {
      method: 'DELETE',
    });
  
    const responseJson = await response.json();
  
    if (response.status!==200) {
      toast.error(responseJson.message);
      return { error: true, data: null };
    }
    toast.success(responseJson.message);
    return { error: false, data: responseJson.data };
  }

  // async function deleteItemByCode(item_code) {
  //   const response = await fetchWithToken(`${BASE_URL}/item/${item_code}`, {
  //     method: 'DELETE',
  //   });
  
  //   const responseJson = await response.json();
  
  //   if (responseJson['success']) {
  //     return { error: true, data: null };
  //   }
  
  //   return { error: false, data: responseJson.data };
  // }

  //AGV
  async function getAGVs() {
    const response = await fetchWithToken(`${BASE_URL}/agv`);
    const responseJson = await response.json();
  
    if (responseJson['status']!=='success') {
      toast.error(responseJson.message);
      return { error: true, data: null };
    }
  
    return { error: false, data: responseJson.data };
  }

  async function getAGVById(id) {
    const response = await fetchWithToken(`${BASE_URL}/agv/${id}`);
    const responseJson = await response.json();
  
    if (!responseJson['success']) {
      toast.error(responseJson.message);
      return { error: true, data: null };
    }

    toast.success(responseJson.message);
    return { error: false, data: responseJson.data };
  }

  async function getAGVByName(agv_name) {
    const response = await fetchWithToken(`${BASE_URL}/agv/name/${agv_name}`);
    const responseJson = await response.json();
  
    if (!responseJson['success']) {
      toast.error(responseJson.message);
      return { error: true, data: null };
    }
    toast.success(responseJson.message);
    return { error: false, data: responseJson.data };
  }

  //Station
  async function getStations() {
    const response = await fetchWithToken(`${BASE_URL}/station`);
    const responseJson = await response.json();
  
    if (responseJson['status']!=='success') {
      toast.error(responseJson.message);
      return { error: true, data: null };
    }
    // toast.success(responseJson.message);
    return { error: false, data: responseJson.data };
  }

  async function addStation({ id_type, x, y, max_capacity }) {
    const response = await fetchWithToken(`${BASE_URL}/station`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_type, x, y, max_capacity }),
});
  
    const responseJson = await response.json();
  
    if (responseJson['status']!=='success') {
      toast.error(responseJson.message);
      return { error: true, data: null };
    }
    toast.success(responseJson.message);
    return { error: false, data: responseJson.data };
  }

  async function editStationById(id, {id_type, x, y, stock, max_capacity }) {
    console.log("id",id);
    const response = await fetchWithToken(`${BASE_URL}/station/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_type, x, y, stock, max_capacity }),
    });
  
    const responseJson = await response.json();
  
    if (responseJson['status']!=='success') {
      toast.error(responseJson.message);
      return { error: true, data: null };
    }
    toast.success(responseJson.message);
    return { error: false, data: responseJson.data };
  }

  async function deleteStationById(id) {
    const response = await fetchWithToken(`${BASE_URL}/station/${id}`, {
      method: 'DELETE',
    });
  
    const responseJson = await response.json();
  
    if (response.status !== 200) {
      toast.error(responseJson.message);
      return { error: true, data: null };
    }
  
    toast.success(responseJson.message);
    return { error: false, data: responseJson.data };
  }


  //Task
  async function getTasks() {
    const response = await fetchWithToken(`${BASE_URL}/task`);
    const responseJson = await response.json();
  
    if (responseJson['status']!=='success') {
      toast.error(responseJson.message);
      return { error: true, data: null };
    }
    // toast.success(responseJson.message);
    return { error: false, data: responseJson.data };
  }

  async function getWaitingTasks() {
    const response = await fetchWithToken(`${BASE_URL}/waiting_task`);
    const responseJson = await response.json();
    
    if (!responseJson['success']) {
      toast.error(responseJson.message);
      return { error: true, data: null };
    }
    // console.log(responseJson['data'],"json");
  
    return { error: false, data: responseJson['data'] };
  }

  async function getDoneTasks() {
    const response = await fetchWithToken(`${BASE_URL}/done_task`);
    const responseJson = await response.json();
  
    if (!responseJson['success']) {
      toast.error(responseJson.message);
      return { error: true, data: null };
    }
  
    return { error: false, data: responseJson.data };
  }

  async function getTasksByIdAGV(id_agv) {
    const response = await fetchWithToken(`${BASE_URL}/task/agv/${id_agv}`);
    const responseJson = await response.json();
  
    if (responseJson['success']) {
      return { error: true, data: null };
    }
  
    return { error: false, data: responseJson.data };
  }
 
  async function getProcessingTaskByIdAGV(id_agv) {
    const response = await fetchWithToken(`${BASE_URL}/task/agv/${id_agv}/processing`);
    const responseJson = await response.json();
  
    if (!responseJson['success']) {
      toast.error(responseJson.message);
      return { error: true, data: null };
    }
  
    return { error: false, data: responseJson.data };
  }

  async function getAllocatedTasksByIdAGV(id_agv) {
    const response = await fetchWithToken(`${BASE_URL}/task/agv/${id_agv}/allocated`);
    const responseJson = await response.json();
  
    if (!responseJson['success']) {
      toast.error(responseJson.message);
      return { error: true, data: null };
    }
  
    return { error: false, data: responseJson.data };
  }

  async function getDoneTasksByIdAGV(id_agv) {
    const response = await fetchWithToken(`${BASE_URL}/task/agv/${id_agv}/done`);
    const responseJson = await response.json();
  
    if (!responseJson['success']) {
      toast.error(responseJson.message);
      return { error: true, data: null };
    }
  
    return { error: false, data: responseJson.data };
  }
  async function addTask({ id_destination_station, id_item }) {
      const response = await fetchWithToken(`${BASE_URL}/task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_destination_station, id_item }),
  });
  
    const responseJson = await response.json();
  
    if (responseJson['status']!=='success') {
      toast.error(responseJson.message);
      return { error: true, data: null };
    }
    toast.success(responseJson.message);
    return { error: false, data: responseJson.data };
  }

  // async function doneConfirmTask(id) {
  //   const response = await fetchWithToken(`${BASE_URL}/task/done/${id}`, {
  //     method: 'POST',
  //   });
  
  //   const responseJson = await response.json();
  
  //   if (responseJson.status !== 'success') {
  //     return { error: true, data: null };
  //   }
  
  //   return { error: false, data: responseJson.data };
  // }
  
  async function editTaskById(id, {id_destination_station, id_start_station, id_item }) {
    console.log("id",id);
    const response = await fetchWithToken(`${BASE_URL}/task/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, id_destination_station, id_start_station, id_item }),
    });
  
    const responseJson = await response.json();
  
    if (responseJson['status']!=='success') {
      toast.error(responseJson.message);
      return { error: true, data: null };
    }
    toast.success(responseJson.message);
    return { error: false, data: responseJson.data };
  }

  async function deleteTaskById(id) {
    const response = await fetchWithToken(`${BASE_URL}/task/${id}`, {
      method: 'DELETE',
    });
  
    const responseJson = await response.json();
  
    if (response.status!==200) {
      toast.error(responseJson.message);
      return { error: true, data: null };
    }
  
    toast.success(responseJson.message);
    return { error: false, data: responseJson.data };
  }


 export {
    //User
    getAccessToken,
    putAccessToken,
    login,
    register,
    getUserLogged,
    // changePasswordBeforeLogin,
    // changePassword,
    getUsers,
    editUserById,
    deleteUserById,
    // getProfile,
    updateUserStatusById,
    logout,

    //Item Type
    getItemTypes,
    addItemType,
    editItemTypeById,
    deleteItemTypeById,

    //Item
    getItems,
    addItem,
    editItemById,
    deleteItemById,
    // deleteItemByCode,

    //AGV
    getAGVs,
    getAGVById,
    getAGVByName,

    //Station
    getStations,
    addStation,
    editStationById,
    deleteStationById,

    //Task
    getTasks,
    getWaitingTasks,
    getDoneTasks,
    getTasksByIdAGV,
    getProcessingTaskByIdAGV,
    getAllocatedTasksByIdAGV,
    getDoneTasksByIdAGV,
    addTask,
    editTaskById,
    deleteTaskById
//   addNote,
//   getActiveNotes,
//   getArchivedNotes,
//   getNote,
//   archiveNote,
//   unarchiveNote,
//   deleteNote,
 };