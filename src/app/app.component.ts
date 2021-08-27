import { Component } from '@angular/core';
import { Node } from './data-objects';

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

  appendNode(newNode: Node): void {
      this.nodeDataList.push({
          name: 'drag to create nodes',
          x: window.innerWidth*0.65,
          y: 10,
          isCreator: true,
      });
  }
  
}
