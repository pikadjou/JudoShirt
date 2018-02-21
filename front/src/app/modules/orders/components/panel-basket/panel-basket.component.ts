import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'panel-basket',
  templateUrl: './panel-basket.component.html',
  styleUrls: ['./panel-basket.component.scss']
})
export class PanelBasketComponent implements OnInit {

  public open = false;
  constructor() { }

  ngOnInit() {
  }

  public toggle() {
    this.open = !this.open;
  }
}
