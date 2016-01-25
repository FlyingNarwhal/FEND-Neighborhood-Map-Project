//Locations and info relevant to setting up each Marker on the Map
var InitialLocations = [
{
	name: 'Bagel Man',
	lat: 33.348880,
	lng: -111.976837,
	description: 'Get yourself some decent bagels.',
	url: ''
},{
	name: 'The Soda Shop',
	lat: 33.378187,
	lng:  -111.741916,
	description: 'A unique twist on soda.',
	url: 'thesodashop.co'
},{
	name: 'filler text',
	lat: 33.123,
	lng: -111.123,
	description: '',
	url: ''
},{
	name: 'filler text',
	lat: 33.123,
	lng: -111.789,
	description: '',
	url: ''
},{
	name: 'filler text',
	lat: 33.123,
	lng: -111.456,
	description:'',
	url: ''
}];

var destination = function(data){
	this.name = ko.observable(data.name);
	this.lat = ko.observable(data.lat);
	this.lng = ko.observable(data.lng);
	this.description = ko.observable(data.description);
	this.url = ko.observable(data.url);
}

var map;
var marker;

var ViewModel = function () {
	var that = this;

	this.markerArray = ko.observableArray([]);

	InitialLocations.forEach(function(place){
		that.markerArray.push(new destination(place));
	});

	this.markerArray().forEach(function(place){
		var lat = place.lat;
		var lng = place.lng;
		var position = {lat, lng};
		marker = new google.maps.Marker({
			title: place.title,
			position: position,
			map: map
		});
	});
};

// create a map centered on Gilbert, AZ
var loadMap = function(){
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 33.3500, lng: -111.7892},
		zoom: 12
	});
	loadMarker({lat: 33.3500, lng: -111.7892});
};

var loadMarker = function(position){
	marker = new google.maps.Marker({
		position: position,
		title: 'hello world',
		map: map
	});
}

ko.applyBindings(new ViewModel());