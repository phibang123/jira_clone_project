import { DOMAIN, TOKEN_USER } from "../Utils/constants/settingSystem"

import axios from "axios"

export class baseService
{
  //put json về phía backend
  put = (url, model) =>{
    return axios({
      url: ` ${ DOMAIN }${url}`,
      method: 'PUT',
      data: model,
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_USER) //JWT
      }
     })
  }
  post = (url, model) =>{
    return axios({
      url: ` ${ DOMAIN }${url}`,
      method: 'POST',
      data: model,
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_USER)//JWT
      }
     })
  }
  postNotHeaders = (url, model) =>
  {

    return axios({
      url: ` ${ DOMAIN }${url}`,
      method: 'POST',
      data: model,
      
     })
  }

  get = (url) =>{
    return axios({
      url: ` ${ DOMAIN }${url}`,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_USER)//JWT
      }
     })
  }
  delete = (url) =>{
    return axios({
      url: ` ${ DOMAIN }${url}`,
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_USER)//JWT
      }
     })
   }
}