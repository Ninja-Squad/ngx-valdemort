import { Component } from '@angular/core';
import { GettingStartedComponent } from '../getting-started/getting-started.component';
import { NgModelComponent } from '../ng-model/ng-model.component';
import { ConfigurationComponent } from '../configuration/configuration.component';
import { ConsistencyComponent } from '../consistency/consistency.component';
import { SolutionComponent } from '../solution/solution.component';
import { ProblemComponent } from '../problem/problem.component';

@Component({
  selector: 'demo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [ProblemComponent, SolutionComponent, ConsistencyComponent, ConfigurationComponent, NgModelComponent, GettingStartedComponent]
})
export class HomeComponent {}
