import { DOCUMENT, isPlatformServer } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class PageService {
	private platformId = inject(PLATFORM_ID);
	private document = inject(DOCUMENT);

	public setTitle(title: string): void {
		if (isPlatformServer(this.platformId)) {
			return;
		}
		this.document.title = title;
	}

	public focusTitleH2(): void {
		if (isPlatformServer(this.platformId)) {
			return;
		}
		document.getElementsByTagName('h2')[0] as HTMLHeadingElement;
	}

	public focusTitleH1(): void {
		if (isPlatformServer(this.platformId)) {
			return;
		}
		document.getElementsByTagName('h1')[0] as HTMLHeadingElement;
	}
}
