import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadedFilesPage } from './uploaded-files.page';

const routes: Routes = [
  {
    path: '',
    component: UploadedFilesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadedFilesPageRoutingModule {}
