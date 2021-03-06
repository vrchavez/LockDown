import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';

const password = new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]);

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  subStatus: boolean = false;
  familyErr: boolean = false;
  public form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private service: AuthService) { }

  ngOnInit() {
    this.form = this.fb.group({
      familyname: [null, Validators.compose([Validators.required])],
      password: password
    });
  }

  onSubmit() {
    this.subStatus = true;
    if (this.form.valid) {
      this.service.registerUser(this.form.value).subscribe((data:any) => {
        console.log(data);
        // localStorage.setItem('familyName', data.familyname);
        // localStorage.setItem('token_value', data.token);
        // localStorage.setItem('userId', data.userId);
        this.router.navigate(['/movement']);
      }, (error) => {
        if ( error.error.message.includes('FamilyName')) {
          this.changeFamilyErr(true);
        }
      });
      console.log(this.form.value);
    }
  }

  changeFamilyErr(param) {
    this.familyErr = param;
  }

}
