import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@core/core.module';
import { RootStoreModule } from '@state/root-store.module';
import { SharedModule } from '@shared/shared.module';
import { ReviewModule } from '@features/review/review.module';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { fas } from '../../../../node_modules/@fontawsome/pro-light-svg-icons';
// import { fad } from '@fortawesome/pro-solid-svg-icons';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    GraphQLModule,
    FontAwesomeModule,
    AppRoutingModule,
    CoreModule,
    RootStoreModule,
    SharedModule,

    ReviewModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
