import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Node } from '../data-objects';
@Component({
  selector: 'app-visual-view',
  templateUrl: './visual-view.component.html',
  styleUrls: ['./visual-view.component.css']
})
export class VisualViewComponent implements OnInit {
  constructor() { }

  @Input() nodeData: Node[] = []; 
  
  @Output() appendNode: EventEmitter<Node> = new EventEmitter<Node>();

  ngOnInit(): void {
  }
  createNewNode(): void {
      this.appendNode.emit({
          name: 'drag to create nodes',
          x: window.innerWidth*0.65,
          y: 10,
          isCreator: true,
      });
  }

}
