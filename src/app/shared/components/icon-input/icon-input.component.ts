import { NgForm } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-icon-input',
  templateUrl: './icon-input.component.html',
  styleUrls: ['./icon-input.component.scss']
})
export class IconInputComponent implements OnInit {
  @Input() icon = '';
  @Input() value ?= '';
  @Input() type ?= 'text';
  @Input() disabled ?= false;
  @Input() placeholder ?= '';

  @Output() change ?= new EventEmitter();

  constructor() { }

  ngOnInit() { }
}
