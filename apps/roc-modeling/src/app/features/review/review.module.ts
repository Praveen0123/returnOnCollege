import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { ReviewRoutingModule } from './review-routing.module';
import { ReviewComponent } from './containers/review/review.component';
import { FilterGroupContainerComponent } from './components/filter-group-container/filter-group-container.component';
import { CurrentInformationFiltersComponent } from './components/current-information-filters/current-information-filters.component';
import { CareerGoalFiltersComponent } from './components/career-goal-filters/career-goal-filters.component';
import { EducationCostFiltersComponent } from './components/education-cost-filters/education-cost-filters.component';
import { RefineEducationCostComponent } from './components/refine-education-cost/refine-education-cost.component';
import { AdvancedSearchForDegreeProgramComponent } from './components/advanced-search-for-degree-program/advanced-search-for-degree-program.component';
import { SchoolFinderComponent } from './components/school-finder/school-finder.component';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { far } from '@fortawesome/pro-regular-svg-icons';

@NgModule({
  declarations: [
    ReviewComponent,
    FilterGroupContainerComponent,
    CurrentInformationFiltersComponent,
    CareerGoalFiltersComponent,
    EducationCostFiltersComponent,
    RefineEducationCostComponent,
    AdvancedSearchForDegreeProgramComponent,
    SchoolFinderComponent,
  ],
  imports: [CommonModule, ReviewRoutingModule, SharedModule],
  exports: [ReviewComponent],
  entryComponents: [
    RefineEducationCostComponent,
    AdvancedSearchForDegreeProgramComponent,
    SchoolFinderComponent,
  ],
})
export class ReviewModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
