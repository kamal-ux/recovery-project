import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure, FirebaseuiAngularLibraryService } from 'firebaseui-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public isLoggedIn: boolean = false;

  constructor( public afAuth: AngularFireAuth, private router: Router,
               public firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService)
                   {
                       firebaseuiAngularLibraryService.firebaseUiInstance.disableAutoSignIn();
              }

  ngOnInit(): void {
    // this.firebaseuiAngularLibraryService.firebaseUiInstance.disableAutoSignIn();
    // this.afAuth.authState.subscribe(this.firebaseAuthChangeListener);
    if (localStorage.getItem('token')) {
      this.router.navigate(['uploader']);
    }
  }

  private firebaseAuthChangeListener(response) {
    // if needed, do a redirect in here
    if (response) {
      this.isLoggedIn = true;
      this.router.navigate(['uploader']);
      console.log('Logged in :)');
      console.log('already sign-in reponse', response);
    } else {
      console.log('already logged out reponse', response);
      console.log('Logged out :(');
      this.isLoggedIn = false;
    }
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    // ...
    if (signInSuccessData) {
    const user = signInSuccessData.authResult.additionalUserInfo.profile;
      console.log('user data', user);
        //  // User is signed in.
        //  var displayName = user.name;
        //  var email = user.email;
        //  var emailVerified = user.emailVerified;
        //  var photoURL = user.photoURL;
        //  var uid = user.uid;
        //  var phoneNumber = user.phoneNumber;
        //  var providerData = user.providerData;
        //  user.getIdToken().then(function(accessToken) {
        //    document.getElementById('sign-in-status').textContent = 'Signed in';
        //    document.getElementById('sign-in').textContent = 'Sign out';
        //    document.getElementById('account-details').textContent = JSON.stringify({
        //      displayName: displayName,
        //      email: email,
        //      emailVerified: emailVerified,
        //      phoneNumber: phoneNumber,
        //      photoURL: photoURL,
        //      uid: uid,
        //      accessToken: accessToken,
        //      providerData: providerData
        //    }, null, '  ');
        //  });

      localStorage.setItem('token', JSON.stringify(signInSuccessData));
      this.router.navigate(['uploader']);
      console.log('sign-in success response', signInSuccessData);
      this.isLoggedIn = true;
    }
}

errorCallback(errorData: FirebaseUISignInFailure) {
    if (errorData) {
      console.log('sign-in error response', errorData);
      this.isLoggedIn = false;
    }
}

uiShownCallback() {
    // alert('not logged in');
    if (this.isLoggedIn) {
      this.router.navigate(['uploader']);
    }
}

loggedOut () {
  this.afAuth.signOut();
  this.isLoggedIn = false;
}
}
