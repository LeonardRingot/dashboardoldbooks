import axios from "axios";

export function requetePostConnexion(code, name) {
  
  var data = JSON.stringify({
    "code":code,
    "name": name
    
  });
  var configConnexion = {
    method: 'post',
    url: `http://localhost:5000/api/list`,
    headers: {
      'Content-Type': 'application/json'
      
    },

    data: data
  };
  return axios(configConnexion);
}
export function requeteGetAllBooks() {
  var configGetAllBooks = {
    method: 'get',
    url: `http://localhost:5000/api/books`,
    headers: {
      'Content-Type': 'application/json'
    }

  };
  return axios(configGetAllBooks);
}
export function requeteGetAllSpots() {
  var configGetAllspots = {
    method: 'get',
    url: `http://localhost:5000/api/spots`,
    headers: {
      'Content-Type': 'application/json'
    }

  };
  return axios(configGetAllspots);
}

export function requeteDeleteBook(_id) {

  var configDeletebook = {
    method: 'delete',
    url: `http://localhost:5000/api/books/`+ _id,
    headers: {
      'Content-Type': 'application/json'
    }

  };
  return axios(configDeletebook);
}
export function requeteDeleteSpot(_id) {

  var configDeletespot = {
    method: 'delete',
    url: `http://localhost:5000/api/spots/`+ _id,
    headers: {
      'Content-Type': 'application/json'
    }

  };
  return axios(configDeletespot);
}
 