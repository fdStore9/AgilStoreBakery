import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { map, Subscription } from 'rxjs';
import { FirebaseError } from 'firebase/app';
import * as authActions from '../../utils/reducer/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Usuario } from '../../utils/models/usuario';

interface CreateUserResponse {
  status: number;
  user?: Usuario;
  error?: any;
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userSubscription: Subscription;
  private _user: Usuario | null = null;

  get user() {
    return this._user
  }
  constructor(public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>) { }

  initAuthListener() {
    this.auth.authState.subscribe(fuser => {
      if (fuser) {
        this.userSubscription = this.firestore.doc(`profiles/${fuser.uid}`).valueChanges()
          .subscribe({
            next: (firestoreUser: any) => {
              const user = Usuario.fromFirebase(firestoreUser);

              if (user) {
                // Asegúrate de clonar el objeto usuario completamente
                const updatedSkills = user.skills.map(skill => ({
                  id: skill.id,
                  name: skill.name,
                  selected: skill.selected || false  // Asegura que 'selected' esté definido
                }));

                // Crea una nueva instancia del usuario con los skills actualizados
                const updatedUser = new Usuario(
                  user.uid,
                  user.nombre,
                  user.email,
                  user.apellido,
                  user.rol,
                  user.password,
                  user.phone,
                  updatedSkills,
                  user.experience,
                  user.profesion,
                  user.fechaNacimiento,
                  user.avatar
                );

                // Dispatch para actualizar el estado en el store
                this.store.dispatch(authActions.setUser({ user: updatedUser }));
              }
            },
            error: (error) => {
              console.error('Error al obtener datos del usuario:', error);
            }
          });
      } else {
        this._user = new Usuario(); // Crear un usuario vacío
        if (this.userSubscription) {
          this.userSubscription.unsubscribe();
        }
        this.store.dispatch(authActions.unSetUser());
      }
    });
  }





  async createUser(password: string, email: string, nombre: string, apellido: string, rol: string): Promise<CreateUserResponse> {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      if (user) {
        const newUser = new Usuario(user.uid, nombre, user.email!, apellido, rol, password);
        await this.firestore.doc(`profiles/${user.uid}`).set({ ...newUser });
        return { status: 200, user: newUser };
      }
      return { status: 400, error: 'Error al crear usuario' };
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            return { status: 409, error: 'El usuario ya existe' };
          case 'auth/invalid-email':
            return { status: 400, error: 'Correo electrónico inválido' };
          case 'auth/weak-password':
            return { status: 400, error: 'La contraseña debe tener al menos 6 caracteres' };
          default:
            return { status: 400, error: error.message || 'Error al crear usuario' };
        }
      }
      return { status: 400, error: 'Error desconocido' };
    }
  }

  async validateCredentials(email: string, password: string): Promise<{ status: number, error?: string }> {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      return { status: 200 };
    } catch (error) {
      let errorMessage = 'Unknown error';
      if (error instanceof FirebaseError && error.code) {
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = 'Usuario no encontrado';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Contraseña incorrecta';
            break;
          default:
            errorMessage = 'Error de autenticación';
        }
      }
      return { status: 400, error: errorMessage };
    }
  }
  logout() {
    return this.auth.signOut();
  }
  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }
}
