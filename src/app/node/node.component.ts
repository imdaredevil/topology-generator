import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { CdkDragMove, CdkDragStart, CdkDragEnd } from '@angular/cdk/drag-drop';
import { Node } from '../data-objects';
@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  step(): void {
    const element = document.querySelector('.plot');
    if(element && this.nodeData.isCreator) {
      this.nodeData.x = window.innerWidth * 0.7 * 0.95 + element.scrollLeft;
      this.nodeData.y = 5 + element.scrollTop;
    }
    window.requestAnimationFrame(() => this.step());
  }

  constructor() { 
    window.requestAnimationFrame(() => this.step());
  }
  isDragging: boolean = false;
  @Input() nodeData: Node = {
    name: '',
    x: 5,
    y: 5,
    isCreator: false,
  }; 
  @Output() changeNodeData: EventEmitter<Node> = new EventEmitter<Node>();
  @Input() nodeNumber: number = -1;
  @Input() currentLinkNode: number = -1;
  @Output() currentLinkNodeChange = new EventEmitter<number>();
  @Output() createNewNode: EventEmitter<string> = new EventEmitter<string>();
  @Output() linkNode: EventEmitter<number> = new EventEmitter();
  currentNodeData : Node = this.nodeData;
  ngOnInit(): void {
    
  }
  updateCreator(event: CdkDragStart): void {
    if(this.nodeData.isCreator) {
      this.nodeData.isCreator = false;
      this.nodeData.name = 'node_' + (this.nodeNumber + 1);
      this.createNewNode.emit(this.nodeData.name);
    }
    this.currentNodeData = {
      name: this.nodeData.name,
      x: this.nodeData.x,
      y: this.nodeData.y,
      isCreator: false,
    }
  } 

  updateCurrentLinkNode(newValue: number): void {
    this.currentLinkNode = newValue;
    this.currentLinkNodeChange.emit(newValue);
  }

  updatePosition(event: CdkDragMove): void {
    this.isDragging = true;
    const newX = this.currentNodeData.x + event.distance.x;
    const newY = this.currentNodeData.y + event.distance.y;
    if(newX > 0 && newX < 1.4*window.innerWidth) {
      this.nodeData.x = newX;
    } else {
      console.log('x restrict');
    }
    if(newY > 0 && newY < 1.5*window.innerHeight) {
      this.nodeData.y = newY;
    }
    const element = document.querySelector('.plot');
    if(element) {
      let newScrollX = 0;
      let newScrollY = 0;
      if(newX + 40 > window.innerWidth*0.7 + element.scrollLeft || newX < element.scrollLeft) {
        element.scrollBy(event.delta.x,0);
      }
      if(newY + 40 > window.innerHeight + element.scrollTop || newY < element.scrollTop) {
        element.scrollBy(event.delta.y,0);
      }
    }
    event.source.element.nativeElement.style.transform = 'none';
    this.changeNodeData.emit(this.nodeData);
  }

  click(): void {
    if(this.nodeData.isCreator) {
      return;
    } else if(this.isDragging == true) {
      this.isDragging = false;
    } else if(this.currentLinkNode == -1) {
      this.updateCurrentLinkNode(this.nodeNumber);
    } else {
      if(this.currentLinkNode != this.nodeNumber) {
        this.linkNode.emit(this.nodeNumber);
      }
      this.updateCurrentLinkNode(-1);     
    }
  }
  
}
