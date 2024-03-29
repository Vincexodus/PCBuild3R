import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { HttpResponse } from '@angular/common/http';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent implements OnInit {
  @Output() loginSuccess = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLoginBtnClick(email: string, password: string) {
    this.authService.login(email, password).subscribe((res: HttpResponse<any>) => {
      if (res.status === 200) {
        if(res.body.isAdmin) {
          this.router.navigate(['/admin']);
        } else {
          this.authService.emitLoginSuccess(true);
          this.router.navigate(['/']);
        }
      }
    });
  }
}
