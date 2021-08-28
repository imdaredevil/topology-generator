import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-text-view',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.css']
})
export class TextViewComponent implements OnInit {

  constructor() { }
  @Input() instructions: string[] = [];
  @Output() addInstruction: EventEmitter<string> = new EventEmitter<string>(); 
  @ViewChild('inputField') instructionInput: ElementRef = new ElementRef('');
  ngOnInit(): void {
  }
  onEnter(newInstruction: string): void {
   this.addInstruction.emit(newInstruction);
   this.instructionInput.nativeElement.value = '';
  } 

}
