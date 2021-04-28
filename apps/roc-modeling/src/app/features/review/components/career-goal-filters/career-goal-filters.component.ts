import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
} from 'rxjs/operators';

import { OccupationsDataService } from '@state/occupations/occupations-data.service';
import { OccupationsEntity } from '@state/occupations/occupations.models';
import { OccupationsFacade } from '@state/occupations/occupations.facade';
import { InstructionalProgramsEntity } from '@state/instructional-programs/instructional-programs.models';
import { InstructionalProgramsFacade } from '@state/instructional-programs/instructional-programs.facade';
import { IpedsEducationLevelOfferings } from '@state/institutions/institutions.models';
import { MatSelectChange } from '@angular/material/select';
import { InstitutionsFacade } from '@state/institutions/institutions.facade';
import { UserProfile } from '@state/user-profile/user-profile.models';
import { UserProfileFacade } from '@state/user-profile/user-profile.facade';
import { AdvancedSearchForDegreeProgramComponent } from '../advanced-search-for-degree-program/advanced-search-for-degree-program.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'roc-modeling-career-goal-filters',
  templateUrl: './career-goal-filters.component.html',
  styleUrls: ['./career-goal-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareerGoalFiltersComponent implements OnInit {
  @Input() userProfile: UserProfile;
  @Input() selectedGoalOccupation: OccupationsEntity;
  @Input() selectedInstructionalProgram: InstructionalProgramsEntity;
  @Input() instructionalPrograms: InstructionalProgramsEntity[];

  careerGoalForm: FormGroup;
  filteredGoalOnetCodeSearchList$: Observable<OccupationsEntity[]>;

  zipCodeValueChanges$: Observable<string>;
  retirementAgeValueChanges$: Observable<string>;

  ipedsToEmsiEducationLevelMapping =
    IpedsEducationLevelOfferings.ipedsToEmsiEducationLevelMapping;

  constructor(
    private fb: FormBuilder,
    private userProfileFacade: UserProfileFacade,
    private occupationsDataService: OccupationsDataService,
    private occupationsFacade: OccupationsFacade,
    private instructionalProgramsFacade: InstructionalProgramsFacade,
    private institutionsFacade: InstitutionsFacade,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.careerGoalForm = this.fb.group({
      goalStateOccupation: this.selectedGoalOccupation,
      goalStateInstructionalProgram: this.selectedInstructionalProgram,
      goalZipCode: this.userProfile.careerGoal.goalZipCode,
      retirementAge: [
        this.userProfile.careerGoal.retirementAge,
        Validators.required,
      ],
    });

    this.onFormChanges();
  }

  onFormChanges(): void {
    this.filteredGoalOnetCodeSearchList$ = this.careerGoalForm
      .get('goalStateOccupation')
      .valueChanges.pipe(
        debounceTime(200),
        filter(
          (value) =>
            typeof value === 'string' &&
            this.selectedGoalOccupation?.title !== value &&
            value.length > 2
        ),
        distinctUntilChanged(),
        switchMap((searchString: string) => {
          return this.occupationsDataService.occupationSearch(
            searchString.trim()
          );
        })
      );

    this.zipCodeValueChanges$ = this.careerGoalForm
      .get('goalZipCode')
      .valueChanges.pipe(
        debounceTime(200),
        filter(
          (value) =>
            this.userProfile.careerGoal?.goalZipCode !== value &&
            (value.length === 0 || value.length === 5)
        ),
        distinctUntilChanged(),
        tap((zipCode: string) => {
          return this.userProfileFacade.updateCareerGoal({
            ...this.userProfile.careerGoal,
            goalZipCode: +zipCode,
          });
        })
      );

    this.retirementAgeValueChanges$ = this.careerGoalForm
      .get('retirementAge')
      .valueChanges.pipe(
        debounceTime(200),
        filter(
          (value) =>
            this.userProfile?.careerGoal?.retirementAge !== value && value >= 18
        ),
        distinctUntilChanged(),
        tap((retirementAge: string) => {
          return this.userProfileFacade.updateCareerGoal({
            ...this.userProfile.careerGoal,
            retirementAge: +retirementAge,
          });
        })
      );
  }

  onGoalOnetCodeSelected(
    matAutocompleteSelectedEvent: MatAutocompleteSelectedEvent
  ): void {
    const goalOccupation: OccupationsEntity =
      matAutocompleteSelectedEvent.option.value;
    this.occupationsFacade.addOccupation(goalOccupation);
    this.instructionalProgramsFacade.loadInstructionalPrograms(
      goalOccupation.socCode
    );
    if (this.careerGoalForm.valid) {
      this.userProfileFacade.updateCareerGoal({
        ...this.userProfile.careerGoal,
        goalOnetCode: goalOccupation.onetCode,
      });
    }
  }

  onGoalInstructionalProgramSelected(matSelectChange: MatSelectChange): void {
    const instructionProgram: InstructionalProgramsEntity =
      matSelectChange.value;
    this.instructionalProgramsFacade.updateSelectedInstructionalProgram(
      instructionProgram
    );
    this.institutionsFacade.loadInstitutions(instructionProgram.unitIds);
    if (this.careerGoalForm.valid) {
      this.userProfileFacade.updateCareerGoal({
        ...this.userProfile.careerGoal,
        goalCipCode: instructionProgram.cipCode,
        goalDegreeLevel: instructionProgram.degreeLevel,
      });
    }
  }

  displayOccupationFn(occupationsEntity: OccupationsEntity): string {
    return occupationsEntity?.title;
  }

  shorthandNameForEmsiEducationLevel(degreeLevel: number): string {
    switch (degreeLevel) {
      case 1:
        return 'AS';
      case 2:
        return 'BS';
      case 3:
        return 'MS';
      case 4:
        return 'Doctorate';

      default:
        return 'N/A';
    }
  }

  openDialogSearchAllProgram(id): void {
    const dialogRef = this.dialog.open(
      AdvancedSearchForDegreeProgramComponent,
      {
        data: id,
        height: '610px',
        width: '486px',
        autoFocus: false,
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Search All Programs Dialog Close', result);
    });
  }
}
