'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ProductSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		default: '',
		trim: true,
		required: 'El nombre no puede estar vacio'
	},
	code: {
		type: String,
		default: '',
		trim: true,
		required: 'El codigo no puede estar vacio'
	},
	percentage: {
		type: Number,
		default: 30
	},
	buyPrice: {
		type: Number,
		default: 1
	},
	stock: {
		type: Number,
		default: 0
	},
	minStock: {
		type: Number,
		default: 1
	},
	productType:{
		type: Schema.ObjectId,
		ref: 'Producttype'
	}
});


ProductSchema.methods.sellPrice = function() {
	return this.buyPrice + (this.buyPrice * this.percentage / 100);
};
ProductSchema.methods.sell = function(quantity) {
	this.stock = this.stock - quantity;
	this.save();
};

mongoose.model('Product', ProductSchema);
