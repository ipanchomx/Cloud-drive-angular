import { Component, OnInit } from '@angular/core';
import { File, filesResponse } from 'src/app/globals/models/file.model';
import { FilesService } from 'src/app/globals/services/files.service';
import { SocketsService } from 'src/app/globals/services/sockets.service';

@Component({
  selector: 'app-pending-files-shared',
  templateUrl: './pending-files-shared.component.html',
  styleUrls: ['./pending-files-shared.component.scss']
})
export class PendingFilesSharedComponent implements OnInit {

  files: File[] = [];
  inProgress: boolean = false;
  path: string = '/';

  constructor(
    private _filesService: FilesService,
    private _sockets: SocketsService) { }
  
  ngOnInit(): void {
    this.getPendingContent();
    this._sockets.on('notification', data => {
      if(data.type == 'share' || data.type == 'verify') {
        this.getPendingContent();
      }
    })
  }

  goToFolderPath($event) {
    console.log($event);
    if (this.path != '/') this.path += '/';
    this.path += $event.fileName;
    this.getPendingContent();
  }

  getPendingContent() {
    this.inProgress = true;
    this._filesService.getPendingContent(this.path)
      .then((res: File[]) => {
        if (res) {
          this.files = res;
          this.files.sort((file1, file2) => (file2.fileName <= file1.fileName) ? 1 : -1);
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
