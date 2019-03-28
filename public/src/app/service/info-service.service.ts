import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class InfoServiceService {

  constructor(
    private _socket: Socket    
  ) { }

  otherStatusBar = this._socket.fromEvent<string[]>('getOthersStatusBar');

  // get others status bar update
  // getOthersStatusBarUpdate(){
  //   return this._socket.emit('getOthersStatusBar');
  // }

  // push the logged-in user status bar change
  pushUpdateToServerStatusBar(logged_user: any, complition: any){
    var data = {
      c_user: logged_user,
      points: complition
    }
    return this._socket.emit('pushStatusBarToServer', data);
  }

  
}
