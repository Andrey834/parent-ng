import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {Router, RouterLink} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {StorageService} from "../../service/storage.service";
import {routes} from "../../app.routes";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {CookieService} from "ngx-cookie-service";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(private authService: AuthService,
              private storageService: StorageService,
              private router: Router,
              private fb: FormBuilder,
              private notification: NotificationService,
              private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  createLoginForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    })
  }

  submit(): void {
    this.authService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }).subscribe({
      next: tokens => {
        this.storageService.saveTokens(tokens);
        this.router.navigate(['/person']).then(r => true)
        this.notification.showSnackBar(`Привет!`)
      },
      error: err =>
        this.notification.showSnackBar(err.message())
    })
  }
}
