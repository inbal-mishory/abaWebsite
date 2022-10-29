import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule, FIREBASE_OPTIONS} from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./shared/material.module";
import {AuthService} from "./services/auth.service";
import {CatalogsListComponent} from "./components/catalogs-list/catalogs-list.component";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ConfirmModalComponent} from "./shared/modals/confirm.modal/confirm.modal.component";
import { CritiqueListComponent } from './components/critique/critique-list.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {MomentDateModule} from "@angular/material-moment-adapter";
import { NavigationComponent } from './components/navigation/navigation.component';
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import { ArticlesComponent } from './components/articles/articles.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CatalogsListComponent,
    ConfirmModalComponent,
    CritiqueListComponent,
    NavigationComponent,
    ArticlesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AngularFireStorageModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    Ng2SearchPipeModule,
    MomentDateModule
  ],
  providers: [AuthService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    { provide: LOCALE_ID, useValue: 'he-IL'}
  ],
  exports: [FlexLayoutModule, Ng2SearchPipeModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
