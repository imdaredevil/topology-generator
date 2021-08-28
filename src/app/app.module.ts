import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextViewComponent } from './text-view/text-view.component';
import { VisualViewComponent } from './visual-view/visual-view.component';
import { NodeComponent } from './node/node.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EdgeComponent } from './edge/edge.component';
import { NodeCreatorComponent } from './node-creator/node-creator.component';

@NgModule({
  declarations: [
    AppComponent,
    TextViewComponent,
    VisualViewComponent,
    NodeComponent,
    EdgeComponent,
    NodeCreatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
