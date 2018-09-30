import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

export class DataService<T> {
  authState: firebase.User = null;

  constructor(
    protected afDb: AngularFireDatabase,
    protected afAuth: AngularFireAuth,
    protected toastrService: ToastrService,
    protected dbName: string
  ) {
    this.afAuth.authState.subscribe((auth: firebase.User) => {
      this.authState = auth;
    });
  }

  get db() {
    return this.afDb.list(this.dbName);
  }

  get(key: string) {
    return this.afDb.list(`${this.dbName}/${key}`);
  }

  getAll() {
    return this.afDb
      .list(this.dbName)
      .snapshotChanges()
      .pipe(map((changes: any) => changes.map((c: any) => ({ key: c.payload.key, ...c.payload.val() }))));
  }

  add(item: T) {
    this.db.push(item);
    this.toastrService.success(`L'utilisateur a été ajouté avec succès`);
  }

  addWithKey(key: string, item: T) {
    this.afDb.list(`${this.dbName}/${key}`).push(item);
    this.toastrService.success(`L'utilisateur a été ajouté avec succès`);
  }

  update(key: string, changes: any) {
    this.db.update(key, changes);
    this.toastrService.success(`L'utilisateur a été modifié avec succès`);
  }

  remove(key: string) {
    this.db.remove(key).then(() => {
      this.toastrService.success(`L'utilisateur a été supprimé avec succès`);
    });
  }
}
