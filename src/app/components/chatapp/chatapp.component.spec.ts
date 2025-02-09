import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatappComponent } from './chatapp.component';

describe('ChatappComponent', () => {
  let component: ChatappComponent;
  let fixture: ComponentFixture<ChatappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatappComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
