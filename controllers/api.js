var express = require('express');
var router = express.Router();
var Product = require('../models/product');

//Models
var Product = require('../models/product')

//VISUALIZAR TODOS LOS PRODUCTOS
router.route('/products')
 .get(function(req, res) {
        Product.find(function(err, products) {
            if (err)
                res.send(err);
            res.json(products);
        });
    });
    
// DAR DE ALTA UN PRODUCTO
router.route('/products')
    .post(function(req, res) {
            
            var product = new Product();    
            product.name = req.body.name; 
            product.sku = req.body.sku;
            product.price = req.body.price;

            // save the bear and check for errors
            product.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: "Creado" });
            });
            
        });

//VER UN PRODUCTO DETERMINADO
//BUSCANDO POR EL NOMBRE   
router.route('/products/:name')

    .get(function(req, res) {
        Product.find({name: req.params.name}, function(err, product) {
            if (err)
                res.send(err);
            res.json(product);
        });
    });

// ACTUALIZAR EL NOMBRE DE UN PRODUCTO CON EL NOMBRE DEL BODY
// BUSCANDO POR EL NOMBRE Y EL sku DEL JSON DE LA URL
router.route('/products/:name')
    .put(function(req, res) {
            Product.update(
                {name:req.params.name},
                {
                    name:req.body.name,
                    sku:req.body.sku
                },
                {upsert: true}, function (err){
                    if(err)
                        res.send(err);
                    res.json({ message: 'Successfully updated' });
                }
                
                
            )                     

    });

//BORRAR UN PRODUCTO 
//BUSCANDO POR EL NOMBRE
router.route('/products/:name')

    .delete(function(req, res) {
        Product.remove({
            name: req.params.name
        }, function(err, products) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });



//routes
Product.methods(['get', 'put', 'post', 'delete']);

//Return router
module.exports = router;