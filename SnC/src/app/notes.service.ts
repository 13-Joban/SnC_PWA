import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Note {
  imageUrl: any;
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
        const id = a.payload.doc.id;
        
        // check if dataUrl or imageUrl is present and use dataUrl if present, otherwise convert imageUrl to dataUrl
        if (data.dataUrl) {
          return { id, ...data };
        } else if (data.imageUrl) {
          const dataUrl = `data:${this.getMimeTypeFromUrl(data.imageUrl)};base64,${this.getBase64FromUrl(data.imageUrl)}`;
          return { id, ...data, dataUrl };
        } else {
          return { id, ...data };
        }
      }))
    );
  }

  // helper function to get MIME type from URL
  getMimeTypeFromUrl(url: string): string {
    const matches = url.match(/^data:(.+);base64,/);
    if (matches && matches.length > 1) {
      return matches[1];
    } else {
      return '';
    }
  }

  // helper function to get Base64-encoded string from URL
  getBase64FromUrl(url: string): string {
    const matches = url.match(/^data:.+;base64,(.*)$/);
    if (matches && matches.length > 1) {
      return matches[1];
    } else {
      return '';
    }
  }
}
