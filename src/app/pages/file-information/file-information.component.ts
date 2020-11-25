import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { File } from 'src/app/globals/models/file.model';
import { FilesService } from 'src/app/globals/services/files.service';
import { saveAs } from 'file-saver';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ShareFileDialogComponent } from 'src/app/dialogs/share-file-dialog/share-file-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  statusType: number = 1;

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
          
           switch(this.file.verificationStatus){
             case "rejected": this.statusType = 1; break;
             case "verified": this.statusType = 2; break;
             case "pending": this.statusType = 3; break;
             default: this.statusType = 4;
           }
           console.log(this.file.verificationStatus);
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
    alert('Verifying file...')
  }


}

