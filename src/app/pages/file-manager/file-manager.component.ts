import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateFolderFormComponent } from 'src/app/dialogs/create-folder-form/create-folder-form.component';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { UploadFileFormComponent } from 'src/app/dialogs/upload-file-form/upload-file-form.component';
import { FilesService } from 'src/app/globals/services/files.service';

import { File, filesResponse } from '../../globals/models/file.model';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit {
  value: string = '';
  path: string = '/';
  pathMove: string = '/';
  prevPath: string = '/';
  files: File[] = [];
  folders: File[] = [];
  inProgress: boolean = false;
  constructor(private _matDialog: MatDialog, private _filesService: FilesService) { }

  ngOnInit(): void {
    this.getPathContent();

  }

  openUploadFileDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "70%";
    dialogConfig.width = "60%"
    dialogConfig.minWidth = "360px";
    dialogConfig.minHeight = "600px"
    dialogConfig.data = {
      path: this.path
    }
    const dialogRef = this._matDialog.open(UploadFileFormComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe(result => {
        this.getPathContent();
      });
  }

  openCreateFolderDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "250px";
    dialogConfig.width = "40%"
    dialogConfig.minWidth = "360px";
    dialogConfig.data = {
      path: this.path
    }

    const dialogRef = this._matDialog.open(CreateFolderFormComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe(result => {
        this.getPathContent();
      });
  }


  // openDeleteDialog() {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.height = "250px";
  //   dialogConfig.width = "500px"
  //   dialogConfig.data = {
  //     name: "file.txt",
  //     deleteFunction: ()=>{alert("Deleting")}
  //   }

  //   const dialogRef = this._matDialog.open(DeleteDialogComponent, dialogConfig);

  //   dialogRef.afterClosed()
  //     .subscribe(result => {
  //       this.getPathContent();
  //     });
  // }


  goToFolderPath($event) {
    if (this.path != '/') this.path += '/';
    this.path += $event.fileName;
    this.getPathContent();
    this.pathMove = this.path;
  }

  getPathContent() {
    this.inProgress = true;
    this._filesService.getPathContent(this.path)
      .then((res: filesResponse) => {
        if (res && res.files && res.folders) {
          this.files = res.files;
          this.files.sort((file1, file2) => (file2.fileName <= file1.fileName) ? 1 : -1);
          this.folders = res.folders;
          this.folders.sort((folder1, folder2) => (folder2.fileName <= folder1.fileName) ? 1 : -1);
          this.inProgress = false;
        }
      })
      .catch(err => {
        console.log(err);
        this.inProgress = false;
      });
  }

  backFolder() {
    let splitIndex = this.path.lastIndexOf("/");
    let prevPath = this.path.substring(0, splitIndex);

    if (prevPath.length == 0) this.path = '/';
    else this.path = prevPath;
    this.getPathContent();
    this.pathMove = this.path;
  }

  jumpTo(e) {
    if (e.key == 'Enter' || (e.isTrusted && e.type == 'click')) {
      let url = this.path;
      if (url[0] != '/') {
        url = '/' + this.path;
      }
      if (url.charAt(url.length - 1) == '/' && url.length != 1) url = url.substring(0, url.length - 1)
      if (url == '/') {
        this.getPathContent();
        this.path = url;
      }
      else {
        this._filesService.existDirectory(url).then(response => {
          this.path = url;
          this.getPathContent();
          this.pathMove = this.path;

        }).catch(err => {
          console.log(err);
          this.path = this.pathMove;
        })
      }
    }
  }
}
