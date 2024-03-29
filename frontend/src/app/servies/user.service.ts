import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService 
{
  url  =  environment.apiUrl;
  constructor(private httpClient : HttpClient) { }
  singnup(data:any){
    return this.httpClient.post(this.url+"/user/signup",data,{
      headers : new HttpHeaders().set('Content-Type',"application/json")
    })
  }
  login(data:any){
    return this.httpClient.post(this.url+"/user/login/",data,{
    headers : new HttpHeaders().set('Content-Type',"application/json")
    })
  }
  
  checkToken(){
    return this.httpClient.get(this.url+"/user/checkToken");
  }
  changePassword(data:any){
    return this.httpClient.post(this.url+'/user/changepassword',data,{
      headers : new HttpHeaders().set('Content-Type',"application/json")
    })
  }
  getUsers(){
    return this.httpClient.get(this.url+'/user/get/');
  }
  update(data:any){
    return this.httpClient.patch(this.url+'/user/update',data,{
      headers : new HttpHeaders().set('Content-Type',"application/json")
    })
  }
  
  
}
