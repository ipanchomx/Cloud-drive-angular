import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { File } from 'src/app/globals/models/file.model';
import { saveAs } from 'file-saver';
import { FilesService } from 'src/app/globals/services/files.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ShareFileDialogComponent } from 'src/app/dialogs/share-file-dialog/share-file-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss']
})
export class GridListComponent implements OnInit {


  isChecked:boolean = true;
  showFiller = false;

  @Input('prop1') objetohijo:any;

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  @Input('folders') folders: File[];
  @Input('files') files: File[];
  @Output('onFolderClick') onFolderClick = new EventEmitter<File>();


  constructor(
    private _router: Router, 
    private _fileService: FilesService, 
    private _matDialog: MatDialog
    ) { }

  ngOnInit(): void {

  }

  onContextMenu(event: MouseEvent, item: File) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }



  downloadFile(file) {
    this._fileService.downloadFile(file._id)
      .then(fileObj => {
        saveAs(fileObj, file.fileName);
      })
      .catch(err => {
        console.log(err);
      });
  }

  goToFileInfo(item: string) {
    this._router.navigate(['/file-info', item])
  }

  onContextMenuAction3(item: File) {
    alert(`Click on Action 3 for ${item.fileName}`);
  }

  clickOnFolder(folder) {
    this.onFolderClick.emit(folder);
  }

  clickOnFile(file) {
    this._router.navigate(['/file-info',file._id])
 }

 shareFile(file: File) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.height = "40%";
  dialogConfig.width = "60%"
  dialogConfig.minWidth = "360px";
  dialogConfig.minHeight = "500px"
  dialogConfig.data = {
    file: file
  }
  const dialogRef = this._matDialog.open(ShareFileDialogComponent, dialogConfig);

}
}
