import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RainComponent } from './rain/rain.component';
import { HotspotComponent } from './hotspot/hotspot.component';
import { AboutComponent } from './about/about.component';
import { SatmeteoComponent } from './satmeteo/satmeteo.component';
import { LandsliceComponent } from './landslice/landslice.component';
import { DroughtComponent } from './drought/drought.component';
import { ModelComponent } from './model/model.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'landslide', component: LandsliceComponent },
  { path: 'rain', component: RainComponent },
  { path: 'satmeteo', component: SatmeteoComponent },
  { path: 'hotspot', component: HotspotComponent },
  { path: 'drought', component: DroughtComponent },
  { path: 'about', component: AboutComponent },
  { path: 'model', component: ModelComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
