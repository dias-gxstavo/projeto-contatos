import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarContatosFirebasePage } from './listar-contatos-firebase.page';

describe('ListarContatosFirebasePage', () => {
  let component: ListarContatosFirebasePage;
  let fixture: ComponentFixture<ListarContatosFirebasePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarContatosFirebasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
