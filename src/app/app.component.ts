import { Component } from '@angular/core';
import { Node, Edge } from './data-objects';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'topology-generator';
  nodeDataList: Node[] = [{
    name: 'drag to create nodes',
    x: window.innerWidth*0.65,
    y: 10,
    isCreator: true,
  }];
  edgeDataList: Edge [] = [];

  appendNode(newNode: Node): void {
      this.nodeDataList.push({
          name: 'drag to create nodes',
          x: window.innerWidth*0.65,
          y: 10,
          isCreator: true,
      });
  }
  createLink(nodes: number[]): void {
    nodes = nodes.sort();
    let exists = this.edgeDataList.find((e : Edge) => e.source == nodes[0] && e.destination == nodes[1]);
    if(!exists) {
      this.edgeDataList.push({
        source: nodes[0],
        destination: nodes[1]
      });
    }
  }
  changeNodeDataList(nodeDataList: Node[]): void {
    this.nodeDataList = nodeDataList;
  }
  
}
