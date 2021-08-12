import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'demo-ng-model',
  templateUrl: './ng-model.component.html',
  styleUrls: ['./ng-model.component.scss']
})
export class NgModelComponent {
  ngModelSnippet = 'ng-model.snippet.html';
  user = {
    email: ''
  };

  submit(): void {}

  reset(f: NgForm): void {
    f.resetForm({ email: '' });
  }
}
