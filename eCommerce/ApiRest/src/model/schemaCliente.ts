import { model } from 'mongoose'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const clienteSchema = new Schema({
    usuario: {
        type: String,
        unique: true
    },
    contraseña: String,
    nombre: String,
    primerApellido: String,
    segundoApellido: String,
    email: {
        type: String,
        unique: true
    },
    edad: Number,
    pais: String,
    sexo: String,
    tlf: Number,
    direccion: String,
    socio: Boolean
})

export type iCliente = {
    usuario: string | null
    contraseña: string | null
    nombre: string | null
    primerApellido: string | null
    segundoApellido: string | null
    email: string | null
    edad: number | null
    pais: string | null
    sexo: string | null
    tlf: number | null
    direccion: string | null
    socio: boolean | null
}

export const Clientes = model('clientes', clienteSchema)