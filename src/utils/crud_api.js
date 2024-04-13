const BASE_URL = 'http://127.0.0.1:8000/api';

// async function addNote({ title, body }) {
//   const response = await fetchWithToken(`${BASE_URL}/notes`, {
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
//   const response = await fetchWithToken(`${BASE_URL}/notes`);
//   const responseJson = await response.json();

//   if (responseJson.status !== 'success') {
//     return { error: true, data: null };
//   }

//   return { error: false, data: responseJson.data };
// }

//ItemTypes
async function getItemTypes() {
    const response = await fetch(`${BASE_URL}/itemtype`);
    const responseJson = await response.json();
  
    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
  
    return { error: false, data: responseJson.data };
  }
  
  async function addItemType({ id_type, item_name }) {
      const response = await fetch(`${BASE_URL}/itemtype`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_type, item_name }),
  });
    
      const responseJson = await response.json();
    
      if (responseJson.status !== 'success') {
        return { error: true, data: null };
      }
    
      return { error: false, data: responseJson.data };
    }
  
    async function editItemTypeById({ id, id_type, item_name }) {
      const response = await fetch(`${BASE_URL}/itemtype/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_type, item_name }),
      });
    
      const responseJson = await response.json();
    
      if (responseJson.status !== 'success') {
        return { error: true, data: null };
      }
    
      return { error: false, data: responseJson.data };
    }
  
    async function deleteItemTypeById(id) {
      const response = await fetch(`${BASE_URL}/itemtype/${id}`, {
        method: 'DELETE',
      });
    
      const responseJson = await response.json();
    
      if (responseJson.status !== 'success') {
        return { error: true, data: null };
      }
    
      return { error: false, data: responseJson.data };
    }
  

//Items
async function getItems() {
  const response = await fetch(`${BASE_URL}/item`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function addItems({ id_type, item_name }) {
    const response = await fetch(`${BASE_URL}/item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_type, item_name }),
});
  
    const responseJson = await response.json();
  
    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
  
    return { error: false, data: responseJson.data };
  }

  async function editItemById({ id, id_type, item_name }) {
    const response = await fetch(`${BASE_URL}/item/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_type, item_name }),
    });
  
    const responseJson = await response.json();
  
    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
  
    return { error: false, data: responseJson.data };
  }

  async function deleteItemById(id) {
    const response = await fetch(`${BASE_URL}/item/${id}`, {
      method: 'DELETE',
    });
  
    const responseJson = await response.json();
  
    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
  
    return { error: false, data: responseJson.data };
  }

  async function deleteItemByCode(item_code) {
    const response = await fetch(`${BASE_URL}/item/${item_code}`, {
      method: 'DELETE',
    });
  
    const responseJson = await response.json();
  
    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
  
    return { error: false, data: responseJson.data };
  }

  //AGV
  async function getAGVs() {
    const response = await fetch(`${BASE_URL}/agv`);
    const responseJson = await response.json();
  
    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
  
    return { error: false, data: responseJson.data };
  }

  async function getAGVById(id) {
    const response = await fetch(`${BASE_URL}/agv/${id}`);
    const responseJson = await response.json();
  
    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
  
    return { error: false, data: responseJson.data };
  }

  async function getAGVByName(agv_name) {
    const response = await fetch(`${BASE_URL}/agv/name/${agv_name}`);
    const responseJson = await response.json();
  
    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
  
    return { error: false, data: responseJson.data };
  }

  //Station
  async function getStations() {
    const response = await fetch(`${BASE_URL}/station`);
    const responseJson = await response.json();
  
    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
  
    return { error: false, data: responseJson.data };
  }

  //Task
  async function getTasks() {
    const response = await fetch(`${BASE_URL}/task`);
    const responseJson = await response.json();
  
    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
  
    return { error: false, data: responseJson.data };
  }

  async function getWaitingTasks() {
    const response = await fetch(`${BASE_URL}/waiting_task`);
    const responseJson = await response.json();
  
    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
  
    return { error: false, data: responseJson.data };
  }

  async function getDoneTasks() {
    const response = await fetch(`${BASE_URL}/done_task`);
    const responseJson = await response.json();
  
    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
  
    return { error: false, data: responseJson.data };
  }

  async function getTasksByIdAGV(id_agv) {
    const response = await fetch(`${BASE_URL}/task/agv/${id_agv}`);
    const responseJson = await response.json();
  
    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
  
    return { error: false, data: responseJson.data };
  }
 
  async function getProcessingTasksByIdAGV(id_agv) {
    const response = await fetch(`${BASE_URL}/task/agv/${id_agv}/processing`);
    const responseJson = await response.json();
  
    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
  
    return { error: false, data: responseJson.data };
  }

  async function getAllocatedTasksByIdAGV(id_agv) {
    const response = await fetch(`${BASE_URL}/task/agv/${id_agv}/allocated`);
    const responseJson = await response.json();
  
    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
  
    return { error: false, data: responseJson.data };
  }

  async function getDoneTasksByIdAGV(id_agv) {
    const response = await fetch(`${BASE_URL}/task/agv/${id_agv}/done`);
    const responseJson = await response.json();
  
    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
  
    return { error: false, data: responseJson.data };
  }
async function addTask({ id_station_input, id_station_output, id_item }) {
    const response = await fetch(`${BASE_URL}/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_station_input, id_station_output, id_item }),
});
  
    const responseJson = await response.json();
  
    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
  
    return { error: false, data: responseJson.data };
  }

  // async function doneConfirmTask(id) {
  //   const response = await fetch(`${BASE_URL}/task/done/${id}`, {
  //     method: 'POST',
  //   });
  
  //   const responseJson = await response.json();
  
  //   if (responseJson.status !== 'success') {
  //     return { error: true, data: null };
  //   }
  
  //   return { error: false, data: responseJson.data };
  // }
  
  async function editTaskById({ id, id_station_input, id_station_output, id_item }) {
    const response = await fetch(`${BASE_URL}/task/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_station_input, id_station_output, id_item }),
    });
  
    const responseJson = await response.json();
  
    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
  
    return { error: false, data: responseJson.data };
  }

  async function deleteTaskById(id) {
    const response = await fetch(`${BASE_URL}/task/${id}`, {
      method: 'DELETE',
    });
  
    const responseJson = await response.json();
  
    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }
  
    return { error: false, data: responseJson.data };
  }


 export {
    //Item Type
    getItemTypes,
    addItemType,
    editItemTypeById,
    deleteItemTypeById,

    //Item
    getItems,
    addItems,
    editItemById,
    deleteItemById,
    deleteItemByCode,

    //AGV
    getAGVs,
    getAGVById,
    getAGVByName,

    //Station
    getStations,

    //Task
    getTasks,
    getWaitingTasks,
    getDoneTasks,
    getTasksByIdAGV,
    getProcessingTasksByIdAGV,
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