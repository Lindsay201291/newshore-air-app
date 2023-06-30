import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JourneyFormComponent } from './components/journey-form/journey-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'journey-form', pathMatch: 'full' },
  { path: 'journey-form', component: JourneyFormComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
