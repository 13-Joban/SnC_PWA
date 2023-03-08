import { Component } from '@angular/core';

import { finalize } from 'rxjs/operators';

import { NavController } from '@ionic/angular';
import { UploadedFilesPage } from '../uploaded-files/uploaded-files.page';
import {
	AngularFireStorage,
	AngularFireUploadTask,
  } from '@angular/fire/compat/storage';
  import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { from } from 'rxjs';


interface LocalFile {
	name: string;
	path: string;
	data: string;
}
  

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss']
})

export class HomePage {
	title: string= "";
	notes: string= "";

	audioUrl: string | null = null;
	imageUrl: string | null = null;
videoUrl: string | null = null;
// mediaUrl: string | null = null;
audio: File | null = null;
video: File | null = null;
image: File | null = null;


	constructor(
		private afStorage: AngularFireStorage,
		private afFirestore: AngularFirestore,
		private navCtrl: NavController
		
	) {}


selectImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
	input.multiple = false;
    input.onchange = (event) => this.onImageSelected(event);
    input.click();
  }

  onImageSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
		this.audioUrl = null;
		this.videoUrl = null;
      };
      if (this.image) {
        this.video = null;
        this.audio = null;
		this.audioUrl = null;
		this.videoUrl = null;
        reader.readAsDataURL(this.image);
        const storageRef = this.afStorage.ref(`images/${this.image.name}`);
        const uploadTask = storageRef.put(this.image);
        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            storageRef.getDownloadURL().subscribe((url) => {
              this.imageUrl = url;
			  this.audioUrl = null;
		this.videoUrl = null;
            });
          })
        ).subscribe();
      }
    }
  }


  async checkMedia(){

	// if()
  }
  
  async uploadData() {
	if (!this.title) {
	  // Show an error message if the title is empty
	  alert('Please enter a title');
	  return;
	}
  
	// Generate a random ID for the data
	const id = Math.random().toString(36).substring(2);
  
	// Create a reference to the Firebase Firestore collection
	const collectionRef = this.afFirestore.collection('notes');
  
	// Upload the data to Firebase Firestore
	const data = {
	  title: this.title,
	  notes: this.notes,
	  dataUrl : this.imageUrl ? this.imageUrl : this.audioUrl ? this.audioUrl : this.videoUrl ? this.videoUrl : ""
	};
	console.log(data);
	collectionRef.doc(id).set(data).then(() => {
		this.title = "";
		this.notes = "";
		this.audio = null;
		this.image = null;
    	this.video = null;
		this.videoUrl = null;
		this.imageUrl = null;
		this.audioUrl = null;
	  console.log('Data uploaded successfully');
	}).catch((error: any) => {
	  console.error('Error uploading data: ', error);
	});
  }
  selectAudio() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'audio/*';
	input.multiple = false;
    input.onchange = (event) => this.onAudioSelected(event);
    input.click();
  }

  onAudioSelected(event: any): void {
	if (event.target.files && event.target.files[0]) {
	  this.audio = event.target.files[0];
	  const reader = new FileReader();
	  reader.onload = (e: any) => {
		this.audioUrl = e.target.result;
		this.imageUrl = null;
		this.videoUrl = null;
	  };
	  if (this.audio) {
		this.image = null;
		this.video = null;
		this.audioUrl = null;
		this.videoUrl = null;
		reader.readAsDataURL(this.audio);
		const storageRef = this.afStorage.ref(`audio/${this.audio.name}`);
		const uploadTask = storageRef.put(this.audio);
		uploadTask.snapshotChanges().pipe(
		  finalize(() => {
			storageRef.getDownloadURL().subscribe((url) => {
			  this.audioUrl = url;
			  this.videoUrl = null;
		    this.imageUrl = null;
			});
		  })
		).subscribe();
	  }
	}
  }
  

  selectVideo() {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = 'video/*';
	input.multiple = false;
	input.onchange = (event) => this.onVideoSelected(event);
	input.click();
  }
  
  onVideoSelected(event: any) {
	const file = event.target.files[0];
	if (file) {
	  const reader = new FileReader();
	  this.video = file;
	  reader.onload = () => {
		this.videoUrl = reader.result as string;
	  };
	  if (this.video) {
		this.image = null;
		this.audio = null;	
		this.audioUrl = null;
		this.imageUrl = null;
		reader.readAsDataURL(this.video);
		const storageRef = this.afStorage.ref(`videos/${this.video.name}`);
		const uploadTask = storageRef.put(this.video);
		uploadTask.snapshotChanges().pipe(
		  finalize(() => {
			storageRef.getDownloadURL().subscribe((url) => {
			  this.videoUrl = url;
			  this.audioUrl = null;
		      this.imageUrl = null;
			});
		  })
		).subscribe();
	  }
	}
  }
  viewAllFiles() {
    this.navCtrl.navigateForward('/uploaded-files');
  }

  
}
  