import { Component, OnInit } from '@angular/core';
import { UploadService } from 'app/service/upload.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'csv-uploader',
  templateUrl: './csv-uploader.component.html',
  styleUrls: ['./csv-uploader.component.css']
})
export class CsvUploaderComponent implements OnInit {


  public files: any;

  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
  }


  public dropped(files: NgxFileDropEntry) {
    this.files = files;
    // for (const droppedFile of files) {

    //   // Is it a file?
    //   if (droppedFile.fileEntry.isFile) {
    //     const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
    //     fileEntry.file((file: File) => {

    //       // Here you can access the real file
    //       console.log('uploaded csv file', droppedFile.relativePath, file);

    //       /**
    //       // You could upload it like this:
    //       const formData = new FormData()
    //       formData.append('logo', file, relativePath)

    //       // Headers
    //       const headers = new HttpHeaders({
    //         'security-token': 'mytoken'
    //       })

    //       this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
    //       .subscribe(data => {
    //         // Sanitized logo returned from backend
    //       })
    //       **/

    //     });
    //   } else {
    //     // It was a directory (empty directories are added, otherwise only files)
    //     const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
    //     console.log(droppedFile.relativePath, fileEntry);
    //   }
    // }
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }

  public submit() {
    console.log('file', this.files[0].fileEntry.name);
    const formData = new FormData;
    formData.append('file', this.files[0].fileEntry.name);
    this.uploadService.postUpload(formData).subscribe((res: any) => {
      console.log('res', res);
      this.files = [];
      alert('file uploaded');
    }, (error) => {
      console.log('error', error);
      alert('something went wrong');
    });
  }

}
