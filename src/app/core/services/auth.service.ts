import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './user.service';
import { map } from 'rxjs/internal/operators';
import { AllowedUserService } from './allowedUser.service';
import { User } from '../models/user.model';
import { message } from '../constants/message.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null;
  currentUser: any;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastrService: ToastrService,
    private userService: UserService,
    private allowedUserService: AllowedUserService
  ) {
    this.afAuth.authState.subscribe((auth: any) => {
      this.authState = auth;
      if (auth) {
        this.userService
          .get(auth.uid)
          .valueChanges()
          .subscribe(user => {
            this.currentUser = user[0];
            this.currentUser.photoUrl = 'assets/hari.jpg';
          });
      }
    });
  }

  signIn(email: string, password: string): any {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((credential: any) => {
        console.log(credential.user);
      })
      .catch(() => {
        this.toastrService.error(message.error.signIn);
      });
  }

  signUp(email: string, password: string) {
    this.isAllowedEmail(email).subscribe(key => {
      if (key) {
        this.afAuth.auth
          .createUserWithEmailAndPassword(email, password)
          .then(value => {
            this.allowedUserService.setToActive(key);
            const user = new User(email);
            this.userService.addWithKey(value.user.uid, user);
          })
          .catch(() => {
            this.toastrService.error(message.error.signUp);
          });
      } else {
        this.toastrService.error(message.error.notAllowedEmail);
      }
    });
  }

  signOut(): any {
    this.afAuth.auth.signOut();
    this.router.navigate(['/sign-in']);
  }

  isAuthenticated(): boolean {
    return this.authState !== null;
  }

  getAuthState() {
    return this.afAuth.authState;
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
        return user && user.key;
      })
    );
  }
}
