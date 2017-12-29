import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ej2ButtonComponent } from './button.component'
import { ej2datepickerComponent } from './datepicker.component'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  entryComponents: [ej2ButtonComponent, ej2datepickerComponent],
})
export class AppComponent {
public components: string[] =[];
  constructor(private componentResolver: ComponentFactoryResolver, protected viewContainerRef: ViewContainerRef) { }

  public addComponent(ej2Component: any) {
    let componentFactory = this.componentResolver.resolveComponentFactory(ej2Component);
    const ref = this.viewContainerRef.createComponent(componentFactory);
    document.getElementById("iframe").appendChild(ref.location.nativeElement)
  }
  public dragstart(e: any) {
    e.dataTransfer.setData("text", e.target.id)
  }

  public dragover(e: any) {
    e.preventDefault();
  }
  public drop(e: any) {
    let id = e.dataTransfer.getData("text")
    switch(id){
      case 'button':
      this.addComponent(ej2ButtonComponent);
      this.components.push(id);
      break;
      case 'datepicker':
      this.addComponent(ej2datepickerComponent)
      this.components.push(id);
      break;
    }

  }
}
