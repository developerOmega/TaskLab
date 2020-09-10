let fetch = require('isomorphic-fetch');
const Dropbox = require('dropbox').Dropbox;
const { dropboxEnv } = require('../../config/config');

class DropboxApi {
    static instance;

    constructor(){
        this.dbx = new Dropbox({accessToken: dropboxEnv, fetch});  
    }

    static on(){
      this.instance = this.instance || new DropboxApi();
      return this.instance;
    }

    listFolder(path, callback){
      this.dbx.filesListFolder({path})
        .then(response => callback(null, response))
        .catch(error => callback(error)); 
    }

    upload(path, contents, callback ){
      this.dbx.filesUpload({path, contents})
        .then( response => callback(null, response))
        .catch( error => callback(error));
    }

    sharedLink(path, callback){
      this.dbx.sharingCreateSharedLinkWithSettings({path})
        .then(response => callback(null, response))
        .catch(error => callback(error));
    }

    delete(path, callback){
      this.dbx.filesDelete({path})
        .then(response => callback(null, response))
        .catch(error => callback(error));
    }

}

module.exports = DropboxApi;

