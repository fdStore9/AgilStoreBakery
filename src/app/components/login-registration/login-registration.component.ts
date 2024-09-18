import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from '../../../utils/models/usuario';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import * as ui from '../../../utils/reducer/ui.actions';
import { MessagesToShow } from '../../shared/enums';
import { SweetAlert } from '../../shared/Alerts';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormsComponent } from '../../shared/forms/forms.component';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login-registration',
  standalone: true,
  imports: [CommonModule, FormsComponent],
  templateUrl: './login-registration.component.html',
  styleUrl: './login-registration.component.css'
})
export class LoginRegistrationComponent implements OnInit {
  isLoginActive: boolean;
  ListInputLoginForm: Array<any>;
  ListInputRegisterForm: Array<any>;
  getForms: Usuario;
  uiSubscription: Subscription;
  isLoading: boolean = false;
  alerts: SweetAlert;
  constructor(private readonly loginService: LoginService,
    private store: Store<AppState>,
    private router: Router,
    private spinner: NgxSpinnerService) {
    this.ListInputRegisterForm = [
      {
        title: 'Nombre',
        name: 'name',
        type: 'text',
        placeholder: 'Ingrese Nombre',
        validation: [Validators.required],
        class: 'col-md-6',
        icon: 'bi-person-circle'
      },
      {
        title: 'Apellidos',
        name: 'lastName',
        type: 'text',
        placeholder: 'Ingrese Apellidos',
        validation: [Validators.required],
        class: 'col-md-6',
        icon: 'bi-person-fill-check'
      },
      {
        name: 'role',
        type: 'select',
        placeholder: 'Seleccione',
        title: 'Rol',
        options: [
          { label: 'Admin', value: 'Administrador' },
          { label: 'Mesero', value: 'Mesero' },
          { label: 'Otro', value: 'Otro' }
        ],
        validation: [Validators.required],
        class: 'col-md-6',
        icon: 'bi-filter'
      },
      {
        title: 'Contraseña',
        name: 'contraseniaR',
        type: 'password',
        placeholder: 'Ingrese Contraseña',
        validation: [Validators.required],
        class: 'col-md-6',
        icon: 'bi-lock'
      },
      {
        title: 'Correo',
        name: 'email',
        type: 'text',
        placeholder: 'Ingrese Correo',
        validation: [Validators.required, Validators.email],
        icon: 'bi-at'
      }
    ]
    this.ListInputLoginForm = [
      {
        title: 'Correo',
        name: 'email',
        type: 'text',
        placeholder: 'Ingrese Correo',
        validation: [Validators.required, Validators.email],
        icon: 'bi-at'
      },
      {
        title: 'Contraseña',
        name: 'Contrasenia',
        type: 'password',
        placeholder: 'Ingrese Contraseña',
        validation: [Validators.required],
        icon: 'bi-lock'
      }
    ];
    this.alerts = new SweetAlert();
  }
  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui')
      .subscribe(ui => {
        this.isLoading = ui.isLoading;
        if (this.isLoading) {
          this.spinner.show();
        } else {
          this.spinner.hide();
        }
      });
  }
  changueForm(name: string): void {
    this.isLoginActive = name === 'login';
  }
  getFormvalue(formsValue: any) {
    this.isLoginActive ? this.login(formsValue) : this.createUser(formsValue);
  }
  login(formsValue: any) {
    this.store.dispatch(ui.isLoading());
    if (this.isLoginActive) {
      this.loginService.validateCredentials(
        formsValue.email.value,
        formsValue.Contrasenia.value
      ).then(rs => {
        this.store.dispatch(ui.stopLoading());
        rs.status === 200 ? this.router.navigate(['/dashboard']) :
          this.alerts.showAlert(MessagesToShow.errorMessages.INVALID_ERROR, "error", rs.error || "")
      });
    }
  }
  createUser(formsValue: any) {
    this.store.dispatch(ui.isLoading());
    this.loginService.createUser(
      formsValue.contraseniaR.value,
      formsValue.email.value,
      formsValue.name.value,
      formsValue.lastName.value,
      formsValue.role.value
    ).then(rs => {
      this.store.dispatch(ui.stopLoading());
      rs.status === 200 ?
        this.alerts.showAlert(MessagesToShow.success.GOOD, "success", MessagesToShow.success.SUCCESSFUL_REGISTRATION) :
        this.alerts.showAlert(MessagesToShow.errorMessages.INVALID_ERROR, "error", rs.error)
    });
  }
}
