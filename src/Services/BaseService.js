import { DOMAIN, TOKEN_CYBERSOFT, TOKEN_USER } from "../Utils/constants/settingSystem"

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
        'accesstoken': 'Bearer ' + localStorage.getItem(TOKEN_USER), //JWT
        'TokenCybersoft': TOKEN_CYBERSOFT
      }
     })
  }
  post = (url, model) =>{
    return axios({
      url: ` ${ DOMAIN }${url}`,
      method: 'POST',
      data: model,
      headers: {
        'accesstoken': 'Bearer ' + localStorage.getItem(TOKEN_USER),//JWT
        'TokenCybersoft': TOKEN_CYBERSOFT
      }
     })
  }
  postNotHeaders = (url, model) =>
  {

    return axios({
      url: ` ${ DOMAIN }${url}`,
      method: 'POST',
      data: model,
      headers: {
        'TokenCybersoft': TOKEN_CYBERSOFT
      }
      
     })
  }

  get = (url) =>{
    return axios({
      url: ` ${ DOMAIN }${url}`,
      method: 'GET',
      headers: {
        'accesstoken': 'Bearer ' + localStorage.getItem(TOKEN_USER),//JWT
        'TokenCybersoft': TOKEN_CYBERSOFT
      }
     })
  }
  delete = (url) =>{
    return axios({
      url: ` ${ DOMAIN }${url}`,
      method: 'DELETE',
      headers: {
        'accesstoken': 'Bearer ' + localStorage.getItem(TOKEN_USER),//JWT
        'TokenCybersoft': TOKEN_CYBERSOFT
        
      }
     })
   }
}