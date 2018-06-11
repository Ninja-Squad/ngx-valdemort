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
import { BootstrapComponent } from './integration/bootstrap/bootstrap.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgbDropdownModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { ROUTES } from './app.routes';
import { MaterialComponent } from './integration/material/material.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ProblemComponent,
    SolutionComponent,
    ConsistencyComponent,
    ConfigurationComponent,
    SnippetComponent,
    ValidationDefaultsComponent,
    GettingStartedComponent,
    BootstrapComponent,
    HomeComponent,
    MaterialComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, {
      useHash: true
    }),
    NgbDropdownModule.forRoot(),
    NgbTabsetModule.forRoot(),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ValdemortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
