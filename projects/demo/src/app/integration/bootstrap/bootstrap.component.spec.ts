import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapComponent } from './bootstrap.component';
import { SnippetComponent } from '../../snippet/snippet.component';

describe('BootstrapComponent', () => {
  let component: BootstrapComponent;
  let fixture: ComponentFixture<BootstrapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BootstrapComponent, SnippetComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
