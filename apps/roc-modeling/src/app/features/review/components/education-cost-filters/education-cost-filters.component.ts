import { identifierModuleUrl } from '@angular/compiler';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

import { InstitutionsEntity } from '@state/institutions/institutions.models';
import { UserProfileFacade } from '@state/user-profile/user-profile.facade';
import { UserProfile } from '@state/user-profile/user-profile.models';
import { RefineEducationCostComponent } from '../refine-education-cost/refine-education-cost.component';
import { SchoolFinderComponent } from '../school-finder/school-finder.component';

@Component({
  selector: 'roc-modeling-education-cost-filters',
  templateUrl: './education-cost-filters.component.html',
  styleUrls: ['./education-cost-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationCostFiltersComponent implements OnInit {
  @Input() userProfile: UserProfile;

  @Input() selectedInstitution: InstitutionsEntity;
  @Input() institutions: InstitutionsEntity[];

  careerGoalForm: FormGroup;

  zipCodeValueChanges$: Observable<string>;
  retirementAgeValueChanges$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private userProfileFacade: UserProfileFacade,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.careerGoalForm = this.fb.group({
      goalStateInstitution: this.selectedInstitution,
      startYear: new Date().getFullYear(),
      dependencyStatus: [0],
      annualHouseholdBracket: 1,
    });
  }

  onGoalInstitutionSelected(matSelectChange: MatSelectChange): void {
    const institution: InstitutionsEntity = matSelectChange.value;
    if (this.careerGoalForm.valid) {
      this.userProfileFacade.updateEducationCost({
        ...this.userProfile.educationCost,
        institutionUnitId: institution.unitId,
      });
    }
  }
  openDialogREC(id): void {
    const dialogRef = this.dialog.open(RefineEducationCostComponent, {
      data: id,
      height: '610px',
      width: '486px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openDialogSchoolFind(id): void {
    const dialogRef = this.dialog.open(SchoolFinderComponent, {
      data: id,
      height: '600px',
      width: '800px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('School finder Dialog Close', result);
    });
  }

  onAnnualHouseholdIncomeSelected(matSelectChange: MatSelectChange): void {}
}
