import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinksComponent } from 'app/modules/base/links/links.component';
import { PanelAccountComponent } from 'app/modules/account/components/panel/panel.component';
import { PanelBasketComponent } from 'app/modules/orders/components/panel-basket/panel-basket.component';
import { PanelSearchComponent } from 'app/modules/search/components/panel/panel.component';

import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HeaderComponent, SidebarComponent, LinksComponent, PanelAccountComponent, PanelBasketComponent, PanelSearchComponent],
  exports: [HeaderComponent, SidebarComponent]
})
export class ContainersModule { }
