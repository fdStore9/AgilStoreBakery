import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage'; // Compatibilidad con versión de AngularFire
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'; // Versión modular
import { Usuario } from '../models/usuario.model';
import * as authActions from '../shared/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  constructor(private firestore: AngularFirestore,
     private storage: AngularFireStorage,
     private store: Store<AppState>) { }

     async uploadFile(file: File, name: string): Promise<string> {
      
      if (!file) {
        return Promise.reject('No file provided');
      }
    
      return new Promise((resolve, reject) => {
        const filePath = `profiles/${name}`;
        const fileRef = ref(this.storage.storage, filePath);
        const metadata = {
          contentType: file.type,
          size: file.size
        };
        const uploadTask = uploadBytesResumable(fileRef, file, metadata);
    
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.error('Error al cargar el archivo:', error);
            reject(error);
          },
          async () => {
            try {
              ("El archivo se subió exitosamente!");
              const url = await getDownloadURL(fileRef);
              resolve(url);
            } catch (error) {
              console.error('Error al obtener la URL de descarga:', error);
              reject(error);
            }
          }
        );
      });
    }
    

  updateDocument(collectionName: string, documentId: string, data: Usuario): Promise<void> {
    return this.firestore.collection(collectionName).doc(documentId).update(Object.assign({}, data))
      .then(() => {
        this.store.dispatch(authActions.setUser({ user: data }));
      })
      .catch(error => {
        console.error('Error updating document: ', error);
        throw error;
      });
  }
 
}
