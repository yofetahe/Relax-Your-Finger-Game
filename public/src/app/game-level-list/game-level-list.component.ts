import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-game-level-list',
  templateUrl: './game-level-list.component.html',
  styleUrls: ['./game-level-list.component.css']
})
export class GameLevelListComponent implements OnInit {

  game_id: string;
  game: any = [];
  game_group = {
    name: '',
    schedule: ''
  }
  group_member: any = {
    name: '',
    email: ''
  }
  display_links: boolean;
  level_index: any;
  group_index: any;

  constructor(
    private _http: HttpService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {

    if(sessionStorage.getItem('email')){
      this.display_links = true;
    } else {
      this.display_links = false;
    }    

    this._route.params.subscribe((param: Params) => {
      this.game_id = param['id'];
      this.getAllLevelsGamesByGameId(this.game_id);
    })
  }

  getAllLevelsGamesByGameId(id: string){
    this._http.getAllLevelsGamesByGameId(id)
      .subscribe(data => {
        console.log(data)
        this.game = data;
      });
  }

  createGroupPerLevel(){
    console.log(this.game_group)
    this._http.createGroupPerLevel(this.game_id, this.game_group)
    .subscribe(data => {
      this.closeCreateForm();
      this.getAllLevelsGamesByGameId(this.game_id);
    })
  }

  getGameBoard(level_index: number, group_index: number, game_id: string){
    
    if(game_id == "5c9cdf0b1ce8f250b4df4792") {
      this._router.navigate([`/game_board_2/${this.game_id}/${level_index}/${group_index}`])
    } else if (game_id == "5c9ada9d70712d2414b76064") {
      this._router.navigate([`/game_board/${this.game_id}/${level_index}/${group_index}`])
    }
  }



  // When the user clicks on the button, open the modal 
  createGroupForm() {
    document.getElementById('create-group').style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  closeCreateForm() {
    document.getElementById('create-group').style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  // window.onclick = function(event) {
  //   if (event.target == modal) {
  //     modal.style.display = "none";
  //   }
  // }



  // When the user clicks on the button, open the modal 
  joinGroupForm(level_index: number, group_index: number) {
    this.group_member.name = sessionStorage.getItem('name')
    this.group_member.email = sessionStorage.getItem('email');
    this.level_index = level_index;
    this.group_index = group_index;
    document.getElementById('join-group').style.display = "block";
  }

  joinGroup(){
    console.log(this.group_member)
    this._http.joinGroup(this.game_id, this.group_member, this.level_index, this.group_index)
      .subscribe(data => {
        this.display_links = false;
        this.closeJoinForm();
        this.getAllLevelsGamesByGameId(this.game_id);
      })
  }

  // When the user clicks on <span> (x), close the modal
  closeJoinForm() {
    document.getElementById('join-group').style.display = "none";
  }

}
