import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsComponent } from './pages/details/details.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { GroupDetailsComponent } from './pages/group-details/group-details.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MomentModule } from 'ngx-moment';
import { HomeComponent } from './pages/home/home.component';
import { JwtInterceptor, JwtModule } from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    GroupDetailsComponent,
    DashboardComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HighchartsChartModule,
    MomentModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['localhost:8000'],
        disallowedRoutes: ['http://localhost:4200/'],
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
