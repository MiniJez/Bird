import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { LocalStorageService } from '../localStorage-service/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataTreatmentService {

  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private localStr: LocalStorageService
    ) { }

  saveSong(value, fileToUpload) {
    const songLinkValue = this.validateYouTubeUrl(value.songLink);
    const tutoLinkValue = this.validateYouTubeUrl(value.tutoLink);

    if (songLinkValue.match('Error:') != null && songLinkValue.match('Error:')[0] === 'Error:') {
      return new Promise<any>((resolve, reject) => {
        reject(songLinkValue);
      });
    } else if (tutoLinkValue.match('Error:') != null && tutoLinkValue.match('Error:')[0] === 'Error:') {
      return new Promise<any>((resolve, reject) => {
        reject(tutoLinkValue);
      });
    } else {
      return new Promise<any>((resolve, reject) => {

        this.fileUpload(fileToUpload, value.songName);

        this.afs.collection('Song').doc(this.afs.createId()).set({
          uid: this.localStr.getUid(),
          songName: value.songName,
          songLink: songLinkValue,
          tutoLink: tutoLinkValue
        })
        .then(() => {
          console.log('Data Successfully written !');
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      });
    }
  }

  fileUpload(file, fileSongName) {
    const uploadTask = this.afStorage.storage.app.storage().ref().child(`files/${this.localStr.getUid()}/${file.name}`).put(file);

    uploadTask.then(() => {
      console.log('Successfully upload file !');
    }).catch((error) => {
      console.log(error);
    });

    this.storeInfoToDatabase(file, fileSongName).then(() => {
      console.log('Successfully save files infos in db !');
    }).catch((error) => {
      console.log(error);
    });
  }

  storeInfoToDatabase(file, fileSongName) {
    return this.afs.collection('files').doc(this.afs.createId()).set({
      name: file.name,
      size: file.size,
      type: file.type,
      uid: this.localStr.getUid(),
      songName: fileSongName
    });
  }

  validateYouTubeUrl(url) {
    if (url !== undefined || url !== '') {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
          url = 'https://www.youtube.com/embed/' + match[2];
          return url;
      } else {
          return 'Error: url not valid';
      }
    }
  }

  getUserPlaylist() {
    const uid = this.localStr.getUid();
    const retrieDocs = [];

    this.afs.firestore.collection('Song').where('uid', '==', uid).orderBy('songName').get()
    .then((docs) => {
      docs.forEach((doc) => {
        const newDoc = {
          songName: doc.data().songName,
          songLink: doc.data().songLink,
          tutoLink: doc.data().tutoLink,
          docId: doc.id
        };

        retrieDocs.push(newDoc);
      });
    });

    return retrieDocs;
  }

  async getFiles(songName) {
    let fileUrl = '';

    let file;

    await this.afs.firestore.collection('files').where('uid', '==', this.localStr.getUid()).where('songName', '==', songName).get()
    .then((docs) => {
      docs.forEach((doc) => {
        file = {
          name: doc.data().name,
          size: doc.data().size,
          type: doc.data().type,
          uid: doc.data().uid,
          songName: doc.data().songName
        };
      });
    });

    await this.afStorage.ref(`files/${this.localStr.getUid()}/${file.name}`).getDownloadURL().toPromise()
    .then((url) => {
      fileUrl = url;
    }).catch((error) => {
      console.log(error);
    });

    return fileUrl;
  }

  deleteDoc(doc) {
    this.afs.collection('Song').doc(doc.docId).delete()
    .then(() => {
      console.log('Document successfully deleted !');
    });
  }

}
