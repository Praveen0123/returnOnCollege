import { createReducer, on } from '@ngrx/store';
import * as UserProfileActions from './user-profile.actions';
import {
  deepEqual,
  IncomeRangeEnum,
  InstitutionCampusResidencyEnum,
  InstitutionStateResidencyEnum,
  UserProfile,
  UserProfileSnapshot
} from './user-profile.models';

export const USER_PROFILE_FEATURE_KEY = 'userProfile';

export interface State {
  userProfile: UserProfile;
  error: any;
}

export interface UserProfilePartialState {
  readonly [USER_PROFILE_FEATURE_KEY]: State;
}

export const initialState: State = {
  userProfile: {
    currentInformation: {
      currentAge: 18,
      currentOnetCode: null,
      isNotCurrentlyWorking: true,
      currentDegreeLevel: 0,
      currentZipCode: null,
      radiusInMiles: 20
    },
    careerGoal: {
      goalOnetCode: null,
      goalCipCode: null,
      goalDegreeLevel: 0,
      yearsToCompleteDegree: 0,
      isGoalDegreeUndecided: false,
      goalZipCode: null,
      retirementAge: 68
    },
    educationCost: {
      institutionUnitId: null,
      institutionStartYear: new Date().getFullYear(),
      isTaxDependent: true,
      incomeRange: IncomeRangeEnum.From_0_To_30000,
      institutionStateResidency: InstitutionStateResidencyEnum.OutState,
      anyScholarships: false,
      scholarshipAmount: null,
      hasPost911GiBill: false,
      dodTuitionAssistance: false,
      eligibleForPellGrants: false,
      institutionCampusResidency: InstitutionCampusResidencyEnum.OnCampus
    },
    educationFinancing: {
      outOfPocketCosts: [0],
      yearsToPayOffFederalLoan: 10,
      yearsToPayOffPrivateLoan: 8
    },
    userProfileSnapshots: []
  },
  error: null
};

export const reducer = createReducer(
  initialState,

  on(
    UserProfileActions.updateCurrentInformation,
    (state, { currentInformation }) => {
      return {
        ...state,
        userProfile: { ...state.userProfile, currentInformation }
      };
    }
  ),
  on(UserProfileActions.updateCareerGoal, (state, { careerGoal }) => {
    return {
      ...state,
      userProfile: { ...state.userProfile, careerGoal }
    };
  }),
  on(UserProfileActions.updateEducationCost, (state, { educationCost }) => {
    return {
      ...state,
      userProfile: { ...state.userProfile, educationCost }
    };
  }),
  on(
    UserProfileActions.updateEducationFinancing,
    (state, { educationFinancing }) => {
      return {
        ...state,
        userProfile: { ...state.userProfile, educationFinancing }
      };
    }
  ),
  on(UserProfileActions.takeUserProfileSnapshot, (state) => {
    const newUserProfileSnapshot: UserProfileSnapshot = {
      ...state.userProfile
    };
    if (
      !state.userProfile.userProfileSnapshots.some((x) =>
        deepEqual(x, newUserProfileSnapshot)
      )
    ) {
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          userProfileSnapshots: [
            ...state.userProfile.userProfileSnapshots,
            newUserProfileSnapshot
          ]
        }
      };
    }
    return state;
  })
);
