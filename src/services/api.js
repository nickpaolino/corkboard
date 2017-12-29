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
  const jwt = localStorage.getItem("token");
  return fetch(`${url}media/${id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      Authorization: jwt
    }
  }).then(res => res.json());
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
    createBoard
  },
  media: {
    createMedia,
    updateMedia,
    fetchMedia,
    deleteMedia
  }
};
