import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
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


  constructor() { }

  ngOnInit(): void {
  }

  onContextMenu(event: MouseEvent, item: Item) {
    event.preventDefault();
    console.log(event, item);
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  onContextMenuAction1(item: Item) {
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
