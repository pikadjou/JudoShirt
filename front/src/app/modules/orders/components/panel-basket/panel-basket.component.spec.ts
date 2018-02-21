import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelBasketComponent } from './panel-basket.component';

describe('PanelBasketComponent', () => {
  let component: PanelBasketComponent;
  let fixture: ComponentFixture<PanelBasketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelBasketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
