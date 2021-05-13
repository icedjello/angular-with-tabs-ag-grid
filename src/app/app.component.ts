import {Component} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <mat-tab-group (selectedTabChange)="tabChanged($event)">
        <mat-tab label="First">
          <app-grid [gridNumber]=1></app-grid>
        </mat-tab>
        <mat-tab label="Second">
          <app-grid [gridNumber]=2></app-grid>
        </mat-tab>
        <mat-tab label="Third">
          <app-grid [gridNumber]=3></app-grid>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
})
export class AppComponent {
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
  }

  onSave = (): void => {
    console.log('saving state to local storage');
  }
}
