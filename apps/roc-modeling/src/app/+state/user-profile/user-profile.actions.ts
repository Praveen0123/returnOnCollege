import { createAction, props } from '@ngrx/store';
import {
  CareerGoal,
  CurrentInformation,
  EducationCost,
  EducationFinancing
} from './user-profile.models';

export const updateCurrentInformation = createAction(
  '[UserProfile] Update Current Information',
  props<{ currentInformation: CurrentInformation; recalculateRoi: boolean }>()
);

export const updateCareerGoal = createAction(
  '[UserProfile] Update Career Goal',
  props<{ careerGoal: CareerGoal; recalculateRoi: boolean }>()
);

export const updateEducationCost = createAction(
  '[UserProfile] Update Education Cost',
  props<{ educationCost: EducationCost; recalculateRoi: boolean }>()
);

export const updateEducationFinancing = createAction(
  '[UserProfile] Update Education Financing',
  props<{ educationFinancing: EducationFinancing; recalculateRoi: boolean }>()
);

export const takeUserProfileSnapshot = createAction(
  '[UserProfile] Take User Profile Snapshot'
);
