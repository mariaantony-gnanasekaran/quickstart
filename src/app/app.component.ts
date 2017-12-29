import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ej2ButtonComponent } from './button.component'
import { ej2datepickerComponent } from './datepicker.component'
import { CheckBox } from '@syncfusion/ej2-ng-buttons';
import { createElement, EventHandler } from '@syncfusion/ej2-base';

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

  // Property Panel

  private curInst: any;

  clickHandler(e: Event) {
    if ((e.target as Element).closest('.e-btn')) {
      this.curInst = (e.target as any).closest('.e-btn').ej2_instances[0];
      this.createPropertiesElement(this.curInst.properties);
    } else if ((e.target as Element).closest('.e-checkbox')) {

    } else if ((e.target as Element).closest('.e-input')) {
      this.curInst = (e.target as any).closest('.e-input').ej2_instances[0];
      this.createPropertiesElement(this.curInst.properties);
    }
  }

  createPropertiesElement(objModel: Object) {
    let ele: Element = document.getElementById('propertypanel');
    let inputEle: Element;
    let table: Element = createElement('table');
    let tbody: Element = table.appendChild(createElement('tbody')) as Element;
    ele.innerHTML = '';
    ele.appendChild(table);
    for (let key in objModel) {
      if (typeof (objModel[key]) !== 'object') {
        let tr: Element = createElement('tr');
        tbody.appendChild(tr);
        let td: Element = createElement('td');
        td.appendChild(createElement('label', { innerHTML: key }));
        tr.appendChild(td);
        if (typeof (objModel[key]) === 'string') {
          td = createElement('td');
          let wrapper: Element = createElement('div', { className: 'e-input-group' })
          inputEle = createElement('input', { className: 'e-input', attrs: { 'property': key } });
          wrapper.appendChild(inputEle);
          td.appendChild(wrapper);
          tr.appendChild(td);
          this.addInputEventLister(inputEle);
          this.addEventListener(inputEle);
        } else if (typeof (objModel[key]) === 'boolean') {
          td = createElement('td');
          inputEle = createElement('input', { attrs: { 'property': key } });
          td.appendChild(inputEle);
          tr.appendChild(td);
          this.addEventListener(inputEle);
          let checkbox: CheckBox = new CheckBox({}, inputEle as HTMLInputElement);
        }
      }
    }
  }

  addEventListener(ele: Element) {
    EventHandler.add(ele, 'change', this.changeHandler, this);
  }

  addInputEventLister(ele: Element){
    EventHandler.add(ele, 'focus', this.focusIn, this);
    EventHandler.add(ele, 'blur', this.focusOut, this);
  }

  changeHandler(e: Event) {
    let property: string = (e.target as Element).getAttribute('property');
    if (typeof (this.curInst.properties[property]) === 'boolean') {
      this.curInst[property] = (e.target as HTMLInputElement).checked;
    } else if (typeof (this.curInst.properties[property]) === 'string') {
      this.curInst[property] = (e.target as HTMLInputElement).value;
    }
  }

   //Focus Event function for input component
    public focusIn(target: any): void {
        target.currentTarget.parentElement.classList.add('e-input-focus');
    }

    //FocusOut Event function for input component
    public focusOut(target: any): void {
        target.currentTarget.parentElement.classList.remove('e-input-focus');
    }

}
