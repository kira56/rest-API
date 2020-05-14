const express = require('express');
const app = express();

let { verificaToken, verificaAdmin_Role } = require('../middleware/authenticacion');

let Categoria = require('../models/categoria');

// Mostrar todas las categorias
app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find()
        .sort('descripcion')
        .populate('usuario','nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            return res.status(200).json({
                ok: true,
                categorias
            })
        });
});

// mostrar categoria por id
app.get('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id
    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            })
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
})

// crear categoria
app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id,
    })
    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.status(200).json({
            ok: true,
            categoria: categoriaDB
        })
    })

})

// modifica categoria
app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let desCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, desCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            categoria: categoriaDB
        })
    });
})
// borra categoria
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    // Solo puede borrar un administrador
    let id = req.params.id;
    Categoria.findByIdAndRemove(id, { new: true }, (err, categoriaBorrada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        };

        if (!categoriaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El Id no existe'
                }
            })
        }

        res.json({
            ok: true,
            message: 'Categoria Borrada',
            categoria: categoriaBorrada
        })

    })

})

module.exports = app;
