import { Component, OnInit } from '@angular/core';
import { FirebaseDataTreatmentService } from 'src/app/services/firebase-data-treatment-service/firebase-data-treatment.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/services/Authentication-service/authentication.service';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements OnInit {

  docs: any[];
  doc: {
    songName: string,
    songLink: SafeResourceUrl,
    tutoLink: SafeResourceUrl
  };
  displayVideo = false;
  fileUrl: string;

  constructor(
    private firebaseDT: FirebaseDataTreatmentService,
    private sanitizer: DomSanitizer,
    private auth: AuthenticationService,
    private router: Router,
    private iab: InAppBrowser
  ) { }

  ngOnInit() {
    if (!this.auth.isUserAuthenticate()) {
      this.router.navigateByUrl('/login');
    }
  }

  async ionViewDidEnter() {
    this.docs = this.firebaseDT.getUserPlaylist();
  }

  async showVideo(doc) {
    this.doc = {
      songName: doc.songName,
      songLink: this.trustUrl(doc.songLink),
      tutoLink: this.trustUrl(doc.tutoLink)
    };

    this.fileUrl = await this.firebaseDT.getFiles(doc.songName);
    this.displayVideo = true;
  }

  unShowVideo() {
    this.displayVideo = false;
  }

  delete(doc) {
    this.firebaseDT.deleteDoc(doc);
  }

  trustUrl(url): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  showTab() {
    this.iab.create(this.fileUrl);
  }
}
