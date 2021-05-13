import {Component, Input} from '@angular/core';
import {Grid} from 'ag-grid-community';

@Component({
  selector: 'app-grid',
  template: `
    <button mat-stroked-button (click)="onSaveStateToLocal()" style="margin: 5px;">Save to local storage</button>
    <ag-grid-angular
      style="width: 500px; height: 200px; margin: 5px;"
      class="ag-theme-alpine"
      [rowData]="rowData"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      (firstDataRendered)="onFirstDataRendered($event)"
      (gridReady)="onGridReady($event)"
    >
    </ag-grid-angular>
  `,

})


export class GridComponent {
  @Input() gridNumber: number | undefined;
  private gridApi: object | undefined;
  private gridColumnApi: object | undefined;

  columnDefs = [{field: 'make'}, {field: 'model'}, {field: 'price'}];
  defaultColDef = {sortable: true, filter: true, flex: 1};
  rowData = [
    {make: 'Toyota', model: 'Celica', price: 35000},
    {make: 'Ford', model: 'Mondeo', price: 32000},
    {make: 'Porsche', model: 'Boxter', price: 72000}
  ];

  onSaveStateToLocal(): void {
    // @ts-ignore
    const filterState = this.gridApi.getFilterModel();
    // @ts-ignore
    const columnState: void = this.gridColumnApi.getColumnState();
    console.log('saved filterState & columnState');
    localStorage.setItem(`filterState-gridNum-${this.gridNumber}`, JSON.stringify(filterState));
    localStorage.setItem(`columnState-gridNum-${this.gridNumber}`, JSON.stringify(columnState));

  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onFirstDataRendered(params: any): void {
    if (localStorage[`filterState-gridNum-${this.gridNumber}`]) {
      params.api.setFilterModel(JSON.parse(localStorage[`filterState-gridNum-${this.gridNumber}`]));
    }
    if (localStorage[`columnState-gridNum-${this.gridNumber}`]) {
      params.columnApi.setColumnState(JSON.parse(localStorage[`columnState-gridNum-${this.gridNumber}`]));
    }
  }
}
