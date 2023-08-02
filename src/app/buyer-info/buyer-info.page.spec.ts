import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuyerInfoPage } from './buyer-info.page';

describe('BuyerInfoPage', () => {
  let component: BuyerInfoPage;
  let fixture: ComponentFixture<BuyerInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuyerInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
