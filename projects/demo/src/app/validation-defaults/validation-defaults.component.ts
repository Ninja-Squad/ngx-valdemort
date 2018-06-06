import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ValdemortConfig } from 'ngx-valdemort';

@Component({
  selector: 'demo-validation-defaults',
  templateUrl: './validation-defaults.component.html',
  styleUrls: ['./validation-defaults.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationDefaultsComponent {

  constructor(config: ValdemortConfig) {
    config.errorsClasses = 'invalid-feedback';
  }
}
