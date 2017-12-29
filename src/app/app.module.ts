import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from '@syncfusion/ej2-ng-buttons';
import { GridModule } from '@syncfusion/ej2-ng-grids';
import { DropDownListModule } from '@syncfusion/ej2-ng-dropdowns';
import { AccumulationChartModule  } from '@syncfusion/ej2-ng-charts';
import { DatePickerModule } from '@syncfusion/ej2-ng-calendars';
import { ToolbarComponent, ItemDirective, ItemsDirective } from '@syncfusion/ej2-ng-navigations';
import { AppComponent } from './app.component';
import { ej2ButtonComponent } from './button.component';
import { ej2datepickerComponent } from './datepicker.component';
import { ej2GridComponent } from './grid.component';
import { ej2ChartComponent } from './chart.component';
import { ej2DropdownComponent } from './dropdown.component';
import { ej2ToolbarComponent } from './toolbar.component';


@NgModule({
  imports: [
    BrowserModule,
    ButtonModule,
    DatePickerModule,
    GridModule,
    AccumulationChartModule,
    DropDownListModule
  ],
  declarations: [
    AppComponent,
    ej2ButtonComponent,
    ej2datepickerComponent,
    ej2GridComponent,
    ej2ChartComponent,
    ej2DropdownComponent,
    ToolbarComponent,
    ItemDirective,
    ItemsDirective,
    ej2ToolbarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
