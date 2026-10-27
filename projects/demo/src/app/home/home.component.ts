import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationComponent } from '../configuration/configuration.component';
import { ConsistencyComponent } from '../consistency/consistency.component';
import { GettingStartedComponent } from '../getting-started/getting-started.component';
import { NgModelComponent } from '../ng-model/ng-model.component';
import { ProblemComponent } from '../problem/problem.component';
import { SignalFormComponent } from '../signal-form/signal-form.component';
import { SolutionComponent } from '../solution/solution.component';

@Component({
  selector: 'demo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    ProblemComponent,
    SolutionComponent,
    ConsistencyComponent,
    ConfigurationComponent,
    NgModelComponent,
    GettingStartedComponent,
    SignalFormComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {}
