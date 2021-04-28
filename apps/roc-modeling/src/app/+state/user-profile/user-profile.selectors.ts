import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUserProfile from './user-profile.reducer';
import * as fromInstitutions from '../institutions/institutions.reducer';
import * as fromInstructionalProgram from '../instructional-programs/instructional-programs.reducer';
import * as fromOccupations from '../occupations/occupations.reducer';
import { State } from './user-profile.reducer';
import { UserProfileSnapshot } from './user-profile.models';

export const selectUserProfileState = createFeatureSelector<
  fromUserProfile.State
>(fromUserProfile.USER_PROFILE_FEATURE_KEY);

export const selectInstitutionsState = createFeatureSelector<
  fromInstitutions.State
>(fromInstitutions.INSTITUTIONS_FEATURE_KEY);

export const selectInstructionalProgramsState = createFeatureSelector<
  fromInstructionalProgram.State
>(fromInstructionalProgram.INSTRUCTIONAL_PROGRAMS_FEATURE_KEY);

export const selectOccupationsState = createFeatureSelector<
  fromOccupations.State
>(fromOccupations.OCCUPATIONS_FEATURE_KEY);

export const selectUserProfile = createSelector(
  selectUserProfileState,
  (state: State) => state.userProfile
);

export const selectCurrentOccupation = createSelector(
  selectUserProfileState,
  selectOccupationsState,
  (state: State, occupationsState: fromOccupations.State) => {
    return occupationsState.entities[
      state.userProfile?.currentInformation?.currentOnetCode
    ];
  }
);

export const selectGoalOccupation = createSelector(
  selectUserProfileState,
  selectOccupationsState,
  (state: State, occupationsState: fromOccupations.State) =>
    occupationsState.entities[state.userProfile?.careerGoal?.goalOnetCode]
);

export const selectGoalInstructionalProgram = createSelector(
  selectUserProfileState,
  selectInstructionalProgramsState,
  (state: State, instructionalProgramsState: fromInstructionalProgram.State) =>
    instructionalProgramsState.entities[
      state.userProfile?.careerGoal?.goalCipCode +
        '_' +
        state.userProfile?.careerGoal?.goalDegreeLevel
    ]
);

export const selectInstitution = createSelector(
  selectUserProfileState,
  selectInstitutionsState,
  (state: State, institutionsState: fromInstitutions.State) =>
    institutionsState.entities[
      state.userProfile?.educationCost?.institutionUnitId
    ]
);
