import { Injectable } from '@angular/core';
import { codeToHtml } from 'shiki';

export type SupportedLanguages = 'angular-ts' | 'angular-html' | 'css';

@Injectable({
  providedIn: 'root'
})
export class HighlighterService {
  async highlight(code: string, lang: SupportedLanguages): Promise<string> {
    return codeToHtml(code.trim(), {
      lang,
      theme: 'catppuccin-frappe'
    });
  }
}
