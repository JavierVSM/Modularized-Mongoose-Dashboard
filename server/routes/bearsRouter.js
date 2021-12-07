const express = require ('express');
const BearRouter = express.Router();
const {BearController} = require('./../controllers/bearsController');

BearRouter
    .get ('/', BearController.getIndex);

BearRouter
    .get ('/bears/new', BearController.displayNew);

BearRouter
    .get ('/bears/:name', BearController.displayBear);

BearRouter
    .post ('/bears', BearController.addBear);

BearRouter
    .get ('/bears/edit/:name', BearController.displayEditBear);

BearRouter
    .post ('/bears/:id', BearController.editBear);

BearRouter
    .post ('/bears/destroy/:name', BearController.deleteBear);

module.exports={BearRouter};