import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { LoginService } from '../../core/services/login.service';
import { AllowedUserService } from '../../core/services/allowedUser.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoginMode = true;
  userForm: FormGroup;
  formErrors = {
    email: '',
    password: ''
  };
  validationMessages = {
    email: {
      required: 'Please enter your email',
      email: 'please enter your vaild email'
    },
    password: {
      required: 'please enter your password',
      pattern: 'The password must contain numbers and letters',
      minlength: 'Please enter more than 4 characters',
      maxlength: 'Please enter less than 25 characters'
    }
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.isLoginMode = data.isLoginMode;
    });
    this.loginService.getAuthState().subscribe((auth: any) => {
      if (auth) {
        console.log(auth);
        this.router.navigate(['content', 'dashboard']);
      }
    });

    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(25)
        ]
      ]
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    // if (!this.userForm) {
    //   return;
    // }b
    // const form = this.userForm;
    // for (const field in this.formErrors) {
    //   if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
    //     this.formErrors[field] = '';
    //     const control = form.get(field);
    //     if (control && control.dirty && !control.valid) {
    //       const messages = this.validationMessages[field];
    //       for (const key in control.errors) {
    //         if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
    //           this.formErrors[field] += messages[key] + ' ';
    //         }
    //       }
    //     }
    //   }
    // }
  }

  signIn() {
    this.loginService.signIn(this.userForm.value.email, this.userForm.value.password);
  }

  signUp() {
    this.loginService.signUp(this.userForm.value.email, this.userForm.value.password);
  }
}
