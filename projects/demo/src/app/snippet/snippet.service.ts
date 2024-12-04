import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnippetService {
  private http = inject(HttpClient);

  load(snippet: string): Observable<string> {
    return this.http.get(`/snippets/${snippet}`, { responseType: 'text' });
  }
}
