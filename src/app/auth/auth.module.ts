import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {MaterialModule} from "../shared/material.module";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {FlexLayoutModule} from "@angular/flex-layout";



@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        MaterialModule,
        provideAuth(() => getAuth()),
        FlexLayoutModule,
    ]
})
export class AuthModule { }
