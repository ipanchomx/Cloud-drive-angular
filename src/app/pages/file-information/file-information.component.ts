import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { File } from 'src/app/globals/models/file.model';
import { FilesService } from 'src/app/globals/services/files.service';
import { saveAs } from 'file-saver';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ShareFileDialogComponent } from 'src/app/dialogs/share-file-dialog/share-file-dialog.component';
import { MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';

import { UpdateFileDialogComponent } from 'src/app/dialogs/update-file-dialog/update-file-dialog.component';

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

  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  constructor(private _fileService: FilesService, private _activatedRoute: ActivatedRoute, private router: Router, private _matDialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this._fileService.getFile(params.id)
        .then((file: File) => {
          this.dateOfCreation = new Date(file.dateOfCreation).toLocaleDateString();
          this.file = file;
          console.log(this.file);

          this.file.sharedWith.forEach(share => {
            if (share.userId == localStorage.userId) {
              this.permission = share.permission;
            }
          });

          this.statusString = this.file.verificationStatus;       
           console.log(this.statusString);
        })
        .catch(err => {
          console.log(err)
          this.router.navigate(['/404'])
        });

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
        // Should update shared with property
      });
  }

  deleteFile() {
    console.log("deleteFile");
    this._fileService.deleteFile(this.file._id).then(data => {
      console.log('Archivos elminados:', data);
      this.router.navigate(['/file-manager']);
    }).catch(err => {
      console.log("No se armó");
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
        this._snackBar.open(msg, "Close", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        })
    }).catch(err =>{
        this._snackBar.open(err, "Close", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        })
    })
  }


}

