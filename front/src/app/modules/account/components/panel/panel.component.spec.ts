import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAccountComponent } from './panel.component';

describe('AccountComponent', () => {
  let component: PanelAccountComponent;
  let fixture: ComponentFixture<PanelAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
