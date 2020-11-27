import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { File, Version } from 'src/app/globals/models/file.model';
import { FilesService } from 'src/app/globals/services/files.service';
import { saveAs } from 'file-saver';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ShareFileDialogComponent } from 'src/app/dialogs/share-file-dialog/share-file-dialog.component';
import { MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';

import { UpdateFileDialogComponent } from 'src/app/dialogs/update-file-dialog/update-file-dialog.component';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { SocketsService } from 'src/app/globals/services/sockets.service';

@Component({
  selector: 'app-file-information',
  templateUrl: './file-information.component.html',
  styleUrls: ['./file-information.component.scss']
})
export class FileInformationComponent implements OnInit {


  file: File = null;
  dateOfCreation: string = '';
  permission: string= 'owner';
  statusString: string= 'not available';
  selectedValue: string = "";
  versions:Version[] = [];
  idParam: string;

  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  constructor(
    private _fileService: FilesService, 
    private _activatedRoute: ActivatedRoute, 
    private router: Router, 
    private _matDialog: MatDialog, 
    private _snackBar: MatSnackBar,
    private _sockets: SocketsService) { }
  
  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.idParam = params.id;
      
      this.getFile(params.id);

    })
  }

  downloadFile() {
    this._fileService.downloadFile(this.file._id)
      .then(file => {
        saveAs(file, this.file.fileName);
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateFile(event) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "300";
    dialogConfig.width = "40%"
    dialogConfig.minWidth = "360px";
    dialogConfig.minHeight = "300px"
    dialogConfig.data = {
      file: this.file
    }
    this._matDialog.open(UpdateFileDialogComponent, dialogConfig);
  }

  shareFile() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "40%";
    dialogConfig.width = "60%"
    dialogConfig.minWidth = "360px";
    dialogConfig.minHeight = "500px"
    dialogConfig.data = {
      file: this.file
    }
    const dialogRef = this._matDialog.open(ShareFileDialogComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe(result => {
        this.getFile(this.idParam);
      });
  }

  openDeleteDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "250px";
    dialogConfig.width = "500px"
    dialogConfig.data = {
      name: this.file.fileName,
      deleteFunction: ()=>{this.deleteFile()}
    }

    const dialogRef = this._matDialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe(result => {
        const snack = this._snackBar.open("File successfully deleted.", "Close");
        snack._dismissAfter(3000);
      });
  }


  deleteFile() {
    this._fileService.deleteFile(this.file._id).subscribe(data => {
      console.log('Archivos elminados:', data);
      this._sockets.emit('notification', {file: this.file, sharedWith: this.file.sharedWith, type: "delete"});

      this.router.navigate(['/file-manager']);
    }, err => {
      console.log(err);
      this.router.navigate(['/file-manager']);
    })
  }

  verifyFile() {

    console.log('Verifying file...')
    console.log(this.statusString);
    let obj = {
      id: this.file._id,
      status: this.statusString
    };
    console.log(obj);


    this._fileService.updateVerificationStatus(obj)
    .then(msg=>{
        const snack = this._snackBar.open(msg, "Close", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        })
        
        this._sockets.emit('notification', {file: this.file, sharedWith: this.file.sharedWith, type: "verify"});
        snack._dismissAfter(3000);
    }).catch(err =>{
        const snack = this._snackBar.open(err, "Close", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        });
        snack._dismissAfter(3000);
    })
  }

  getVersions() {
    
    this._fileService.getVersions(this.file._id).then( (data:Version[]) => {
      data.sort((a, b) => {
          return b.version - a.version
      })
      this.versions = data;
      this.selectedValue = this.file._id;
    }).catch(err => {
      console.log(err);      
    })
  }

  getFile(id) {
    this._fileService.getFile(id)
        .then((file: File) => {
          this.dateOfCreation = new Date(file.dateOfCreation).toLocaleDateString();
          this.file = file;

          this.file.sharedWith.forEach(share => {
            if (share.userId == localStorage.userId) {
              this.permission = share.permission;
            }
          });

          this.statusString = this.file.verificationStatus;       
          console.log(this.statusString);
          
          this.getVersions(); /////////////////////////////////////////////
          this.versions.map( version => {
            ({id : version.id, date : new Date(version.date).toLocaleDateString(), version : version.version, status: version.status, versionWithNumber : version.versionWithNumber})
          })
          
        })
        .catch(err => {
          console.log(err)
          this.router.navigate(['/404'])
        });
  }
  selectVersion(e) {
    this.router.navigate(['/file-info', e.value]);
  }
}

