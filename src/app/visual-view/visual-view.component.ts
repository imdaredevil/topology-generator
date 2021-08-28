import { Component, Input, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
import { Node, Edge } from '../data-objects';
@Component({
  selector: 'app-visual-view',
  templateUrl: './visual-view.component.html',
  styleUrls: ['./visual-view.component.css']
})
export class VisualViewComponent implements OnInit {
  constructor(private zone:NgZone) { }

  @Input() nodeData: Node[] = []; 
  @Output() changeNodeDataList: EventEmitter<Node[]> = new EventEmitter<Node[]>();
  @Input() edgeData: Edge [] = []; 

  @Output() appendNode: EventEmitter<Node> = new EventEmitter<Node>();
  @Output() createLink: EventEmitter<number[]> = new EventEmitter<number[]>();


  currentLinkNode: number = -1;
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
  linkNode(nodeIndex: number): void {
      this.createLink.emit([this.currentLinkNode, nodeIndex]);
      this.currentLinkNode = -1;
  }

  changeNodeData(changedNodeData: Node, index: number): void {
    this.nodeData[index] = changedNodeData;
    this.changeNodeDataList.emit(this.nodeData);
  }

}
