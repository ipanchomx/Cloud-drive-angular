import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { File } from 'src/app/globals/models/file.model';
import { FilesService } from 'src/app/globals/services/files.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-file-information',
  templateUrl: './file-information.component.html',
  styleUrls: ['./file-information.component.scss']
})
export class FileInformationComponent implements OnInit {


  file: File = null;
  dateOfCreation: string = '';
  permission: string= 'owner';

  constructor(private _fileService: FilesService, private _activatedRoute: ActivatedRoute, private router: Router) { }

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
    alert('shared file with...');
  }

  deleteFile() {
    alert('Deleting file...')
  }

  verifyFile() {
    alert('Verifying file...')
  }


}

