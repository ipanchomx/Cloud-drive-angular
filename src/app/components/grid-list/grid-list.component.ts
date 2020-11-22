import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

export interface File {
  name: string;
  status: string;
  path: string;
  updated: Date;
}

export interface Dir {
  name: string;
  status: string;
  path: string;
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
  // items = [
  //   {id: 1, name: 'Item 1'},
  //   {id: 2, name: 'Item 2'},
  //   {id: 3, name: 'Item 3'}
  // ];

  isChecked:boolean = true;
  showFiller = false;

  @Input('prop1') objetohijo:any;

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  // folders: Dir[];
  // files: File[];
  folders:any = [];
  files:any = [];

  constructor() { }

  ngOnInit(): void {
    setTimeout(()=> {
      console.log(this.objetohijo)
      this.folders = this.objetohijo.folders;
      this.files = this.objetohijo.files;
    },1500)


  }

  onContextMenu(event: MouseEvent, item: Item) {
    event.preventDefault();
    console.log("Context menu")
    console.log(event, item);
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  onContextMenuAction1(item: Item) {
    console.log('Action: ', item);
    alert(`Click on Action 1 for ${item.name}`);
  }

  onContextMenuAction2(item: Item) {
    alert(`Click on Action 2 for ${item.name}`);
  }

  onContextMenuAction3(item: Item) {
    alert(`Click on Action 3 for ${item.name}`);
  }

  clickOnFolder(folder) {
     console.log(folder);
  }

  clickOnFile(file) {
    console.log(file);
 }
}
