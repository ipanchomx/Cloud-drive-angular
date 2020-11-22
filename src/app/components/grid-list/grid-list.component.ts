import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { File } from 'src/app/globals/models/file.model';

export interface Section {
  name: string;
  updated: Date;
}

export interface Item {
  id: number;
  name: string;
}

@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss']
})
export class GridListComponent implements OnInit {


  isChecked:boolean = true;
  showFiller = false;

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  @Input('folders') folders: File[];
  @Input('files') files: File[];
  @Output('onFolderClick') onFolderClick = new EventEmitter<File>();


  constructor(private _router: Router) { }

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

  onContextMenuAction1(item: File) {
    alert(`Click on Action 1 for ${item.fileName}`);
  }

  onContextMenuAction2(item: File) {
    alert(`Click on Action 2 for ${item.fileName}`);
  }

  onContextMenuAction3(item: File) {
    alert(`Click on Action 3 for ${item.fileName}`);
  }

  clickOnFolder(folder) {
    this.onFolderClick.emit(folder);
     console.log(folder);
  }

  clickOnFile(file) {
    this._router.navigate(['/file-info',file._id])
 }
}
