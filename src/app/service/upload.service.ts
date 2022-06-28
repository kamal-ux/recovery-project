import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';



@Injectable({ providedIn: 'root' })
    
export class UploadService {
    constructor(private http: HttpClient) { }

    public postUpload(file: FormData
    ) {
        return this.http.post(environment.base_url + 'v1/users/upload', file);
    }

}
