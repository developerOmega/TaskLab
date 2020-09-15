
// Middleware que valida la extencion del archivo como una imagen
// Recibe parametros -> req:reqObject (request), res:resObject (response), next:any (llamar funcion para salir de middleware)
const validateFiles = (req, res, next) => {
    if(!req.files){
        return res.status(400).json({
            ok: false,
            err: {
                message: "No se ha seleccionado ningun archivo"
            }
        });
    }

    let img = req.files.img.name;
    let cutName = img.split('.');
    let extension = cutName[cutName.length - 1];

    let validExtension = ['png', 'jpg', 'gif', 'jpeg', 'JPEG'];

    if(validExtension.indexOf(extension) < 0){
        return res.status(400).json({
            ok: false,
            err: {
                message: `Las extenciones permitidas son: ${ validExtension.join(', ') }.`
            }
        })    
    }

    next();
}

module.exports = { validateFiles }
