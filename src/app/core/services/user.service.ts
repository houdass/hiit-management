import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

import { Collection } from '../enums/collection.enum';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authState: any = null;

  constructor(
    private afDb: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private toastrService: ToastrService
  ) {
    this.afAuth.authState.subscribe((auth: any) => {
      this.authState = auth;
    });
  }

  getUser(key: string) {
    return this.afDb.list(`${Collection.USER}/${key}`);
  }

  getAll() {
    return this.afDb
      .list(Collection.USER)
      .snapshotChanges()
      .pipe(map((changes: any) => changes.map((c: any) => ({ key: c.payload.key, ...c.payload.val() }))));
  }

  get db() {
    return this.afDb.list(Collection.USER);
  }

  addUser(user: User) {
    this.db.push(user);
    this.toastrService.success(`L'utilisateur a été ajouté avec succès`);
  }

  updateUser(key: string, user: User) {
    this.db.update(key, user);
    this.toastrService.success(`L'utilisateur a été modifié avec succès`);
  }

  removeUser(key: string) {
    this.db.remove(key).then(() => {
      this.toastrService.success(`L'utilisateur a été supprimé avec succès`);
    });
  }
}
