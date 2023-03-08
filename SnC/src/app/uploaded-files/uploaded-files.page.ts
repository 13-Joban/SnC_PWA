import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Note, NotesService } from '../notes.service';

@Component({
  selector: 'app-uploaded-files',
  templateUrl: './uploaded-files.page.html',
  styleUrls: ['./uploaded-files.page.scss'],
})
export class UploadedFilesPage implements OnInit {
  notes$: Observable<Note[]> | undefined;

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.notes$ = this.notesService.getNotes();
  }
}
