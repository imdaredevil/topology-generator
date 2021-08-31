import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import { Node } from '../data-objects';
import { Measurements, Errors } from '../constants';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  step(): void {
    const visualView = document.querySelector('.plot');
    if(visualView && this.nodeData.isCreator) {
      this.nodeData.x =  Measurements.CREATOR_NODE_LEFT + visualView.scrollLeft;
      this.nodeData.y = Measurements.CREATOR_NODE_TOP + visualView.scrollTop;
    }
    window.requestAnimationFrame(() => this.step());
  }

  constructor() { 
    window.requestAnimationFrame(() => this.step());
  }
  isDragging: boolean = false;
  @Input() nodeData: Node = {
    name: '',
    x: 0,
    y: 0,
    isCreator: false,
  }; 
  @Output() changeNodeData: EventEmitter<Node> = new EventEmitter<Node>();
  @Input() nodeNumber: number = -1;
  @Input() currentLinkNode: number = -1;
  @Output() currentLinkNodeChange = new EventEmitter<number>();
  @Output() createNewNode: EventEmitter<number> = new EventEmitter<number>();
  @Output() linkNode: EventEmitter<number> = new EventEmitter();
  @Output() renameNode: EventEmitter<number> = new EventEmitter();
  previousNodePositionData : Node = this.nodeData;
  ngOnInit(): void {
    
  }
  updateCreator(event: CdkDragStart): void {
    if(this.nodeData.isCreator) {
      this.createNewNode.emit(this.nodeNumber);
    }
    this.previousNodePositionData = {
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
    const newX = this.previousNodePositionData.x + event.distance.x;
    const newY = this.previousNodePositionData.y + event.distance.y;
    if(newX > 0 && newX < Measurements.VISUAL_VIEW_FULL_WIDTH) {
      this.nodeData.x = newX;
    }
    if(newY > 0 && newY < Measurements.VISUAL_VIEW_FULL_HEIGHT) {
      this.nodeData.y = newY;
    }
    const visualView = document.querySelector('.plot');
    if(visualView) {
      let newScrollX = 0;
      let newScrollY = 0;
      if(newX + Measurements.SCROLL_THRESHOLD > window.innerWidth*0.7 + visualView.scrollLeft || newX < visualView.scrollLeft) {
        visualView.scrollBy(event.delta.x,0);
      }
      if(newY + Measurements.SCROLL_THRESHOLD > window.innerHeight + visualView.scrollTop || newY < visualView.scrollTop) {
        visualView.scrollBy(event.delta.y,0);
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

  openRenameBox(): boolean {
    if (!this.nodeData.isCreator) {
      this.renameNode.emit(this.nodeNumber);
    } 
   return false;
  }
  
}
