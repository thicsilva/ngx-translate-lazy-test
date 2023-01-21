import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'data-view',
    loadChildren: () => import('./feature/feature.module')
    .then(m => m.FeatureModule)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
    {
      enableTracing: false
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
