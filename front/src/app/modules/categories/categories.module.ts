import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './componemts/list/list.component';
import { CategoryComponent } from './componemts/category/category.component';

const routes: Routes = [
  { path: '', component: CategoryComponent }
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ListComponent]
})
export class CategoriesModule { }

