import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Note {
  title: string;
  notes: string;
  dataUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notesCollection: AngularFirestoreCollection<Note>;

  constructor(private afs: AngularFirestore) {
    this.notesCollection = afs.collection<Note>('notes');
  }

  getNotes(): Observable<Note[]> {
    return this.notesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Note;
        console.log(data)
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
}
