import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-authcard',
  templateUrl: './authcard.component.html',
  styleUrls: ['./authcard.component.scss']
})

export class AuthCardComponent implements OnInit {

  private _comp: number = 0;

  @Output()
  onRegister: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  @Output()
  onLogin: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  get comp(): number {
    return this._comp;
  }

  constructor() {
  }

  ngOnInit() {
  }

  async loginbtnClick() {
    this._comp = 0;
  }

  async registerbtnClick() {
    this._comp = 1;
  }
}
