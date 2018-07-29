import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { Observable } from 'rxjs';
import { FileReference } from '../file-reference';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  filesCollection: AngularFirestoreCollection<FileReference>
  files: Observable<FileReference[]>
  constructor(private afs: AngularFirestore) {
   }

  ngOnInit() {
    // Get list of file objects from firestore
    this.filesCollection = this.afs.collection<FileReference>('files')
    this.files = this.filesCollection.valueChanges()

  }

}
