const url = "http://localhost:3000/api/v1/";

const headers = {
  "Content-Type": "application/json",
  Accepts: "application/json"
};

const getUser = jwt => {
  return fetch(`${url}current_user`, {
    headers: { Authorization: jwt }
  }).then(res => res.json());
};

const login = body => {
  return fetch(`${url}auth`, {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  }).then(res => res.json());
};

const createUser = body => {
  return fetch(`${url}users`, {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  }).then(res => res.json());
};

const getAllUsers = jwt => {
  return fetch(`${url}users`, {
    headers: { Authorization: jwt }
  }).then(res => res.json());
};

const getBoard = (id, jwt) => {
  return fetch(`${url}boards/${id}`, {
    headers: { Authorization: jwt }
  }).then(res => res.json());
};

const createBoard = body => {
  const jwt = localStorage.getItem("token");
  return fetch(`${url}boards`, {
    method: "POST",
    headers: { ...headers, Authorization: jwt },
    body: JSON.stringify(body)
  }).then(res => res.json());
};

const getBoards = () => {
  const jwt = localStorage.getItem("token");
  return fetch(`${url}current_user`, {
    headers: { Authorization: jwt }
  }).then(res => res.json());
};

const createMedia = medium => {
  const jwt = localStorage.getItem("token");
  return fetch(`${url}media`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: jwt
    },
    body: JSON.stringify(medium)
  }).then(res => res.json());
};

const updateMedia = medium => {
  const jwt = localStorage.getItem("token");
  return fetch(`${url}media/${medium.id}`, {
    method: "PATCH",
    headers: {
      ...headers,
      Authorization: jwt
    },
    body: JSON.stringify(medium)
  }).then(res => res.json());
};

const fetchMedia = boardId => {
  const jwt = localStorage.getItem("token");
  return fetch(`${url}media/${boardId}`, {
    headers: { Authorization: jwt }
  }).then(res => res.json());
};

const deleteMedia = id => {
  console.log("in services", id);
  const jwt = localStorage.getItem("token");
  return fetch(`${url}media/${id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      Authorization: jwt
    }
  }).then(res => res.json());
};

const updateMediaContent = (body, id) => {
  const jwt = localStorage.getItem("token");
  return fetch(`${url}media/${id}/change`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: jwt
    },
    method: "PATCH",
    body: JSON.stringify(body)
  }).then(res => res.json());
};

const randomLeft = () => {
  return Math.ceil(Math.random() * 480 + 20) + "px";
};

const randomTop = () => {
  return Math.ceil(Math.random() * 200) + "px";
};

const createBoardPositions = (boardUserIds, body) => {
  const jwt = localStorage.getItem("token");
  if (boardUserIds) {
    let body;
    boardUserIds.forEach(id => {
      body = { id, left_position: randomLeft(), top_position: randomTop() };
      fetch(`${url}board_users/${id}`, {
        headers: {
          ...headers,
          Authorization: jwt
        },
        method: "PATCH",
        body: JSON.stringify(body)
      });
    });
  } else {
    fetch(`${url}update_board_positions`, {
      headers: {
        ...headers,
        Authorization: jwt
      },
      method: "PATCH",
      body: JSON.stringify(body)
    });
  }
};

const addUsers = (boardId, users) => {
  const jwt = localStorage.getItem("token");
  const body = { users };
  return fetch(`${url}boards/${boardId}`, {
    headers: {
      ...headers,
      Authorization: jwt
    },
    method: "PATCH",
    body: JSON.stringify(body)
  }).then(res => res.json());
};

const fetchPreviousMessages = boardId => {
  const jwt = localStorage.getItem("token");
  return fetch(`${url}messages/${boardId}`, {
    headers: {
      Authorization: jwt
    }
  }).then(res => res.json());
};

const postMessage = body => {
  const jwt = localStorage.getItem("token");
  return fetch(`${url}messages`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: jwt
    },
    method: "POST",
    body: JSON.stringify(body)
  });
};

export const api = {
  auth: {
    login,
    getUser,
    createUser
  },
  users: {
    getAllUsers,
    getBoards
  },
  boards: {
    getBoard,
    createBoard,
    createBoardPositions,
    addUsers
  },
  media: {
    createMedia,
    updateMedia,
    fetchMedia,
    deleteMedia,
    updateMediaContent
  },
  chatroom: {
    fetchPreviousMessages,
    postMessage
  }
};
