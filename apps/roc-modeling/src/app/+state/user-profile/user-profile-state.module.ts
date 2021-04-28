import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromUserProfile from './user-profile.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserProfileEffects } from './user-profile.effects';
import { UserProfileFacade } from './user-profile.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromUserProfile.USER_PROFILE_FEATURE_KEY,
      fromUserProfile.reducer
    ),
    EffectsModule.forFeature([UserProfileEffects])
  ],
  providers: [UserProfileFacade]
})
export class UserProfileStateModule {}
