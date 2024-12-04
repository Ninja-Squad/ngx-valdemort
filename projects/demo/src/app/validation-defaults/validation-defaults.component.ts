import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ValdemortConfig, ValdemortModule } from 'ngx-valdemort';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'demo-validation-defaults',
  templateUrl: './validation-defaults.component.html',
  styleUrls: ['./validation-defaults.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ValdemortModule, DecimalPipe]
})
export class ValidationDefaultsComponent {
  constructor(config: ValdemortConfig) {
    config.errorsClasses = 'invalid-feedback';
  }
}
