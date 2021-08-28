import { Component, Input, OnInit } from '@angular/core';
import { Node, Edge } from '../data-objects';
@Component({
  selector: 'app-edge',
  templateUrl: './edge.component.html',
  styleUrls: ['./edge.component.css']
})
export class EdgeComponent implements OnInit {

  @Input() nodeData: Node[] = [];
  @Input() edgeData: Edge = {
    source: -1,
    destination: -1,
  };
  width: number = 0;
  height: number = 0;
  left: number = 0;
  top: number = 0;
  coordinates: number[][] = [[0,0],[0,0]]
  source: number[] = []
  destination: number[] = []
  constructor() {
   }
  calcProps(): void {
    let source = this.nodeData[this.edgeData.source];
    let destination = this.nodeData[this.edgeData.destination];
    let maxx = Math.max(source.x, destination.x);
    let maxy = Math.max(source.y, destination.y);
    let minx = Math.min(source.x, destination.x);
    let miny = Math.min(source.y, destination.y);
    this.width = maxx - minx;
    this.height = maxy - miny;
    this.left = minx + 13;
    this.top = miny + 13;
    this.coordinates = [[0,0],[this.width,this.height]]
    if(maxx == source.x) {
      this.coordinates[0][0] = this.width;
      this.coordinates[1][0] = 0;
    }
    if(maxy == source.y) {
      this.coordinates[0][1] = this.height;
      this.coordinates[1][1] = 0;
    }
    if(minx == source.x) {
      this.coordinates[0][0] = 0;
      this.coordinates[1][0] = this.width;
    }
    if(miny == source.y) {
      this.coordinates[0][1] = 0;
      this.coordinates[1][1] = this.height;
    }
    this.source = [source.x, source.y];
    this.destination = [destination.x, destination.y];
  }
  ngOnInit(): void {
    this.calcProps();
  }
  ngDoCheck() {
    let source = this.nodeData[this.edgeData.source];
    let destination = this.nodeData[this.edgeData.destination];
    if(source.x != this.source[0] || source.y != this.source[1] || 
      destination.x != this.destination[0] || destination.y != this.destination[1]) {
        this.calcProps();
      }
  }

}
