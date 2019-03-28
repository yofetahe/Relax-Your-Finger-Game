import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoardTwoComponent } from './game-board-two.component';

describe('GameBoardTwoComponent', () => {
  let component: GameBoardTwoComponent;
  let fixture: ComponentFixture<GameBoardTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameBoardTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
