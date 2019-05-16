import { Component, OnInit, ViewChild } from '@angular/core';

import { FirebaseDataTreatmentService } from '../../services/firebase-data-treatment-service/firebase-data-treatment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.page.html',
  styleUrls: ['./add-song.page.scss'],
})
export class AddSongPage implements OnInit {

  dataUnwritten = false;
  error = '';
  @ViewChild('fileInput') fileInput;

  constructor(
    private firebaseDT: FirebaseDataTreatmentService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  addSong(form) {
    const fi = this.fileInput.nativeElement;
    const fileToUpload = fi.files[0];
    console.log(fileToUpload);

    this.firebaseDT.saveSong(form.value, fileToUpload)
    .then(() => {
      this.router.navigateByUrl('/menu/playlist');
    })
    .catch((error) => {
      this.dataUnwritten = true;
      this.error = error;
      console.log(error);
    });

  }

}
