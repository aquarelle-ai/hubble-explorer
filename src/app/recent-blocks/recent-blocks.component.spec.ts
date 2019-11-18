import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentBlocksComponent } from './recent-blocks.component';

describe('RecentBlocksComponent', () => {
  let component: RecentBlocksComponent;
  let fixture: ComponentFixture<RecentBlocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentBlocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
