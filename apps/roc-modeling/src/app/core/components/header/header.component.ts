import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'roc-modeling-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
