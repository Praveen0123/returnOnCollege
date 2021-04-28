import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  RocChartPlotData,
  RocChartPlotMarker,
  RocChartPopoverData,
  RocLegendData,
  RocPlotsVisibility,
} from '@models/roc';
import { RoiCalculatorOutputsFacade } from '@state/roi-calculator-outputs/roi-calculator-outputs.facade';
import {
  MatDialog,
  MatDialogRef,
  MatDialogState,
} from '@angular/material/dialog';
import { LifetimeEarningsPopoverComponent } from '../lifetime-earnings-popover/lifetime-earnings-popover.component';
import { OccupationsFacade } from '@state/occupations/occupations.facade';
import { OccupationsEntity } from '@state/occupations/occupations.models';
import { RoiCalculatorOutputsEntity } from '@state/roi-calculator-outputs/roi-calculator-outputs.models';

@Component({
  selector: 'roc-modeling-lifetime-earnings',
  templateUrl: './lifetime-earnings.component.html',
  styleUrls: ['./lifetime-earnings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LifetimeEarningsComponent implements OnInit {
  selectedRoiCalculatorOutputChartPlotData$: Observable<RocChartPlotData>;
  selectedRoiCalculatorOutputForLegend$: Observable<RocLegendData>;
  selectedRoiSectionsVisibility$: Observable<RocPlotsVisibility>;
  getRoiCalculatorOutputsLoading$: Observable<boolean>;
  selectRoiCalculatorOutputChartPopoverData$: Observable<RocChartPopoverData>;
  popoverDialogData$: Observable<
    [RocChartPopoverData, OccupationsEntity, OccupationsEntity]
  >;
  selectedRoiCalculatorOutput$: Observable<RoiCalculatorOutputsEntity>;

  selectCurrentStateOccupation$: Observable<OccupationsEntity>;
  selectGoalStateOccupation$: Observable<OccupationsEntity>;

  popoverRef: MatDialogRef<LifetimeEarningsPopoverComponent>;

  constructor(
    private roiCalculatorOutputsFacade: RoiCalculatorOutputsFacade,
    private occupationsFacade: OccupationsFacade,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.selectedRoiCalculatorOutputChartPlotData$ = this.roiCalculatorOutputsFacade.selectedRoiCalculatorOutputChartPlotData$;
    this.selectedRoiSectionsVisibility$ = this.roiCalculatorOutputsFacade.selectedRoiSectionsVisibility$;
    this.getRoiCalculatorOutputsLoading$ = this.roiCalculatorOutputsFacade.getRoiCalculatorOutputsLoading$;
    this.selectedRoiCalculatorOutputForLegend$ = this.roiCalculatorOutputsFacade.selectedRoiCalculatorOutputForLegend$;
    this.selectedRoiCalculatorOutput$ = this.roiCalculatorOutputsFacade.selectedRoiCalculatorOutput$.pipe(
      tap((rocCalculatorOutput) => {
        if (rocCalculatorOutput) {
          this.selectCurrentStateOccupation$ = this.occupationsFacade.getOccupationById$(
            rocCalculatorOutput.roiCalculatorInputs.currentStateOnetCode?.[0]
          );
          this.selectGoalStateOccupation$ = this.occupationsFacade.getOccupationById$(
            rocCalculatorOutput.roiCalculatorInputs.goalStateOnetCode?.[0]
          );
        }
      })
    );
  }

  onChartClick(data: RocChartPlotMarker): void {
    if (this.popoverRef && this.popoverRef.getState() === MatDialogState.OPEN) {
      this.popoverRef.close();
      this.popoverRef = null;
    }
    this.selectRoiCalculatorOutputChartPopoverData$ = this.roiCalculatorOutputsFacade.selectRoiCalculatorOutputChartPopoverData$(
      data
    );

    this.popoverDialogData$ = combineLatest([
      this.selectRoiCalculatorOutputChartPopoverData$,
      this.selectCurrentStateOccupation$,
      this.selectGoalStateOccupation$,
    ]).pipe(
      tap(
        ([
          rocChartPopoverData,
          currentStateOccupation,
          goalStateOccupation,
        ]) => {
          if (!this.popoverRef || !this.popoverRef.componentInstance) {
            this.popoverRef = this.dialog.open(
              LifetimeEarningsPopoverComponent,
              {
                data: {
                  rocChartPopoverData,
                  currentStateOccupation,
                  goalStateOccupation,
                },
                panelClass: 'full-bleed-mat-dialog',
                autoFocus: false,
                hasBackdrop: false,
                position: {
                  top: data.mouseEvent.clientY + 'px',
                  left: data.mouseEvent.clientX + 'px',
                },
              }
            );
          } else {
            this.popoverRef.componentInstance.data = {
              rocChartPopoverData,
              currentStateOccupation,
              goalStateOccupation,
            };
          }
        }
      )
    );
  }
}
