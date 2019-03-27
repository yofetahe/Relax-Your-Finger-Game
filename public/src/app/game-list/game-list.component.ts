import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  session_val = sessionStorage.getItem("email"); 
  games: any = {
    name: '',
    description: ''
  }

  constructor(
    private _http: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getAllGames();
  }

  getAllGames(){
    this._http.getAllGames()
      .subscribe(data => {
        console.log(data)
        this.games = data;        
      }); 
  }

  getGameLevelList(id: string){
    this._router.navigate(['/game_level_list/', id])
  }

}
