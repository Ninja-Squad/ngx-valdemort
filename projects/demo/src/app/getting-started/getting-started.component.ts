import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GettingStartedComponent {}
