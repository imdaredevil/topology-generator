import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import { Node } from '../data-objects';
@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  constructor() { }
  @Input() nodeData: Node = {
    name: '',
    x: 5,
    y: 5,
    isCreator: false,
  }; 
  @Output() createNewNode: EventEmitter<any> = new EventEmitter();
  currentNodeData : Node = this.nodeData;
  ngOnInit(): void {
  }
  updateCreator(event: CdkDragStart): void {
    if(this.nodeData.isCreator) {
      this.nodeData.isCreator = false;
      this.nodeData.name = 'unnamed node';
      this.createNewNode.emit();
    }
    this.currentNodeData = {
      name: this.nodeData.name,
      x: this.nodeData.x,
      y: this.nodeData.y,
      isCreator: false,
    }
  } 
  updatePosition(event: CdkDragMove): void {
    this.nodeData.x = this.currentNodeData.x + event.distance.x;
    this.nodeData.y = this.currentNodeData.y + event.distance.y;
    event.source.element.nativeElement.style.transform = 'none';
  }
  
}
