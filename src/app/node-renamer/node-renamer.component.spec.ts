import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeRenamerComponent } from './node-renamer.component';

describe('NodeRenamerComponent', () => {
  let component: NodeRenamerComponent;
  let fixture: ComponentFixture<NodeRenamerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeRenamerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeRenamerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
