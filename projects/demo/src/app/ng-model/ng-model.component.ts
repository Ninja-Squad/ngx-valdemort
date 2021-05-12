import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'demo-ng-model',
  templateUrl: './ng-model.component.html',
  styleUrls: ['./ng-model.component.scss']
})
export class NgModelComponent {
  ngModelSnippet = require('!raw-loader!./ng-model.snippet.html').default;
  user = {
    email: ''
  };

  submit(): void {}

  reset(f: NgForm): void {
    f.resetForm({ email: '' });
  }
}
