import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSaleComponent } from './data-sale.component';

describe('DataSaleComponent', () => {
  let component: DataSaleComponent;
  let fixture: ComponentFixture<DataSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
