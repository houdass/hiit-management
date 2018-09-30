import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';

import { Collection } from '../enums/collection.enum';
import { DataService } from './data.service';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService<User> {
  constructor(afDb: AngularFireDatabase, afAuth: AngularFireAuth, toastrService: ToastrService) {
    super(afDb, afAuth, toastrService, Collection.User);
  }
}
