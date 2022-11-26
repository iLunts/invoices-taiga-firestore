// import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
// import { AngularFireStorage } from '@angular/fire/storage';
// import { finalize } from 'rxjs/operators';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// import { AuthService } from './auth.service';
// import { FileUpload } from '../models/fileUpload.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class FileUploadService {
//   private basePath = '/uploads';

//   constructor(
//     private _afStorage: AngularFireStorage,
//     private _afDB: AngularFireDatabase,
//     private authService: AuthService
//   ) {}

//   pushFileToStorage(fileUpload: FileUpload): Observable<number> {
//     const filePath = `${this.basePath}/${this.authService.getUserId()}/${
//       fileUpload.file.name
//     }`;
//     const storageRef = this._afStorage.ref(filePath);
//     const uploadTask = this._afStorage.upload(
//       filePath,
//       fileUpload?.file || null
//     );

//     uploadTask
//       .snapshotChanges()
//       .pipe(
//         finalize(() => {
//           storageRef.getDownloadURL().subscribe((downloadURL) => {
//             fileUpload.url = downloadURL;
//             fileUpload.name = fileUpload.file.name;
//             fileUpload.type = fileUpload.file.type;
//             fileUpload.size = fileUpload.file.size;
//             fileUpload.lastModified = fileUpload.file.lastModified;
//             fileUpload._userId = this.authService.getUserId();
//             this.saveFileData(fileUpload);
//           });
//         })
//       )
//       .subscribe();

//     return uploadTask.percentageChanges();
//   }

//   private saveFileData(fileUpload: FileUpload): void {
//     this._afDB.list(this.basePath).push(fileUpload);
//   }

//   getFiles(numberItems): AngularFireList<FileUpload> {
//     return this._afDB.list(this.basePath, (ref) =>
//       ref.limitToLast(numberItems)
//     );
//   }

//   deleteFile(fileUpload: FileUpload): void {
//     this.deleteFileDatabase(fileUpload.key)
//       .then(() => {
//         this.deleteFileStorage(fileUpload.name);
//       })
//       .catch((error) => console.log(error));
//   }

//   private deleteFileDatabase(key: string): Promise<void> {
//     return this._afDB.list(this.basePath).remove(key);
//   }

//   private deleteFileStorage(name: string): void {
//     const storageRef = this._afStorage.ref(this.basePath);
//     storageRef.child(name).delete();
//   }
// }
