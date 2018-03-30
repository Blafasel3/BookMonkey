import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

@Directive({
  selector: '[bmDelay]'
})
export class DelayDirective implements OnInit {

  // same name as selector so the value is passed to the attribute directly
  @Input() bmDelay;

  constructor(
    private templateRef: TemplateRef<any>, // access to template
    private viewContainerRef: ViewContainerRef // Referenceon view container of host element
  ) { }

  ngOnInit() {
    setTimeout(() => this.viewContainerRef.createEmbeddedView(this.templateRef), this.bmDelay);
  }

}
