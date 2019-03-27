import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameLevelListComponent } from './game-level-list/game-level-list.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameGroupComponent } from './game-group/game-group.component';
import { JoinRaceComponent } from './join-race/join-race.component';
import { HttpService } from './service/http.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserRegistrationComponent,
    GameListComponent,
    GameLevelListComponent,
    GameBoardComponent,
    GameGroupComponent,
    JoinRaceComponent,
    PageNotFoundComponent,
    HeaderComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ HttpService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
