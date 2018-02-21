import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './components/basket/basket.component';
import { PanelBasketComponent } from './components/panel-basket/panel-basket.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BasketComponent, PanelBasketComponent],
  exports : [PanelBasketComponent]
})
export class OrdersModule { }
