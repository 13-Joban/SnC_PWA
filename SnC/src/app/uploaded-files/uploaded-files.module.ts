import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadedFilesPageRoutingModule } from './uploaded-files-routing.module';

import { UploadedFilesPage } from './uploaded-files.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadedFilesPageRoutingModule
  ],
  declarations: [UploadedFilesPage]
})
export class UploadedFilesPageModule {}
