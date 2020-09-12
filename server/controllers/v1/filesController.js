const DropboxApi = require('../../dropbox/dropbox');
const User = require('../../queries/User');

class FilesController {

  static async userPost (req, res) {
    let id = req.params.id;
    let img = req.files.img.name;    
    
    let fileName = `${id}${Date.now()}us${img}`;
    let path = `/${fileName}`;
    let contents = req.files.img.data;
    
    DropboxApi.on().upload(path, contents, (err, data) => {
      if(err){
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
        
        let user = await User.byId(id);
        let data = await user.update({
          img: User.imageUrl(sharedLink.url)
        });
            
        req.user = data;

        return res.json({
            ok: true,
            data,
            message: "Se actualizo la imagen"
        });
      });
    });
  }

  static async userDestroy (req, res) {
    let id = req.params.id;
    let user = await User.byId(id);

    if(user.img === '/images/default.png' ){
      return res.status(400).json({
        ok: false,
        err: { message: "El usuario aún no cuenta con una imagen" }
      })
    } 

    let cutImg = user.img.split('/');
    let fileName = cutImg[cutImg.length - 1];
    let path = `/${fileName}`;

    DropboxApi.on().delete(path, async (err, response) => {
      if(err){
        return res.status(400).json({
          ok: false,
          err
        })
      }

      let data = await user.update({
        img: '/images/default.png'
      });
      req.user = data;

      return res.json({
        ok: true,
        message: "La imagen se elimino con exito",
        data: response
      });
    });
  }

  static async userUpdate(req, res) {
    let id = req.params.id;
    let img = req.files.img.name;  

    let user = await User.byId(id);

    if(user.img === '/images/default.png'){
      return res.status(400).json({
        ok: false,
        err: { message: "El usuario aún no cuenta con una imagen" }
      })
    } 

    let cutImg = user.img.split('/');
    let fileName = cutImg[cutImg.length - 1];
    let path = `/${fileName}`;

    DropboxApi.on().delete(path, (err, response) => {
      if(err){
        return res.status(400).json({
          ok: false,
          err
        })
      }

      fileName = `${id}${Date.now()}${img}`;
      path = `/${fileName}`;
      let contents = req.files.img.data;

      DropboxApi.on().upload(path, contents, (err, data) => {
        if(err){
          return res.status(500).json({
            ok: false,
            err: {
              name: err.name,
              message: err.message
            }
          });
        }
                
        let dataPath = data.path_display;
                
        DropboxApi.on().sharedLink(dataPath, async (err, sharedLink) => {
          if(err){
            return res.status(500).json({
              ok: false,
              err: {
                name: err.name,
                message: err.message
              }
            }); 
          }

          let data = await user.update({
            img: User.imageUrl(sharedLink.url)
          });
          console.log(data);
          req.user = data;

          return res.json({
            ok: true,
            user: data,
            message: "Se actualizo la imagen"
          });
        });

      });
    });
  }

}

module.exports = { FilesController };