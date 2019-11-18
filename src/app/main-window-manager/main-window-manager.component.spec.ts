import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainWindowManagerComponent } from './main-window-manager.component';

describe('MainWindowManagerComponent', () => {
  let component: MainWindowManagerComponent;
  let fixture: ComponentFixture<MainWindowManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainWindowManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainWindowManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
