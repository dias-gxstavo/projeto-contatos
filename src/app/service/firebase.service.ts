import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set, onValue, remove, update, Database } from 'firebase/database';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private db: Database;

  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    this.db = getDatabase(app);
  }

  async addDocument(collectionName: string, data: any): Promise<any> {
    try {
      const collectionRef = ref(this.db, collectionName);
      const newDocRef = push(collectionRef);
      await set(newDocRef, data);
      return { id: newDocRef.key, ...data };
    } catch (error) {
    }
  }

  getCollection(collectionName: string): Observable<any[]> {
    return new Observable(observer => {
      const collectionRef = ref(this.db, collectionName);

      onValue(collectionRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const items = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          observer.next(items);
        } else {
          observer.next([]);
        }
      }, (error) => {
        observer.error(error);
      });
    });
  }


}