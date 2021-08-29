import { Component } from '@angular/core';
import { Node, Edge } from './data-objects';
import { MatDialog } from '@angular/material/dialog';
import { NodeRenamerComponent } from './node-renamer/node-renamer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'topology-generator';
  nodeDataList: Node[] = [{
    name: 'drag to create nodes',
    x: window.innerWidth*0.7*0.95,
    y: 10,
    isCreator: true,
  }];
  edgeDataList: Edge [] = [];
  instructions: string [] = [];
  inputError: string | null = null;
  constructor(public dialog: MatDialog) {

  }
  appendNode(nodeIndex: number): void {
      const currentNode = this.nodeDataList[nodeIndex];
      currentNode.isCreator = false;
      let newName = 'node_' + (nodeIndex + 1);
      let i = 1;
      while(this.nodeDataList.find((node: Node) => node.name === newName)) {
        newName = 'node_' + (++i);
      }
      currentNode.name = newName;
      this.nodeDataList[nodeIndex] = currentNode; 
      this.nodeDataList.push({
          name: 'drag to create nodes',
          x: window.innerWidth*0.65,
          y: 10,
          isCreator: true,
      });
      
      this.instructions.push('Node ' + currentNode.name);
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
    let isValid = false, error = null;
    if(words[0] === 'Link' && words.length == 3) {
      let src = this.nodeDataList.findIndex((node: Node) => node.name == words[1]);
      let dest = this.nodeDataList.findIndex((node: Node) => node.name == words[2]);
      if(src > -1 && dest > -1) {
        let created = this._createLink([src,dest]);
        if(!created) {
          this.inputError = 'Link already present';
        } else {
          isValid = true;
        }
      } else {
        this.inputError = 'source or destination node not present';
      }
    } else if(words[0] === 'Node' && words.length == 2) {
      let existing = this.nodeDataList.findIndex((node: Node) => node.name == words[1]);
      if(existing == -1) { 
      const element = document.querySelector('.plot');
      let newX = 0.2 * window.innerWidth;
      let newY = 0.2 * window.innerHeight;
      if(element) {
        newX += element.scrollLeft;
        newY += element.scrollTop;
      } 
      this.nodeDataList.push({
        name: words[1],
        x: newX,
        y: newY,
        isCreator: false,
      });
      isValid = true;
    } else {
      this.inputError = 'node already present with name ' + words[1];
    }
    } else {
      this.inputError = "The format is 'Node <nodeName>' or 'Link <nodename> <nodename>'" 
    }
    if(isValid) {
      this.instructions.push(instruction);
      this.inputError = null;
    }
  }
  renameNode(nodeIndex: number, error? : boolean): void {
    const dialogRef = this.dialog.open(NodeRenamerComponent, {
      data: { 
        name: this.nodeDataList[nodeIndex].name,
        error: error,
      },
    });
    dialogRef.afterClosed().subscribe(data => {
      const existingIndex = this.nodeDataList.findIndex((node : Node) => node.name == data);
      if(existingIndex == -1 || existingIndex == nodeIndex) {
        this.instructions.push('ename ' + this.nodeDataList[nodeIndex].name + ' ' + data);
        this.nodeDataList[nodeIndex].name = data;
      } else {
        this.renameNode(nodeIndex, true);
      }
    });
  }
}
