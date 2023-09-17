import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HotspotComponent } from './hotspot/hotspot.component';
import { NavComponent } from './nav/nav.component';
import { RainComponent } from './rain/rain.component';
import { SatmeteoComponent } from './satmeteo/satmeteo.component';
import { ServiceService } from './service.service';
import { LandsliceComponent } from './landslice/landslice.component';
import { DatePipe } from '@angular/common';
import { DroughtComponent } from './drought/drought.component';
import { ModelComponent } from './model/model.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    FooterComponent,
    HomeComponent,
    HotspotComponent,
    NavComponent,
    RainComponent,
    SatmeteoComponent,
    LandsliceComponent,
    DroughtComponent,
    ModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ServiceService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
