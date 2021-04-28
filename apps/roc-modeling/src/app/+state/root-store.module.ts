import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoiCalculatorOutputsStateModule } from './roi-calculator-outputs/roi-calculator-outputs-state.module';
import { ActionReducer, ActionReducerMap, StoreModule } from '@ngrx/store';
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storageSync } from '@larscom/ngrx-store-storagesync';
import {
  routerReducer,
  RouterReducerState,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';

import * as fromRoiCalculatorOutputs from './roi-calculator-outputs/roi-calculator-outputs.reducer';
import * as fromOccupations from './occupations/occupations.reducer';
import * as fromInstructionalPrograms from './instructional-programs/instructional-programs.reducer';
import * as fromInstitutions from './institutions/institutions.reducer';
import * as fromUserProfile from './user-profile/user-profile.reducer';
import { OccupationsStateModule } from './occupations/occupations-state.module';
import { InstructionalProgramsStateModule } from './instructional-programs/instructional-programs-state.module';
import { InstitutionsStateModule } from './institutions/institutions-state.module';
import { UserProfileStateModule } from './user-profile/user-profile-state.module';

// Root State - extend all partial states
export interface IRootState
  extends fromRoiCalculatorOutputs.RoiCalculatorOutputsPartialState,
    fromOccupations.OccupationsPartialState,
    fromInstructionalPrograms.InstructionalProgramsPartialState,
    fromInstitutions.InstitutionsPartialState,
    fromUserProfile.UserProfilePartialState {
  router: RouterReducerState;
}

// Map root state's properties (partial states) to their reducers
export const reducers: ActionReducerMap<IRootState> = {
  router: routerReducer,
  [fromRoiCalculatorOutputs.ROI_CALCULATOR_OUTPUTS_FEATURE_KEY]:
    fromRoiCalculatorOutputs.reducer,
  [fromOccupations.OCCUPATIONS_FEATURE_KEY]: fromOccupations.reducer,
  [fromInstructionalPrograms.INSTRUCTIONAL_PROGRAMS_FEATURE_KEY]:
    fromInstructionalPrograms.reducer,
  [fromInstitutions.INSTITUTIONS_FEATURE_KEY]: fromInstitutions.reducer,
  [fromUserProfile.USER_PROFILE_FEATURE_KEY]: fromUserProfile.reducer,
};

// Create a store meta reducer to allow caching in browser
export function storageSyncReducer(reducer: ActionReducer<IRootState>): any {
  // provide all feature states within the features array
  // features which are not provided, do not get synced
  const metaReducer = storageSync<
    fromRoiCalculatorOutputs.RoiCalculatorOutputsPartialState
  >({
    features: [
      // save only router state to sessionStorage
      { stateKey: 'router', storageForFeature: window.sessionStorage },
      { stateKey: fromRoiCalculatorOutputs.ROI_CALCULATOR_OUTPUTS_FEATURE_KEY },
      { stateKey: fromOccupations.OCCUPATIONS_FEATURE_KEY },
      {
        stateKey: fromInstructionalPrograms.INSTRUCTIONAL_PROGRAMS_FEATURE_KEY,
      },
      { stateKey: fromInstitutions.INSTITUTIONS_FEATURE_KEY },
      { stateKey: fromUserProfile.USER_PROFILE_FEATURE_KEY },
      // exclude key 'success' inside 'auth' and all keys 'loading' inside 'feature1'
      { stateKey: 'feature1', excludeKeys: ['auth.success', 'loading'] },
    ],
    storage: window.sessionStorage,
  });

  return metaReducer(reducer);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, {
      metaReducers: !environment.production
        ? [storageSyncReducer]
        : [storageSyncReducer],
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
      },
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  exports: [
    RoiCalculatorOutputsStateModule,
    OccupationsStateModule,
    InstructionalProgramsStateModule,
    InstitutionsStateModule,
    UserProfileStateModule,
  ],
})
export class RootStoreModule {}
