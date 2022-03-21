import { Request, Response, Router } from 'express'
import { Dirent } from 'fs'
import { userInfo } from 'os'
import { stringify } from 'querystring'
import { db } from '../database/database'
import { Clientes } from '../model/schemaCliente'

class DatoRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }

    get router() {
        return this._router
    }

    private getCliente = async (req:Request, res: Response) => {
        const contraseña = req.params.contraseña
        const usuario = req.params.usuario
        await db.conectarBD()
        .then(async (mensaje) => {
            const query = await Clientes.findOne({ usuario: usuario, contraseña: contraseña })
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private getClientes = async (req:Request, res: Response) => {
        await db.conectarBD()
        .then(async (mensaje) => {
            const query = await Clientes.find({})
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }
    
    private postCliente = async (req: Request, res: Response) => {
        const { usuario, contraseña, nombre, primerApellido, segundoApellido, email, edad, pais, sexo, tlf, direccion, socio } = req.body
        await db.conectarBD()
        const dSchema={
            usuario: usuario,
            contraseña: contraseña,
            nombre: nombre,
            primerApellido: primerApellido,
            segundoApellido: segundoApellido,
            email: email,
            edad: edad,
            pais: pais,
            sexo: sexo,
            tlf: tlf,
            direccion: direccion,
            socio: socio
        }
        const oSchema = new Clientes(dSchema)
        await oSchema.save()
            .then( (doc: any) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }

    private putCliente = async (req: Request, res: Response) => {
        await db
          .conectarBD()
          .then(async (mensaje) => {
            const { usuario } = req.params
            const { contraseña, nombre, primerApellido, segundoApellido, email, edad, pais, sexo, tlf, direccion, socio } = req.body
            await Clientes.findOneAndUpdate(
              {
                usuario: usuario,
              },
              {
                usuario: usuario,
                contraseña: contraseña,
                nombre: nombre,
                primerApellido: primerApellido,
                segundoApellido: segundoApellido,
                email,
                edad: edad,
                pais: pais,
                sexo: sexo,
                tlf: tlf,
                direccion: direccion,
                socio: socio
              },
              {
                new: true,
              }
            )
              .then((docu: any) => res.send(docu))
              .catch((fail: any) => res.send(fail));
          })
          .catch((mensaje) => {
            res.send(mensaje);
          });
    
        db.desconectarBD();
    }

    private deleteCliente = async (req: Request, res: Response) => {
        const usuario  = req.params.usuario
        await db.conectarBD()
        await Clientes.findOneAndDelete({ usuario: usuario })
            .then( (doc: any) => res.send('Borrado correcto'))
            .catch( (err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }

    misRutas() {
        this._router.get('/getCliente/:usuario/:contraseña', this.getCliente),
        this._router.get('/getClientes', this.getClientes),
        this._router.post('/postCliente', this.postCliente),
        this._router.put("/putCliente/:usuario", this.putCliente),
        this._router.delete("/delCliente/:usuario", this.deleteCliente) 
    }

}

const obj = new DatoRoutes()
obj.misRutas()
export const routes = obj.router