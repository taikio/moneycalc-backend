import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { LoadingService } from 'src/app/modules/ui/services/loading.service';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {

  authForm: FormGroup;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private loading: LoadingService) { }

  private buildForm() {
    this.authForm = this.fb.group({
      username: ['', [
        Validators.required,
      ]],
      password: ['', [
        Validators.required,
      ]],
    });
  }

  submmit() {
    this.loading.showHide(true);

    this.auth.login(
      this.authForm.value.username,
      this.authForm.value.password
    ).subscribe(
      () => {
        this.loading.showHide(false);
        this.router.navigate(['/dashboard'])
      },
      () => Swal.fire('Oops...', 'Falha ao logar! Verifique suas credenciais e tente novamente!', 'error')
    );
  }

  ngOnInit() {
    this.buildForm();
  }

}
