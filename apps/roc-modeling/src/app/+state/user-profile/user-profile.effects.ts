import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, concatMap, withLatestFrom, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import * as UserProfileActions from './user-profile.actions';
import * as UserProfileSelectors from './user-profile.selectors';
import * as RoiCalculatorOutputsActions from '../roi-calculator-outputs/roi-calculator-outputs.actions';
import * as InstitutionsSelectors from '../institutions/institutions.selectors';
import { IRootState } from '@state/root-store.module';
import { RoiCalculatorOutputQueryVariables } from '@gql';
import { ConvertUserProfileSnaphsotToRoiCalculatorInputs } from './user-profile.models';

@Injectable()
export class UserProfileEffects {
  loadUserProfiles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        UserProfileActions.updateCurrentInformation,
        UserProfileActions.updateCareerGoal,
        UserProfileActions.updateEducationCost,
        UserProfileActions.updateEducationFinancing
      ),
      filter((action) => action.recalculateRoi),
      // get user profile
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.select(UserProfileSelectors.selectUserProfile)
          )
        )
      ),
      // get entities related to ids on user profile for roi calculator
      map(([_, userProfile]) => userProfile),
      concatMap((userProfile) =>
        of(userProfile).pipe(
          withLatestFrom(
            this.store.select(
              InstitutionsSelectors.getInstitutionById(
                userProfile.educationCost.institutionUnitId
              )
            )
          )
        )
      ),
      // translate from user profile to roi calculator inputs
      map(([userProfile, institution]) => {
        const roiCalculatorInputs = ConvertUserProfileSnaphsotToRoiCalculatorInputs(
          userProfile,
          institution
        );
        return RoiCalculatorOutputsActions.loadRoiCalculatorOutput({
          roiCalculatorInputs
        });
      })
    );
  });

  constructor(private actions$: Actions, private store: Store<IRootState>) {}
}
