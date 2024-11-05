import { Component, Input } from '@angular/core';
import { MENU } from '../classes/MENU';

@Component({
  selector: 'app-main-page-menues',
  templateUrl: './main-page-menues.component.html',
  styleUrls: ['./main-page-menues.component.css']
})
export class MainPageMenuesComponent {

  @Input() data:any
  Menues:MENU[] = []

  constructor() {

  }

  ngOnInit() {
    this.Menues = this.data
  }

  ngAfterViewInit() {
  }

  makeMenu(menu:MENU) {
    if (menu.items.length == 0) {
        return '<button mat-button [matMenuTriggerFor]="afterMenu" style="height: 100%; outline:none; border: none; margin-right: 10px;" (click)="setMenuClick(i)"><div style=" display:flex; align-items:center;"><mat-icon style="display:inline; margin-right: 5px;" aria-hidden="false" aria-label="Example home icon" color="primary">'+menu.icon+'</mat-icon><span style="display:inline;" color="primary">'+menu.name+'</span></div></button>'
    }
    else {
       return '<button mat-button [matMenuTriggerFor]="afterMenu" style="height: 100%; outline:none; border: none; margin-right: 10px;" (click)="setMenuClick(i)"><div style=" display:flex; align-items:center;"><mat-icon style="display:inline; margin-right: 5px;" aria-hidden="false" aria-label="Example home icon" color="primary">'+menu.icon+'</mat-icon><span style="display:inline;" color="primary">'+menu.name+'</span></div></button><div style="display: inline-block;"><mat-menu #afterMenu="matMenu" xPosition="after"><button mat-menu-item *ngFor="let item of menu.items">{{item}}</button></mat-menu></div>'
    }
  }

  setMenuButtonClick(menu:MENU,x:number) {
    console.log(menu.items[x])
  }

}
