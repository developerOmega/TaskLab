const { db } = require('../../../db/db');
const DropboxApi = require('../../dropbox/dropbox');

function imageUrl(url) {
  
  if(url.match(/www.dropbox.com/)){
    let regex = /www.dropbox.com/;
    let imageUrl = url.replace(regex, 'dl.dropboxusercontent.com');
    imageUrl = imageUrl.replace( /[?]dl=0/, '' );
    return imageUrl;
  }

}

class FilesController {

  static async user (req, res) {
    let id = req.params.id;
    let img = req.files.img.name;    
    
    let fileName = `${id}${Date.now()}us${img}`;
    let path = `/${fileName}`;
    let contents = req.files.img.data;
    
    DropboxApi.on().upload(path, contents, (err, data) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                err
            });
        }
            
        let dataPath = data.path_display;
            
        DropboxApi.on().sharedLink(dataPath, async (err, sharedLink) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    err: {message: err.message}
                }); 
            }

            let update = await db.query(
              `UPDATE users SET img=? WHERE id=?`, [ imageUrl(sharedLink.url), id ]
            )

            let data = await db.query( `SELECT * FROM users WHERE id=?`, [id] );
            req.user = data;

            return res.json({
                ok: true,
                data: data[0],
                message: "Se actualizo la imagen"
            });
        })
    
    });
  }

}

module.exports = { FilesController };