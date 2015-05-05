'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Sale Schema
 */
var SaleSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	soldProducts:[{
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
		buyPrice: {
			type: Number,
			default: 1
		},
		sellPrice: {
			type: Number,
			default: 0
		},
		quantity: {
			type: Number,
			default: 1
		},
		productType:{
			type: Schema.ObjectId,
			ref: 'Producttype'
		}
	}],
	total : {type: Number}
});

SaleSchema.methods.addProduct = function(product, quantity) {
	var productSold = {
		name: product.name,
		code: product.code,
		buyPrice: product.buyPrice,
		sellPrice: product.sellPrice(),
		quantity: quantity,
		productType: product.prototype
	};
	this.soldProducts.push(productSold);
	this.total = this.total + (productSold.sellPrice * quantity);
};

mongoose.model('Sale', SaleSchema);
