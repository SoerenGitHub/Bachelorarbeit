import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, forwardRef } from '@angular/core';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => TextboxComponent),
    }
  ]
})
export class TextboxComponent implements OnInit, ControlValueAccessor {

  @Input()
  type: string;

  @Input()
  autocomplete: string;

  @Input()
  icon: string;

  public input = new FormControl('');
  private iconURL: string;

  private OnChange: (text: string) => void;
  private onTouched: () => void;

  @ViewChild('label', {static: true})
  label: ElementRef;

  @ViewChild('textbox', {static: true})
  textbox: ElementRef;

  constructor(private readonly renderer: Renderer2) { }

  get iconSRC() {
    return this.iconURL;
  }

  writeValue(obj: any): void {
    if (obj === null) {
      this.resetStyle();
      this.input.reset();
    }
    this.input.setValue(obj);
  }
  registerOnChange(fn: any): void {
    this.OnChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.input.disable();
    } else {
      this.input.enable();
    }
  }

  ngOnInit() {
    this.setUpIcon();
  }

  private async setUpIcon() {
    if (this.icon) {
      const url = require('../../../../../assets/' + this.icon);
      this.iconURL = url;
    }
  }

  onInput() {
    this.OnChange(this.input.value);
    this.determineBorder();
  }

  onClick() {
    if (this.label
    && this.label.nativeElement
    && this.textbox
    && this.textbox.nativeElement) {
      this.textbox.nativeElement.focus();
      this.renderer.setStyle(this.label.nativeElement, 'transform', 'translate(40px, 8px)');
      this.renderer.setStyle(this.label.nativeElement, 'font-size', '10px');
      this.renderer.setStyle(this.label.nativeElement, 'color', '#B56464');
      this.renderer.setStyle(this.textbox.nativeElement, 'border-bottom', '1px solid #B56464');
    }
  }

  async onBlur() {
    if (this.textbox && this.textbox.nativeElement && this.textbox.nativeElement.value.length === 0) {
      this.determineBorder();
      this.resetStyle();
    }
  }

  async resetStyle() {
    if (this.textbox
    && this.textbox.nativeElement
    && this.label
    && this.label.nativeElement) {
      this.renderer.setStyle(this.label.nativeElement, 'transform', 'translate(40px, 14px)');
      this.renderer.setStyle(this.label.nativeElement, 'font-size', '');
      this.renderer.setStyle(this.label.nativeElement, 'color', 'rgb(173, 173, 173)');
      this.renderer.setStyle(this.textbox.nativeElement, 'border-color', 'rgb(173, 173, 173)');
    }
  }

  async determineBorder() {
    if (this.textbox && this.textbox.nativeElement && this.textbox.nativeElement.value.length > 0) {
      this.renderer.setStyle(this.textbox.nativeElement, 'border-color', '#505050');
    } else {
      this.renderer.setStyle(this.textbox.nativeElement, 'border-color', 'rgb(173, 173, 173)');
    }
  }
}
