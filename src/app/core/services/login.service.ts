import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authState: any = null;

  constructor(private afDb: AngularFireDatabase, private afAuth: AngularFireAuth, private userService: UserService) {
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
        const user = new User('1Kuuozozeqkqlaeh', 'Youness', 'Houdass', '44', 'BLUE');
        this.userService.addUser(user);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  signOut(): any {
    this.afAuth.auth.signOut();
  }

  getEmployees(): Observable<any> {
    return this.afDb.list('/users').snapshotChanges();
  }

  isAuthenticated(): boolean {
    return this.authState !== null;
  }

  currentUser(): any {
    return this.isAuthenticated ? this.authState : null;
  }

  currentUserEmail(): any {
    return this.isAuthenticated ? this.authState.email : null;
  }
}
