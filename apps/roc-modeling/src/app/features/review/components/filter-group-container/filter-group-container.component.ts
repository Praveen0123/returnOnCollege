import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'roc-modeling-filter-group-container',
  templateUrl: './filter-group-container.component.html',
  styleUrls: ['./filter-group-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterGroupContainerComponent implements OnInit {
  @Input() name: string;
  @Input() stepNumber: number;
  @Input() column = false;

  constructor() {}

  ngOnInit(): void {}
}
