import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnippetService {
  constructor(private http: HttpClient) {}

  load(snippet: string): Observable<string> {
    return this.http.get(`/assets/snippets/${snippet}`, { responseType: 'text' });
  }
}
