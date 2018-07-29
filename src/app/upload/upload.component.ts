import { Component, OnInit } from '@angular/core';
import { Uploadfile } from '../uploadfile'
import { AngularFireStorage } from 'angularfire2/storage'
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'
import { UUID } from 'angular2-uuid'
import { Observable } from 'rxjs';
import { FileReference } from '../file-reference'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  model = new Uploadfile
  uploadProgress: Observable<number>;

  constructor(private afStorage: AngularFireStorage, private afs: AngularFirestore) { }

  ngOnInit() {
  }
  uploadFile() {
    const id = UUID.UUID()
    const fileref = new FileReference;
    fileref.status = "Pending"
    fileref.title = this.model.title
    fileref.uuid = id
    const updDoc = this.afs.doc<FileReference>('files/'+id)
    updDoc.set(Object.assign({},fileref))
    const ref = this.afStorage.ref(id)
    const task = ref.put(this.model.file)
    this.uploadProgress = task.percentageChanges()
    
  }
  updateFilePath(event) {
    const reader = new FileReader()

    if(event.target.files && event.target.files.length) {
      this.model.file = event.target.files[0]
    }


    console.log(this.model)
  }
}
