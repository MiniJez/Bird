import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSongPage } from './add-song.page';

describe('AddSongPage', () => {
  let component: AddSongPage;
  let fixture: ComponentFixture<AddSongPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSongPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSongPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
