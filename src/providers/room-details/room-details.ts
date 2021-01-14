import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RoomDetailsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RoomDetailsProvider {

  rooms=[];
  constructor(public http: HttpClient) {
    console.log('Hello RoomDetailsProvider Provider');
  }

  addNewRoom(newRoom){
this.rooms.push(newRoom);
  }
  getAllRoomDetails(){
    return this.rooms;
  }

  deleteRoom(roomIndex){
    this.rooms.splice(roomIndex,1);
    return this.rooms;
  }

}
