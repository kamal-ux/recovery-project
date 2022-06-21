
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import {MatIconModule} from '@angular/material/icon';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { AgmCoreModule } from '@agm/core';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {firebase, firebaseui, FirebaseUIModule, FirebaseuiAngularLibraryService} from 'firebaseui-angular';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule, USE_EMULATOR as USE_AUTH_EMULATOR} from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgxFileDropModule } from 'ngx-file-drop';

const firebaseUiAuthConfig: firebaseui.auth.Config = {

};

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    NgxFileDropModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    SignInComponent,
    SignInComponent,

  ],
  providers: [
    { provide: USE_AUTH_EMULATOR, useValue: !environment.production ? ['localhost', 9099] : undefined },
{
  provide: 'appConfig',
  useValue: { googleAuthEnabled: true, emailAuthEnabled: true, facebookAuthEnabled: true, PhoneAuthEnabled: true, AnonymousAuthEnabled: true }
},
{
    provide: 'firebaseUIAuthConfig',
    useFactory: (config) => {

      // build firebase UI config object using settings from `config`

      const fbUiConfig: firebaseui.auth.Config = {
        // signInSuccessUrl: 'https://www.google.com',
        signInFlow: 'popup',
        signInOptions: [
        ],
        tosUrl: '<your-tos-link>',
         privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
        credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
      };

      if (config.googleAuthEnabled) {
        fbUiConfig.signInOptions.push({
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          requireDisplayName: true,
          buttonColor: '#fbbc07'
        });
      }
      return fbUiConfig;
    },
    deps: ['appConfig']
  }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
