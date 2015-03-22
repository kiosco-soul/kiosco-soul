'use strict';

// Configuring the Articles module
angular.module('products').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Productos', 'products', 'dropdown', '/products(/create)?');
		Menus.addSubMenuItem('topbar', 'products', 'Listado', 'products');
		Menus.addSubMenuItem('topbar', 'products', 'Nuevo', 'products/create');
	}
]);
