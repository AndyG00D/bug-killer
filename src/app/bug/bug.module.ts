import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthBarComponent } from './shared/health-bar/health-bar.component';
import { BugComponent } from './bug.component';
import { BugRoutingModule } from './bug-routing.module';

@NgModule({
  imports: [
    CommonModule,
    BugRoutingModule
  ],
  declarations: [
    HealthBarComponent,
    BugComponent
  ]
})
export class BugModule {
}
