import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './user.service';
import { map, mapTo, mergeMap, switchMap, tap } from 'rxjs/internal/operators';
import { AllowedUserService } from './allowedUser.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authState: any = null;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastrService: ToastrService,
    private userService: UserService,
    private allowedUserService: AllowedUserService
  ) {
    this.afAuth.authState.subscribe((auth: any) => {
      this.authState = auth;
    });
  }

  signIn(email: string, password: string): any {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((credential: any) => {
        console.log(credential.user);
      })
      .catch(err => {
        this.toastrService.error(err.message);
      });
  }

  signUp(email: string, password: string) {
    this.isAllowedEmail(email).subscribe(isAllowed => {
      debugger;
      if (isAllowed) {
        this.afAuth.auth
          .createUserWithEmailAndPassword(email, password)
          .then(value => {
            const user = new User(email);
            this.userService.addWithKey(value.user.uid, user);
          })
          .catch(err => {
            this.toastrService.error(err.message);
          });
      } else {
        this.toastrService.error('NOT ALLOWED EMAIL');
      }
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

  isAllowedEmail(email: string) {
    return this.allowedUserService.getAll().pipe(
      map(users => {
        const user = users.find(u => u.email === email);
        return !!user;
      })
    );
  }
}
