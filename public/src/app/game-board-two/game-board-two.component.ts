import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { ActivatedRoute, Params } from '@angular/router';
import { InfoServiceService } from '../service/info-service.service';
import { Observable, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-game-board-two',
  templateUrl: './game-board-two.component.html',
  styleUrls: ['./game-board-two.component.css']
})
export class GameBoardTwoComponent implements OnInit {

  small_character_list = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ]

  capital_character_list = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ]

  number_character_list = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
  ]

  special_character_list = [
    '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '`',
    '~', '{', '}', ':', '"', '|', '\\', ';', ',', '.', '/', '?', '>', '<'
  ]

  constructor(
    private _http: HttpService,
    private _route: ActivatedRoute,
    private _infoService: InfoServiceService
    ) { }

  type_content = "Contrary to popular belief, Lorem Ipsum is not simply random text. " + 
                "It has roots in a piece of classical Latin literature from 45 BC,  " + 
                "making it over 2000 years old. Richard McClintock, a Latin  " + 
                "professor at Hampden-Sydney College in Virginia, looked up one  " + 
                "of the more obscure Latin words, consectetur, from a Lorem  " + 
                "Ipsum passage, and going through the cites of the word in  " + 
                "classical literature, discovered the undoubtable source.  " 

                // "Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de  " + 
                // "Finibus Bonorum et Malorum\" (The Extremes of Good and Evil)  " + 
                // "by Cicero, written in 45 BC.  " + 
                // "This book is a treatise on the theory of ethics, very popular  " + 
                // "during the Renaissance. The first line of Lorem Ipsum, \"Lorem  " + 
                // "ipsum dolor sit amet..\", comes from a line in section 1.10.32.";


press_counter: number;
correct_counter: number;
correct_index: any = [];

complition: string = "0%";
game: any = [];
game_detail: any;
game_id: string;
level_index: number;
group_index: number;
display_textbox: boolean;
updated_point: any = [];
player_index: number;
winner: string;

getOthersStatusBar: Observable<string[]> ;
// private _statusBarSub: Subscription;

  ngOnInit() {
    this.getOthersStatusBar = this._infoService.otherStatusBar;
    // this._statusBarSub = this._infoService.otherStatusBar.subscribe()

    this.press_counter = 0;
    this.correct_counter = 0;
    this.winner = "Both";

    if(sessionStorage.getItem('email')){
      this.display_textbox = true;
    } else {
      this.display_textbox = false;
    }  

    this._route.params.subscribe((params: Params) => {
      this.game_id = params['game_id'];
      this.level_index = params['level_index'];
      this.group_index = params['group_index'];
      this.getAllLevelsGamesByGameId(params['game_id']);

    })
  }

  getAllLevelsGamesByGameId(id: string){
    this._http.getAllLevelsGamesByGameId(id)
      .subscribe(data => {
        this.game = data;
        this.game_detail = this.game[0]['level'][this.level_index]['created_group'][this.group_index];
        for(var i = 0; i < this.game_detail['group_memeber'].length; i++){
          if(this.game_detail['group_memeber'][i]['name']==sessionStorage.getItem('name')){
            this.player_index = i;
            break;
          }
        }        
      });
  }

  checkTypeValue(event: any){

    this.getOthersStatusBar.subscribe(data => {      
      this.updated_point = data;
    })
    
    if(event.key == "Backspace" && this.press_counter > 0){
      if(Number(this.correct_index[this.correct_index.length-1]) == this.press_counter){
        this.correct_index.pop();
      }
      this.press_counter = this.press_counter - 1;
    } 
    if ( event.key != "Shift" && 
        (this.capital_character_list.includes(event.key) || 
          this.small_character_list.includes(event.key) ||
          this.special_character_list.includes(event.key) ||
          this.number_character_list.includes(event.key)) ){     
      this.press_counter++;
    }
    if(this.type_content[this.press_counter] == event.key){
      this.correct_counter++;
      this.correct_index.push(this.press_counter);
    }

    var percent = 0;
    var actual_race = (this.correct_index.length / this.type_content.length) * 100;

    if(this.player_index%2==0){      
      percent = 50 + actual_race;
    } else {
      percent = 50 - actual_race;
    }

    this.complition = (Math.round(percent * 100) / 100) + "%";
      
    var logged_user = sessionStorage.getItem('name');
    
    // calling server socket.io
    this._infoService.pushUpdateToServerStatusBar(logged_user, this.complition);
    // console.log("From Server >>> ", this._infoService.getOthersStatusBarUpdate());

    // document.getElementById(logged_user).style.width = this.complition;
    // document.getElementById(logged_user).innerHTML = this.complition;
    
    for(var i = 0; i < this.updated_point.length; i++){

      document.getElementById(this.updated_point[i]['c_user']).style.width = this.updated_point[i]['points'];
      document.getElementById('_'+this.updated_point[i]['c_user']).innerHTML = this.updated_point[i]['points'];
    }
  }

  
  start_btn: boolean = true;
  start_game: boolean = false;
  counter = 5;

  start_playing(){
    this.start_btn = false;
    this.start_game = true;
    var interval = setInterval(() => {
      console.log(this.counter);
      this.counter--;
      if(this.counter < 0 ){
        this.gameOver();
        clearInterval(interval);
        console.log('Ding!');
      };
    }, 1000);
  }

  gameOver() {
    document.getElementById('game-over').style.display = "block";
  }
  closeGameOver() {
    document.getElementById('game-over').style.display = "none";
  }

}
