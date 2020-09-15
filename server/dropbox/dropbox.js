let fetch = require('isomorphic-fetch');
const Dropbox = require('dropbox').Dropbox;
const { dropboxEnv } = require('../../config/config');

// Clase que administra Api de Dropbox

class DropboxApi {

    // Propiedad estatcia que contendra la instancia de la clase
    static instance;

    // Constructor inicializa propiedad 'dbx' que almacena la instantcia de la API de Dropbox
    constructor(){
        this.dbx = new Dropbox({accessToken: dropboxEnv, fetch});  
    }

    // Metodo que retorna la instancia de la calse
    static on(){
      this.instance = this.instance || new DropboxApi();
      return this.instance;
    }

    // Metodo que ejecuta un promesa que retorna el contenido de la carpeta de Dropbox
    // Recibe parametros -> path:string (pathname de carpeta), callback:function (codigo de respuesta)
    listFolder(path, callback){
      this.dbx.filesListFolder({path})
        .then(response => callback(null, response))
        .catch(error => callback(error)); 
    }

    // Metodo que ejecuta una promesa que sube archivos al servidos de Dropbox
    // Recibe parametros -> path:string (/nombre_del_archivo), contents:file (archivo), callback:function (codigo de respuesta)
    upload(path, contents, callback ){
      this.dbx.filesUpload({path, contents})
        .then( response => callback(null, response))
        .catch( error => callback(error));
    }

    // Metodo que ejecuta una promesa que genera un URL publico para el archivo de Dropbox
    // Recibe parametros -> path:string (/nombre_del_archivo), callback:function (codigo de respuesta)    
    sharedLink(path, callback){
      this.dbx.sharingCreateSharedLinkWithSettings({path})
        .then(response => callback(null, response))
        .catch(error => callback(error));
    }

    // Metodo que ejecuta una promesa que elimina archivo del servidor Dropbox
    // Recibe parametros -> path:string (/nombre_del_archivo), callback:function (codigo de respuesta)
    delete(path, callback){
      this.dbx.filesDelete({path})
        .then(response => callback(null, response))
        .catch(error => callback(error));
    }

}

module.exports = DropboxApi;

