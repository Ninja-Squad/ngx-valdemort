import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValdemortModule } from 'ngx-valdemort';
import { ProblemComponent } from './problem/problem.component';
import { SolutionComponent } from './solution/solution.component';
import { ConsistencyComponent } from './consistency/consistency.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { SnippetComponent } from './snippet/snippet.component';
import { ValidationDefaultsComponent } from './validation-defaults/validation-defaults.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';

@NgModule({
  declarations: [
    AppComponent,
    ProblemComponent,
    SolutionComponent,
    ConsistencyComponent,
    ConfigurationComponent,
    SnippetComponent,
    ValidationDefaultsComponent,
    GettingStartedComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ValdemortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
