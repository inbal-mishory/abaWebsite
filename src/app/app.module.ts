import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AngularFireModule, FIREBASE_OPTIONS} from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./shared/material.module";
import { AuthService} from "./services/auth.service";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { getStorage, provideStorage } from "@angular/fire/storage";
import { FlexLayoutModule } from "@angular/flex-layout";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NavigationComponent } from './components/navigation/navigation.component';
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import localHe from '@angular/common/locales/he';
import {registerLocaleData} from "@angular/common";
import { AboutComponent } from './components/about/about.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
registerLocaleData(localHe);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AngularFireStorageModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    Ng2SearchPipeModule,
    MatSidenavModule,
    MatToolbarModule,
    StoreRouterConnectingModule
  ],
  providers: [AuthService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    { provide: LOCALE_ID, useValue: 'he-IL'},
    MatSidenavModule
  ],
  exports: [FlexLayoutModule, Ng2SearchPipeModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
