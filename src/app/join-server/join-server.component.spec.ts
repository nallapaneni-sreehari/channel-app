import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinServerComponent } from './join-server.component';

describe('JoinServerComponent', () => {
  let component: JoinServerComponent;
  let fixture: ComponentFixture<JoinServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinServerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
