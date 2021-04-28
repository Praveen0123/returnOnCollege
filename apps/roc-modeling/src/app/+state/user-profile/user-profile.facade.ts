import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromUserProfile from './user-profile.reducer';
import * as UserProfileSelectors from './user-profile.selectors';
import * as UserProfileActions from './user-profile.actions';
import {
  CareerGoal,
  CurrentInformation,
  EducationCost,
  EducationFinancing
} from './user-profile.models';

@Injectable()
export class UserProfileFacade {
  readonly selectUserProfile$ = this.store.pipe(
    select(UserProfileSelectors.selectUserProfile)
  );

  readonly selectCurrentOccupation$ = this.store.pipe(
    select(UserProfileSelectors.selectCurrentOccupation)
  );

  readonly selectGoalOccupation$ = this.store.pipe(
    select(UserProfileSelectors.selectGoalOccupation)
  );

  readonly selectGoalInstructionalProgram$ = this.store.pipe(
    select(UserProfileSelectors.selectGoalInstructionalProgram)
  );

  readonly selectInstitution$ = this.store.pipe(
    select(UserProfileSelectors.selectInstitution)
  );

  constructor(private store: Store<fromUserProfile.UserProfilePartialState>) {}

  updateCurrentInformation(
    currentInformation: CurrentInformation,
    recalculateRoi: boolean = true
  ): void {
    this.dispatch(
      UserProfileActions.updateCurrentInformation({
        currentInformation,
        recalculateRoi
      })
    );
  }

  updateCareerGoal(
    careerGoal: CareerGoal,
    recalculateRoi: boolean = true
  ): void {
    this.dispatch(
      UserProfileActions.updateCareerGoal({ careerGoal, recalculateRoi })
    );
  }

  updateEducationCost(
    educationCost: EducationCost,
    recalculateRoi: boolean = true
  ): void {
    this.dispatch(
      UserProfileActions.updateEducationCost({ educationCost, recalculateRoi })
    );
  }

  updateEducationFinancing(
    educationFinancing: EducationFinancing,
    recalculateRoi: boolean = true
  ): void {
    this.dispatch(
      UserProfileActions.updateEducationFinancing({
        educationFinancing,
        recalculateRoi
      })
    );
  }

  takeUserProfileSnapshot(): void {
    this.dispatch(UserProfileActions.takeUserProfileSnapshot());
  }

  private dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
