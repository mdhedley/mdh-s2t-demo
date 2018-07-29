import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { FileReference } from '../file-reference'
import { AngularFirestoreDocument,AngularFirestore } from 'angularfire2/firestore'
import { AngularFireStorage } from 'angularfire2/storage'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-detail-file',
  templateUrl: './detail-file.component.html',
  styleUrls: ['./detail-file.component.css']
})
export class DetailFileComponent implements OnInit {
  private id: string;
  fileDoc: AngularFirestoreDocument<FileReference>
  fileRef: Observable<FileReference>
  audioURL: string
  startTime: number
  trackTime: number

  constructor(
    private route : ActivatedRoute,
    private location : Location,
    private afs : AngularFirestore,
    private storage : AngularFireStorage
  ) { 
  }
  // Function to define custom styling based on whether the word has been spoken
  positionHighlight(time) {
  
    if (parseInt(time) <= this.trackTime) {
        return {color:'red'}
    }
    return {color:'black'}
  }

  // current time does not update automatically, but you can get the current time from the onTimeUpdate event
  timeUpdate(value) {
    this.trackTime = value.target.currentTime;
  }

  ngOnInit() {
     this.id = this.route.snapshot.params['id']
     console.log(this.id)
     this.fileDoc = this.afs.doc<FileReference>('files/' + this.id)
     this.fileRef = this.fileDoc.valueChanges();
     // grab the requested start time if it exists from the query parameter
     this.route.queryParams.subscribe(params => {
       this.startTime = params['start']
     })
//Get an authenticated audio URL from storage
     this.storage.ref(this.id).getDownloadURL().toPromise().then(url=>{
      this.audioURL = url;
     }
       
     )
     
  }

}
