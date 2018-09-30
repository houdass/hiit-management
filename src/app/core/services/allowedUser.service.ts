import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';

import { Collection } from '../enums/collection.enum';
import { DataService } from './data.service';
import { AllowedUser } from '../models/allowedUser.model';

@Injectable({
  providedIn: 'root'
})
export class AllowedUserService extends DataService<AllowedUser> {
  constructor(afDb: AngularFireDatabase, afAuth: AngularFireAuth, toastrService: ToastrService) {
    super(afDb, afAuth, toastrService, Collection.AllowedUser);
  }

  setToActive(key) {
    this.update(key, { isActive: true });
  }
}
