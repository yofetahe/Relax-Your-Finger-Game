import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { ActivatedRoute, Params } from '@angular/router';

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
  complition: string = "0%";
  game: any = [];
  game_detail: any;
  game_id: string;
  level_index: number;
  group_index: number;
  display_textbox: boolean;

  constructor(
    private _http: HttpService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.press_counter = 0;

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
        console.log(this.game_detail)
      });
  }

  checkTypeValue(event: any){
    
    if(event.key == "Backspace" && this.press_counter > 0){
      this.press_counter = this.press_counter - 1;
    } 
    if ( event.key != "Shift" && 
        (this.capital_character_list.includes(event.key) || 
          this.small_character_list.includes(event.key)) ){     
      this.press_counter++;
    }
    
    var percent = (this.press_counter / this.type_content.length) * 100;
    this.complition = (Math.round(percent * 100) / 100) + "%";

    var logged_user = sessionStorage.getItem('name')

    document.getElementById(logged_user).style.width = this.complition;

    console.log(event.key, this.press_counter, this.type_content[this.press_counter])
    
  }

}
