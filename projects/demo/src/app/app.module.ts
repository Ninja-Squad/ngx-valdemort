import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ROUTES } from './app.routes';
import { MaterialComponent } from './integration/material/material.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModelComponent } from './ng-model/ng-model.component';

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
    MaterialComponent,
    NgModelComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(ROUTES, {
      useHash: true
    }),
    NgbDropdownModule,
    NgbNavModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ValdemortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
