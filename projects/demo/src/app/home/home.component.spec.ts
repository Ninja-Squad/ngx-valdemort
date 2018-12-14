import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ProblemComponent } from '../problem/problem.component';
import { SolutionComponent } from '../solution/solution.component';
import { ConsistencyComponent } from '../consistency/consistency.component';
import { ConfigurationComponent } from '../configuration/configuration.component';
import { SnippetComponent } from '../snippet/snippet.component';
import { GettingStartedComponent } from '../getting-started/getting-started.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValdemortModule } from '../../../../ngx-valdemort/src/lib/valdemort.module';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        ProblemComponent,
        SolutionComponent,
        ConsistencyComponent,
        ConfigurationComponent,
        GettingStartedComponent,
        SnippetComponent
      ],
      imports: [
        ReactiveFormsModule,
        ValdemortModule,
        NgbTabsetModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
