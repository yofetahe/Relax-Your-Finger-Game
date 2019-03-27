import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinRaceComponent } from './join-race.component';

describe('JoinRaceComponent', () => {
  let component: JoinRaceComponent;
  let fixture: ComponentFixture<JoinRaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinRaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
