import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { File } from 'src/app/globals/models/file.model';
import { FilesService } from 'src/app/globals/services/files.service';

@Component({
  selector: 'app-file-information',
  templateUrl: './file-information.component.html',
  styleUrls: ['./file-information.component.scss']
})
export class FileInformationComponent implements OnInit {


  file: File = null;
  dateOfCreation: string = '';

  constructor(private _fileService: FilesService, private _activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this._fileService.getFile(params.id)
      .then((file:File) => {
        this.dateOfCreation = new Date(file.dateOfCreation).toLocaleDateString();
        console.log(file);
        // this.file = file;
      })
      .catch(err => {
        console.log(err)
        // alert("Can't access resource");
        // this.router.navigate(['file-manager'])
      });

    })
  }

  downloadFile() {
    alert('file is downloading');
  }

  uploadFile(event) {
    console.log(event);
    alert('file is uploading');
  }

  shareFile() {
    alert('shared file with...');
  }



}

