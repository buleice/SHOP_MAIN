
import {baseUrl} from "../../config/sit.env";
import 'whatwg-fetch';
function addQueryString(params) {
    let paramsData = '';
    for (var Key in params) {
        paramsData +=Key + "=" + params[Key] + "&";
    }
    return paramsData;
}

class Request{
  constructor(url, method = "GET", data = {}) {
    this.url = baseUrl + url+"?",
    this.method = method,
    this.data = Object.assign({},data)
  }
  returnJson(){
    return new Promise((resolve)=>{
      this.method=="POST"?
      fetch(this.url, {
        mode:'cors',
        method: this.method,
        headers: {
          // "Content-Type": "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          "cache": "force-cache"
        },
        credentials: "include",
        // body: JSON.stringify(this.data),
        body:JSON.stringify(this.data)
      }).then(response => resolve(response.json()))
      :
      fetch(this.url+addQueryString(this.data), {
        mode:'cors',
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      }).then(response=>resolve(response.json()))
    })
  }
}
export{
  Request
}
