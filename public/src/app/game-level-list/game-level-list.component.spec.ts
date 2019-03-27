import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLevelListComponent } from './game-level-list.component';

describe('GameLevelListComponent', () => {
  let component: GameLevelListComponent;
  let fixture: ComponentFixture<GameLevelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameLevelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameLevelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
