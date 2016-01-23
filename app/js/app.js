function initMap(){
	$map = ('#map');
	var map = new google.maps.Map($map, {
		center: {lat: -34.397, lng: 150.644},
		zoom: 8,
		writable: true
	});

	return map
};

