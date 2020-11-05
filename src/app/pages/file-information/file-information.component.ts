import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-information',
  templateUrl: './file-information.component.html',
  styleUrls: ['./file-information.component.scss']
})
export class FileInformationComponent implements OnInit {
  
  
  file: File = {
    filename: "test-file.txt",
    date: new Date().toLocaleDateString(),
    owner: "Mauricio Durán",
    path: "/var/home/etc/www/ghost/api",
    status: "Pending Verification",
    comments: [
      {
        date: new Date().toLocaleDateString(),
        comment: "I checked the file and you're missing some heading",
        author: "mau4duran"
      },
      {
        date: new Date().toLocaleDateString(),
        comment: "Ok. Will fix and update",
        author: "ananisantana"
      }
    ]
  }

  downloadFile() {
    alert('file is downloading');
  }

  uploadFile() {
    alert('file is uploading');
  }

  shareFile() {
    alert('shared file with...');
  }



  constructor() { }
  
  ngOnInit(): void {

  }

}

export interface FileComment {
  date: string,
  comment: string,
  author: string
}

export interface File {
  filename: string,
  date: string,
  owner: string,
  path: string,
  status: string,
  comments: FileComment[]
}

