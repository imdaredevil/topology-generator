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
  instructions: string [] = [];

  appendNode(nodeName: string): void {
      this.nodeDataList.push({
          name: 'drag to create nodes',
          x: window.innerWidth*0.65,
          y: 10,
          isCreator: true,
      });
      this.instructions.push('Node ' + nodeName);
  }
  _createLink(nodes: number[]): boolean {
    nodes = nodes.sort();
    let exists = this.edgeDataList.find((e : Edge) => e.source == nodes[0] && e.destination == nodes[1]);
    if(!exists) {
      this.edgeDataList.push({
        source: nodes[0],
        destination: nodes[1]
      });
    }
    return !exists;  
  }
  createLink(nodes: number[]): void {
    let created = this._createLink(nodes);
    if(created) {
      this.instructions.push('Link ' + this.nodeDataList[nodes[0]].name 
            + ' ' + this.nodeDataList[nodes[1]].name);
    }
  }
  changeNodeDataList(nodeDataList: Node[]): void {
    this.nodeDataList = nodeDataList;
  }
  addInstruction(instruction: string): void {
    let words = instruction.split(' ');
    let isValid = false;
    if(words[0] === 'Link' && words.length == 3) {
      let src = this.nodeDataList.findIndex((node: Node) => node.name == words[1]);
      let dest = this.nodeDataList.findIndex((node: Node) => node.name == words[2]);
      if(src > -1 && dest > -1) {
        this.createLink([src,dest]);
        isValid = true;
      }
    }
    if(words[0] === 'Node' && words.length == 2) {
      let existing = this.nodeDataList.findIndex((node: Node) => node.name == words[1]);
      if(existing == -1) { 
      this.nodeDataList.push({
        name: words[1],
        x: 10,
        y: 5,
        isCreator: false,
      });
      isValid = true;
    }
    }
    if(isValid) {
      this.instructions.push(instruction);
    }
  }
}
