import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoverJogosComponent } from './remover-jogos.component';

describe('RemoverJogosComponent', () => {
  let component: RemoverJogosComponent;
  let fixture: ComponentFixture<RemoverJogosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoverJogosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoverJogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
