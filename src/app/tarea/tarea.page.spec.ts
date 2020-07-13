import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TareaPage } from './tarea.page';

describe('TareaPage', () => {
  let component: TareaPage;
  let fixture: ComponentFixture<TareaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TareaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
