import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private _http: HttpClient
  ) { }

  getAllGames(){
    return this._http.get('api/my_game')
  }
  getAllLevelsGamesByGameId(id: string){
    return this._http.get(`/api/my_game/game/${id}`);
  }
  addUser(data: any){
    return this._http.post('/api/my_game', data);
  }
  getUserByUsername(data: any){
    return this._http.post('/api/my_game/login', data);
  }
  createGroupPerLevel(id: string, data: any){
    console.log(data)
    return this._http.post(`/api/my_game/group/${id}`, data);
  }
  joinGroup(id: string, data: any, level_index: number, group_index: number){
    return this._http.post(`/api/my_game/joingroup/${id}/${level_index}/${group_index}`, data)
  }
}
