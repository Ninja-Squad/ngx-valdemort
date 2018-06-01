import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxValmesComponent } from './ngx-valmes.component';

describe('NgxValmesComponent', () => {
  let component: NgxValmesComponent;
  let fixture: ComponentFixture<NgxValmesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxValmesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxValmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
