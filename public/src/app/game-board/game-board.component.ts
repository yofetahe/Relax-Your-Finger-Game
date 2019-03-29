import { Component, OnInit, HostListener } from '@angular/core';
import { HttpService } from '../service/http.service';
import { ActivatedRoute, Params } from '@angular/router';
import { InfoServiceService } from '../service/info-service.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

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

  type_content = "Lorem Ipsum is simply dummy text of the printing and " +
                "typesetting industry. Lorem Ipsum has been the industry's " +
                "standard dummy text ever since the 1500s, when an unknown " +
                "printer took a galley of type and scrambled it to make a " + 
                "type specimen book. It has survived not only five centuries, " + 
                "but also the leap into electronic typesetting, remaining " + 
                "essentially unchanged. It was popularised in the 1960s with " + 
                "the release of Letraset sheets containing Lorem Ipsum passages, " + 
                "and more recently with desktop publishing software like Aldus " + 
                "PageMaker including versions of Lorem Ipsum.";


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
  is_playing: boolean;

  logged_user: string;

  error_char: any = [];

  getOthersStatusBar: Observable<string[]> ;
  // private _statusBarSub: Subscription;

  constructor(
    private _http: HttpService,
    private _route: ActivatedRoute,
    private _infoService: InfoServiceService
  ) { }

  ngOnInit() {
    this.getOthersStatusBar = this._infoService.otherStatusBar;
    // this._statusBarSub = this._infoService.otherStatusBar.subscribe()

    this.press_counter = 0;
    this.correct_counter = 0;

    this.logged_user = sessionStorage.getItem('name');
    this.is_playing = false;

    // if(sessionStorage.getItem('email')){
    //   this.display_textbox = true;
    // } else {
    //   this.display_textbox = false;
    // }  

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
            this.is_playing = true;
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

      this.press_counter = this.press_counter - 1;

      if(Number(this.correct_index[this.correct_index.length-1]) == (this.press_counter)){
        this.correct_index.pop();
      }
      
      if(this.error_char.length > 0){
        if(this.error_char[this.error_char.length-1]['char'] == this.type_content[this.press_counter]){
          this.error_char.pop();
        } 
      }
    } 
    
    if ( event.key != "Shift" && 
        (event.key == " " ||
          this.capital_character_list.includes(event.key) || 
          this.small_character_list.includes(event.key) ||
          this.special_character_list.includes(event.key) ||
          this.number_character_list.includes(event.key)) ){
            
            if(this.type_content[this.press_counter] == event.key){
              this.correct_counter++;
              this.correct_index.push(this.press_counter);
            } else {
                this.error_char.push({
                  'char': this.type_content[this.press_counter],
                  'position': this.press_counter
                });
            }
      this.press_counter++;
    }
    
    var percent = (this.correct_index.length / this.type_content.length) * 100;
    this.complition = (Math.round(percent * 100) / 100) + "%";
    
    // calling server socket.io - to push current status to other connected
    this._infoService.pushUpdateToServerStatusBar(this.logged_user, this.complition);
    
    for(var i = 0; i < this.updated_point.length; i++){
      document.getElementById(this.updated_point[i]['c_user']).style.width = this.updated_point[i]['points'];
      document.getElementById(this.updated_point[i]['c_user']).innerHTML = this.updated_point[i]['points'];      
    }
  }

}
