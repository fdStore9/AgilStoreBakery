import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { products } from '../models/products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: AngularFirestore) { }

  updateDocument(collectionName: string, documentId: string, data: products): Promise<{ status: number; message: string }> {
    return this.firestore.collection(collectionName).doc(documentId).update(Object.assign({}, data))
      .then(() => {
        return { status: 200, message: 'Document updated successfully' };
      })
      .catch(error => {
        console.error('Error updating document: ', error);
        return { status: 500, message: 'Error updating document', error: error.message };
      });
  }
  async createDocument(collectionName: string, data: products): Promise<{ status: number; message: string; documentId?: string }> {
    try {
      if (typeof data.precio === 'string') {
        data.precio = parseFloat(data.precio.replace(/[^0-9.-]+/g, ""));
      }
      const item = {
        id: data.id,
        nombreProducto: data.nombreProducto,
        precio: data.precio,
        descripcionProducto: data.descripcionProducto,
        avatar: data.avatar
      };
      const docRef = this.firestore.collection(collectionName).doc(item.id);
      await docRef.set(item);
      return { status: 200, message: 'Document created successfully', documentId: item.id };
    } catch (error) {
      console.error('Error creating document: ', error);
      return { status: 500, message: 'Error creating document' };
    }
  }
  async deleteDocument(collectionName: string, documentId: string): Promise<{ status: number; message: string }> {
    try {
      const docRef = this.firestore.collection(collectionName).doc(documentId);
      await docRef.delete();
      return { status: 200, message: 'Document deleted successfully' };
    } catch (error) {
      console.error('Error deleting document: ', error);
      return { status: 500, message: 'Error deleting document' };
    }
  }

  getListProduct(): Observable<any[]> {
    return this.firestore.collection('products').valueChanges();
  }
}
