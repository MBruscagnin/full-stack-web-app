"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModel = exports.getSchema = exports.isBook = void 0;
const mongoose = require("mongoose");
// User defined type guard
// Type checking cannot be performed during the execution (we don't have the Book interface anyway)
// but we can create a function to check if the supplied parameter is compatible with a given type
//
// A better approach is to use JSON schema
//
function isBook(arg) {
    return arg
        && arg.id && arg.id == 'number'
        && arg.title && typeof (arg.title) == 'string'
        && arg.university && typeof (arg.university) == 'string'
        && arg.course && typeof (arg.course) == 'string'
        && arg.auctiondeadline && arg.auctiondeadline instanceof Date
        && arg.startprice && arg.startprice == 'number'
        && arg.reserveprize && arg.reserveprize == 'number'
        && arg.zone && typeof (arg.zone) == 'string'
        && arg.seller && typeof (arg.seller) == 'string';
}
exports.isBook = isBook;
// We use Mongoose to perform the ODM between our application and
// mongodb. To do that we need to create a Schema and an associated
// data model that will be mapped into a mongodb collection
//
// Type checking cannot be enforced at runtime so we must take care
// of correctly matching the Message interface with the messageSchema 
//
// Mongoose Schema
var messageSchema = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.Number,
        required: false
    },
    title: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    university: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    course: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    auctiondeadline: {
        type: mongoose.SchemaTypes.Date,
        required: true
    },
    startprice: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    reserveprize: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    zone: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    seller: {
        type: mongoose.SchemaTypes.String,
        required: true
    }
});
function getSchema() { return messageSchema; }
exports.getSchema = getSchema;
// Mongoose Model
var bookModel; // This is not exposed outside the model
function getModel() {
    if (!bookModel) {
        bookModel = mongoose.model('Book', getSchema());
    }
    return bookModel;
}
exports.getModel = getModel;
//# sourceMappingURL=Book.js.map