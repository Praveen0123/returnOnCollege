import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import {
  RocChartPlotData,
  RocLegendData,
  RocPlotsVisibility,
} from '@models/roc';
import { UserProfile } from '@state/user-profile/user-profile.models';
import { UserProfileFacade } from '@state/user-profile/user-profile.facade';
import { RoiCalculatorOutputsFacade } from '@state/roi-calculator-outputs/roi-calculator-outputs.facade';
import { OccupationsEntity } from '@state/occupations/occupations.models';
import { InstructionalProgramsEntity } from '@state/instructional-programs/instructional-programs.models';
import { InstructionalProgramsFacade } from '@state/instructional-programs/instructional-programs.facade';
import { InstitutionsEntity } from '@state/institutions/institutions.models';
import { InstitutionsFacade } from '@state/institutions/institutions.facade';

@Component({
  selector: 'roc-modeling-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewComponent implements OnInit {
  userProfile$: Observable<UserProfile>;

  selectedRoiCalculatorOutputChartPlotData$: Observable<RocChartPlotData>;
  selectedRoiCalculatorOutputForLegend$: Observable<RocLegendData>;
  selectedRoiSectionsVisibility$: Observable<RocPlotsVisibility>;
  getRoiCalculatorOutputsLoading$: Observable<boolean>;

  selectedCurrentOccupation$: Observable<OccupationsEntity>;
  selectedGoalOccupation$: Observable<OccupationsEntity>;

  selectedInstructionalProgram$: Observable<InstructionalProgramsEntity>;
  instructionalPrograms$: Observable<InstructionalProgramsEntity[]>;

  selectedInstitution$: Observable<InstitutionsEntity>;
  institutions$: Observable<InstitutionsEntity[]>;

  constructor(
    private userProfileFacade: UserProfileFacade,
    private roiCalculatorOutputsFacade: RoiCalculatorOutputsFacade,
    private instructionalProgramsFacade: InstructionalProgramsFacade,
    private institutionsFacade: InstitutionsFacade
  ) {}

  ngOnInit(): void {
    this.userProfile$ = this.userProfileFacade.selectUserProfile$;
    this.selectedRoiCalculatorOutputChartPlotData$ = this.roiCalculatorOutputsFacade.selectedRoiCalculatorOutputChartPlotData$;
    this.selectedRoiCalculatorOutputForLegend$ = this.roiCalculatorOutputsFacade.selectedRoiCalculatorOutputForLegend$;
    this.selectedRoiSectionsVisibility$ = this.roiCalculatorOutputsFacade.selectedRoiSectionsVisibility$;
    this.getRoiCalculatorOutputsLoading$ = this.roiCalculatorOutputsFacade.getRoiCalculatorOutputsLoading$;

    this.selectedCurrentOccupation$ = this.userProfileFacade.selectCurrentOccupation$;
    this.selectedGoalOccupation$ = this.userProfileFacade.selectGoalOccupation$;

    this.selectedInstructionalProgram$ = this.userProfileFacade.selectGoalInstructionalProgram$;
    this.instructionalPrograms$ = this.instructionalProgramsFacade.allInstructionalPrograms$;

    this.selectedInstitution$ = this.userProfileFacade.selectInstitution$;
    this.institutions$ = this.institutionsFacade.allInstitutions$;
  }
}
