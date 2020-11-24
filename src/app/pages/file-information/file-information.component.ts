import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { File } from 'src/app/globals/models/file.model';
import { FilesService } from 'src/app/globals/services/files.service';
import { saveAs } from 'file-saver';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ShareFileDialogComponent } from 'src/app/dialogs/share-file-dialog/share-file-dialog.component';

@Component({
  selector: 'app-file-information',
  templateUrl: './file-information.component.html',
  styleUrls: ['./file-information.component.scss']
})
export class FileInformationComponent implements OnInit {


  file: File = null;
  dateOfCreation: string = '';
  permission: string= 'owner';

  constructor(private _fileService: FilesService, private _activatedRoute: ActivatedRoute, private router: Router, private _matDialog: MatDialog) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this._fileService.getFile(params.id)
        .then((file: File) => {
          this.dateOfCreation = new Date(file.dateOfCreation).toLocaleDateString();
          this.file = file;

          this.file.sharedWith.forEach(share =>{
            if(share.userId == localStorage.userId){
              this.permission = share.permission;
            }
          });
           console.log(this.permission);
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
      .catch(err =>{
        console.log(err);
      });
  }

  uploadFile(event) {
    console.log(event);
    alert('file is uploading');
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
        
      });
  }

  deleteFile() {
    alert('Deleting file...')
  }

  verifyFile() {
    alert('Verifying file...')
  }


}

