export class MyUploadAdapter {
    loader: any;
    xhr: any;
    constructor( loader ) {
        
        this.loader = loader;
    }
    upload() {
        var data =  this.loader.file
            .then( file => new Promise( ( resolve, reject ) => {
           
                this._initRequest();
                this._initListeners( resolve, reject, file );
                this._sendRequest( file );
            } ) );
            
            return data;
    }
    abort() {
        if ( this.xhr ) {
            this.xhr.abort();
        }
    }
    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();
        xhr.open( 'POST', 'https://localhost:44319/api/Helper/ImageUpload', true ); // TODO change the URL
        xhr.responseType = 'json';
    xhr.setRequestHeader("Accept", "application/json");
    }
    _initListeners( resolve, reject, file ) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = `Couldn't upload file: ${ file.name }.`;
        xhr.addEventListener( 'error', () => reject( genericErrorText ) );
        xhr.addEventListener( 'abort', () => reject() );
        xhr.addEventListener( 'load', () => {
            const response = xhr.response;
            if ( !response || response.error ) {
                return reject( response && response.error ? response.error.message : genericErrorText );
            }
            console.log(response.path,"response")
            resolve({
                default:response.path
            });
        } );
        if ( xhr.upload ) {
            xhr.upload.addEventListener( 'progress', evt => {
                if ( evt.lengthComputable ) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            } );
        }
    }
    _sendRequest( file ) {
       
        const data = new FormData();
        data.append( 'upload', file );
        this.xhr.send( data );
    }
}