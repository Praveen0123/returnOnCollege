import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewComponent } from './features/review/containers/review/review.component';
import { PageNotFoundComponent } from './core/containers/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: ReviewComponent
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'page-not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
