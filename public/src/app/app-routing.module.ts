import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GameLevelListComponent } from './game-level-list/game-level-list.component';

const routes: Routes = [
  { path: '', component: GameListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: UserRegistrationComponent },
  { path: 'game_list', component: GameListComponent },
  { path: 'game_level_list/:id', component: GameLevelListComponent },
  { path: 'game_board/:game_id/:level_index/:group_index', component: GameBoardComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
