import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'panel-account',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelAccountComponent implements OnInit {

  public open = false;

  constructor() { }

  ngOnInit() {
  }

  public togglePanel() {
    this.open = !this.open;
  }
}
