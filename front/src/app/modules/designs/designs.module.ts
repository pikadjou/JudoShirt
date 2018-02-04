import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { DesignPageComponent } from './pages/design/design.component';
import { DesignsPageComponent } from './pages/designs/designs.component';
import { DesignsComponent } from './components/designs/designs.component';

import { DesignsService } from 'app/services/designs/designs.service';

const routes: Routes = [
  { path: 'all', component: DesignsPageComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [DesignsService],
  declarations: [DesignPageComponent, DesignsPageComponent, DesignsComponent]
})
export class DesignsModule { }

