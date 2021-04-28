import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
} from 'rxjs/operators';

import { RoiCalculatorOutputQueryVariables } from '@gql';
import { RoiCalculatorOutputsFacade } from '@state/roi-calculator-outputs/roi-calculator-outputs.facade';

import { OccupationsDataService } from '@state/occupations/occupations-data.service';
import { OccupationsEntity } from '@state/occupations/occupations.models';
import { OccupationsFacade } from '@state/occupations/occupations.facade';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { UserProfile } from '@state/user-profile/user-profile.models';
import { UserProfileFacade } from '@state/user-profile/user-profile.facade';

@Component({
  selector: 'roc-modeling-current-information-filters',
  templateUrl: './current-information-filters.component.html',
  styleUrls: ['./current-information-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentInformationFiltersComponent implements OnInit {
  @Input() userProfile: UserProfile;
  @Input() selectedCurrentOccupation: OccupationsEntity;

  currentInformationForm: FormGroup;
  filteredCurrentOnetCodeSearchList$: Observable<OccupationsEntity[]>;

  constructor(
    private fb: FormBuilder,
    private userProfileFacade: UserProfileFacade,
    private occupationsDataService: OccupationsDataService,
    private occupationsFacade: OccupationsFacade
  ) {}

  ngOnInit(): void {
    this.currentInformationForm = this.fb.group({
      currentAge: [
        this.userProfile.currentInformation.currentAge,
        Validators.required,
      ],
      currentStateOccupation: this.selectedCurrentOccupation,
      notWorking: [
        this.selectedCurrentOccupation &&
        this.selectedCurrentOccupation.onetCode.length
          ? false
          : true,
      ],
      startDegreeLevel: [
        this.userProfile.currentInformation.currentDegreeLevel,
        Validators.required,
      ],
      currentZipCode: [
        this.userProfile.currentInformation.currentZipCode,
        Validators.required,
      ],
    });

    this.onFormChanges();
  }

  onFormChanges(): void {
    this.filteredCurrentOnetCodeSearchList$ = this.currentInformationForm
      .get('currentStateOccupation')
      .valueChanges.pipe(
        debounceTime(200),
        filter(
          (value) =>
            typeof value === 'string' &&
            this.selectedCurrentOccupation?.title !== value &&
            value.length > 2
        ),
        distinctUntilChanged(),
        switchMap((searchString: string) => {
          return this.occupationsDataService.occupationSearch(
            searchString.trim()
          );
        })
      );
  }

  onCurrentOnetCodeSelected(
    matAutocompleteSelectedEvent: MatAutocompleteSelectedEvent
  ): void {
    const currentOccupation: OccupationsEntity =
      matAutocompleteSelectedEvent.option.value;
    this.occupationsFacade.addOccupation(currentOccupation);
    this.userProfileFacade.updateCurrentInformation(
      {
        ...this.userProfile.currentInformation,
        currentOnetCode: currentOccupation.onetCode,
      },
      false
    );
    this.currentInformationForm.get('notWorking').setValue(false);
  }

  displayOccupationFn(occupationsEntity: OccupationsEntity): string {
    return occupationsEntity?.title;
  }

  onSubmit(): void {
    if (this.currentInformationForm.valid) {
      this.userProfileFacade.updateCurrentInformation({
        ...this.userProfile.currentInformation,
        currentAge: +this.currentInformationForm.value.currentAge,
        currentOnetCode: this.currentInformationForm.value.notWorking
          ? null
          : this.selectedCurrentOccupation.onetCode,
        currentDegreeLevel: this.currentInformationForm.value.startDegreeLevel,
        currentZipCode: +this.currentInformationForm.value.currentZipCode,
      });
    }
  }
}
