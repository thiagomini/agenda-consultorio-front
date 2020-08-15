import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConsultaComponent } from './edit-consulta.component';

describe('EditConsultaComponent', () => {
  let component: EditConsultaComponent;
  let fixture: ComponentFixture<EditConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
