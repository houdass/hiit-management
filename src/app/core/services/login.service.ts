import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authState: any = null;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe((auth: any) => {
      this.authState = auth;
    });
  }

  signIn(email: string, password: string): any {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((credential: any) => {
      console.log(credential.user);
    });
  }

  signUp(email: string, password: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  signOut(): any {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.authState !== null;
  }

  getAuthState() {
    return this.afAuth.authState;
  }

  currentUser(): any {
    return this.isAuthenticated ? this.authState : null;
  }

  currentUserEmail(): any {
    return this.isAuthenticated ? this.authState.email : null;
  }

  currentUserUid(): any {
    return this.isAuthenticated ? this.authState.uid : null;
  }
}
