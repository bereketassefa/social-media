import { Component, OnInit, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { FileUploadService } from '../upload-task/file-upload.service';


@Component({
  selector: 'upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.css']
})
export class UploadTaskComponent implements OnInit {

  @Input() file: File;

  @Output() onMultipleImageUploaded: EventEmitter<string> = new EventEmitter()
  task: AngularFireUploadTask;

  percentage: Observable<number | undefined>;
  snapshot: Observable<any>;
  downloadURL: string;
  public imageUrl: String[] = [];

  @Output() imageUploadedEvent = new EventEmitter<String[]>();

  constructor(private storage: AngularFireStorage, private db: AngularFirestore, private fileservice: FileUploadService) { }

  ngOnInit() {
    this.startUpload();

    this.fileservice.clearUrls();
  }

  startUpload() {
    const path = `MultipleImages/${Date.now()}_${this.file.name}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, this.file);
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        //  console.log('The download urls '+this.downloadURL);
        this.fileservice.addUploadedUrl(this.downloadURL);
        this.imageUrl = this.fileservice.getUrls();
        // console.log("URLLLS=>", this.imageUrl);
        // console.log("URLLLS=>", this.fileservice.getUrls());
        this.imageUploadedEvent.emit(this.fileservice.getUrls());
      }),
    );
  }

  isActive(snapshot: { state: string; bytesTransferred: number; totalBytes: number; }) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}