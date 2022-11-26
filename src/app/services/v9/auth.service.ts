import { Injectable, NgZone } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

//
// Firebase
// import { Auth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
// import firebase from 'firebase/app';
import { GoogleAuthProvider } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  routing = environment.routing;
  userData!: User;
  userSubject = new Subject<User>();

  constructor(
    private auth: Auth,
    private router: Router,
    public _ngZone: NgZone
  ) {
    // this.afAuth.authState.subscribe((user) => {
    //   if (user) {
    //     this.setUserData(user);
    //     this.authStateChanged();
    //   } else {
    //     localStorage.removeItem('user');
    //   }
    // });
  }

  signIn(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Register user with email/password
  registerUser(email: string, password: string): any {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Email verification when new user register
  // sendVerificationMail() {
  //   return this._fa.currentUser.sendEmailVerification().then(() => {
  //     // this.router.navigate(['verify-email']);
  //   });
  // }

  // Recover password
  // passwordRecover(passwordResetEmail: string): any {
  //   sendPasswordResetEmail(this.auth,)

  //   return this.afAuth
  //     .sendPasswordResetEmail(passwordResetEmail)
  //     .then(() => {
  //       window.alert(
  //         'Password reset email has been sent, please check your inbox.'
  //       );
  //     })
  //     .catch((error) => {
  //       window.alert(error);
  //     });
  // }

  // authStateChanged(): void {
  //   this.afAuth.onAuthStateChanged((user: User) => {
  //     if (user) {
  //       this.setUserData(user);
  //     } else {
  //       this.afAuth.signOut();
  //     }
  //   });
  // }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!) || null;
    if (user) {
      this.setUserData(user);
    }
    return user !== null ? true : false;
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!) || null;
    return user.emailVerified !== false ? true : false;
  }

  checkUser(): void {
    if (this.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user')!) || null;
      if (user) {
        this.setUserData(user);
      }
    } else {
      this.signOut();
    }
  }

  // authLogin(provider): any {
  //   return this.afAuth
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       this._ngZone.run(() => {
  //         // TODO: Need check this router
  //         this.router.navigate(['invoice']);
  //       });
  //       this.setUserData(result.user);
  //     })
  //     .catch((error) => {
  //       window.alert(error);
  //     });
  // }

  // Store user in localStorage and subject
  setUserData(user: any): void {
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      token: user.idToken,
      refreshToken: user.refreshToken,
    };

    this.userSubject.next(userData);
    this.userData = userData;
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('_userId', JSON.stringify(userData.uid));
  }

  signOut(): any {
    // TODO: Need to check why this function called every time when user not Auth
    signOut(this.auth).then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('_userId');
      this.router.navigate([environment.routing.default.home]);
    });
  }

  getUserStateChange(): Observable<User> {
    return this.userSubject.asObservable();
  }

  getUserId(): string {
    // if (this.userData) {
    //   return this.userData.uid;
    // } else {
    //   this.checkUser();
    //   if (this.userData) {
    //     return this.userData.uid;
    //   } else {
    //     this.signOut();
    //   }
    // }

    return this.userData.uid;
  }

  getUser(): User | null {
    if (this.userData) {
      return this.userData;
    } else {
      this.checkUser();
      if (this.userData) {
        return this.userData;
      } else {
        return null;
      }
    }
  }

  getUserDisplayName(): string | null {
    if (!this.userData) {
      return null;
    }
    return this.userData.displayName! || this.userData.email!;
  }

  // async loginWithGoogle() {
  //   await this._fa.signInWithPopup(new auth.GoogleAuthProvider());
  //   this.router.navigate([environment.routing.home]);
  // }

  // async logout() {
  //   signOut(this.auth);

  //   // await this.afAuth.signOut();
  //   localStorage.removeItem('user');
  //   this.router.navigate([environment.routing.auth.login]);
  // }

  // loginWithGooglePopup(returnUrl = '/'): Promise<any> {
  //   signInWithPopup(this.auth, new firebase.auth.GoogleAuthProvider())

  //   return this.afAuth
  //     .signInWithPopup(new firebase.auth.GoogleAuthProvider())
  //     .then((response) => {
  //       if (response.user) {
  //         this.setUserData(response.user);
  //         returnUrl == '/'
  //           ? this.router.navigate([this.routing.admin.dashboard])
  //           : this.router.navigateByUrl(returnUrl);
  //       }
  //     });
  // }

  loginWithGooglePopup(returnUrl = '/'): Promise<any> {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(this.auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;
        const user = result.user as User;
        user.token = credential?.accessToken;
        this.setUserData(result.user);

        returnUrl == '/'
          ? this.router.navigate([this.routing.admin.dashboard])
          : this.router.navigateByUrl(returnUrl);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        // TODO: Need to add notification service
      });
  }
}
