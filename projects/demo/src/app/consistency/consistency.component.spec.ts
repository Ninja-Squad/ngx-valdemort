import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsistencyComponent } from './consistency.component';

describe('ConsistencyComponent', () => {
  let component: ConsistencyComponent;
  let fixture: ComponentFixture<ConsistencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsistencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsistencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
