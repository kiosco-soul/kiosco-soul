'use strict';

// Configuring the Articles module
angular.module('producttypes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Tipos de productos', 'producttypes', 'dropdown', '/producttypes(/create)?');
		Menus.addSubMenuItem('topbar', 'producttypes', 'Listado', 'producttypes');
		Menus.addSubMenuItem('topbar', 'producttypes', 'Nuevo', 'producttypes/create');
	}
]);
