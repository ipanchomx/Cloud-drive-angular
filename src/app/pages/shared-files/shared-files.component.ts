import { Component, OnInit } from '@angular/core';
import { File, filesResponse } from 'src/app/globals/models/file.model';
import { FilesService } from 'src/app/globals/services/files.service';

@Component({
  selector: 'app-shared-files',
  templateUrl: './shared-files.component.html',
  styleUrls: ['./shared-files.component.scss']
})
export class SharedFilesComponent implements OnInit {

  files: File[] = [];
  folders: File[] = [];
  inProgress: boolean = false;
  path: string = '/';

  constructor(private _filesService: FilesService) { }

  ngOnInit(): void {
    this.getSharedContent();
  }

  goToFolderPath($event) {
    console.log($event);
    if (this.path != '/') this.path += '/';
    this.path += $event.fileName;
    this.getSharedContent();
  }

  getSharedContent() {
    this.inProgress = true;
    this._filesService.getSharedContent(this.path)
      .then((res: filesResponse) => {
        if (res && res.files && res.folders) {
          this.files = res.files;
          this.files.sort((file1, file2) => (file2.fileName <= file1.fileName) ? 1 : -1);
          this.folders = res.folders;
          this.folders.sort((folder1, folder2) => (folder2.fileName <= folder1.fileName) ? 1 : -1);
          console.log(res)
          this.inProgress = false;

        }
      })
      .catch(err => {
        console.log(err);
        this.inProgress = false;
      });
  }
}
