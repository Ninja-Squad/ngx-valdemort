import { Injectable } from '@angular/core';
import * as prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Injectable({
  providedIn: 'root'
})
export class PrismService {
  highlight(code: string, lang: string): string {
    return prism.highlight(code.toString().trim(), prism.languages[lang], lang);
  }
}
