import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ValdemortConfig, ValdemortModule } from 'ngx-valdemort';

@Component({
  selector: 'demo-validation-defaults',
  templateUrl: './validation-defaults.component.html',
  styleUrls: ['./validation-defaults.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ValdemortModule, DecimalPipe]
})
export class ValidationDefaultsComponent {
  constructor() {
    const config = inject(ValdemortConfig);
    config.errorsClasses = 'invalid-feedback';
  }
}
