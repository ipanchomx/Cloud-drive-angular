import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

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
  // items = [
  //   {id: 1, name: 'Item 1'},
  //   {id: 2, name: 'Item 2'},
  //   {id: 3, name: 'Item 3'}
  // ];

  isChecked:boolean = true;
  showFiller = false;

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];

  // folders: Section[] = [];

  files: Section[] = [
    {
      name: 'Vacation Itinerary Wapi',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
    {
      name: 'TUSA Remodel',
      updated: new Date('11/10/19'),
    }
  ];

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
