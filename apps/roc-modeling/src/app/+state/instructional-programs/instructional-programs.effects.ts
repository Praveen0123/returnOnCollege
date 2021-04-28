import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { InstructionalProgramsDataService } from './instructional-programs-data.service';

import * as InstructionalProgramsActions from './instructional-programs.actions';

@Injectable()
export class InstructionalProgramsEffects {
  loadInstructionalPrograms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InstructionalProgramsActions.loadInstructionalPrograms),
      switchMap(({ socCode }) => {
        return this.instructionalProgramsDataService
          .instructionalPrograms(socCode)
          .pipe(
            map((instructionalPrograms) => {
              return InstructionalProgramsActions.loadInstructionalProgramsSuccess(
                { instructionalPrograms }
              );
            })
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private instructionalProgramsDataService: InstructionalProgramsDataService
  ) {}
}
