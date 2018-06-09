import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.scss']
})
export class BootstrapComponent {

  cssSnippet = `.invalid-feedback {
  display: block;
}`;

  appSnippet = `import { ValdemortConfig } from 'ngx-valdemort';

[...]

export class AppComponent {
  constructor(valdemortConfig: ValdemortConfig) {
    valdemortConfig.errorsClasses = 'invalid-feedback';
  }
}
`;

  form = `<div class="form-group">
  <label>Email</label>
  <input formControlName="email" class="form-control" type="email"/>
  <val-errors controlName="email" label="The email"></val-errors>
</div>`;
}
