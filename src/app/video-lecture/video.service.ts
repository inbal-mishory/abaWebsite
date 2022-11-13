import { Injectable } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { IVideo } from '../models/video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private dbPath = '/video-lectures';
  // videosList?: AngularFireList<IVideo>;
  videosRef: AngularFirestoreCollection<IVideo>;
  constructor(private db: AngularFirestore) {
    this.videosRef = db.collection(this.dbPath);
   }

  getAllVideos(): AngularFirestoreCollection<IVideo> {
    return this.videosRef;
  }

  updateVideo(id: string | undefined, data: any) {
    return this.videosRef.doc(id).update(data);
  }

  createVideo(video: IVideo): any {
    return this.videosRef.add({ ...video });
  }

  delete(id: string): Promise<void> {
    return this.videosRef.doc(id).delete();
  }
}
