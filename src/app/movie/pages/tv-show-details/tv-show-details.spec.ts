import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowDetails } from './tv-show-details';

describe('TvShowDetails', () => {
  let component: TvShowDetails;
  let fixture: ComponentFixture<TvShowDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvShowDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvShowDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
