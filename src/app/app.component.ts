import { Component } from '@angular/core';


import * as DecoupledEditor from '../assets/ckeditor5-build-decoupled-document';
import { MyUploadAdapter } from './myuploadAdapter';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	public Editor = DecoupledEditor;
	// public editor?: CKEditor5.Editor;


	public onReady(editor: DecoupledEditor) {

		editor.ui.getEditableElement().parentElement.insertBefore(
			editor.ui.view.toolbar.element,
			editor.ui.getEditableElement(),

		);
		editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
			return new MyUploadAdapter(loader);

		};
	}
}
