import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainWindowManagerComponent } from './main-window-manager/main-window-manager.component';
import { BlockDetailComponent } from './block-detail/block-detail.component';

const routes: Routes = [
    { path:  '', component: MainWindowManagerComponent, pathMatch:  'full' },
    { path: 'block/:hash', component: BlockDetailComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {enableTracing: false}
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { } 