import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface NodeRenamePayload {
  error: boolean,
  name: string
}

@Component({
  selector: 'app-node-renamer',
  templateUrl: './node-renamer.component.html',
  styleUrls: ['./node-renamer.component.css']
})
export class NodeRenamerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NodeRenamerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: NodeRenamePayload) { }
  ngOnInit(): void {
  }

}
