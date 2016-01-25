/**
*	
*
*
**/
function init(){
	var map = new initMap();
	var infoWindow = new initInfoWindow();
	ko.applyBindings(new ViewModel());
}

function initMap(){
	//create map and center it on Gilbert AZ
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 33.3500, lng: -111.7892},
		zoom: 12,
	});	
};

function initInfoWindow(){
	infoWindow = new google.maps.InfoWindow({pixelOffset: new google.maps.Size(0, -40)});
};


/*
*
*
*
*
**/
var ViewModel = function(){
	var that = this;

	//create a knockout oberservable array, which will hold
	//an object of each 'place' inside PlacesOfInterest
	this.markerArray = ko.observableArray([]);

	PlacesOfInterest.forEach(function(place){
		that.markerArray.push(new destination(place, map))
	});
};


var markerOptions = function(lat, lng, title){
	var position = {lat, lng};
	return {
		position: position,
		title: title,
		map: map
	}
};

//receive clicks from KO, and reset infoWindow with new data
var openWindow = function(data){
	var position = {lat: data.lat(), lng: data.lng()};
	var description = "<strong>" + data.name() + "</strong>" + "<p>" +
	 		data.description() + "</p>" + '<a href="' + data.url() + '">' +
	 		"Visit Website" + "</a>";
	infoWindow.close();
	infoWindow.setContent(description);
	infoWindow.setPosition(position);
	infoWindow.open(map);
};

var destination = function(data){
	this.name = ko.observable(data.name);
	this.lat = ko.observable(data.lat);
	this.lng = ko.observable(data.lng);
	this.description = ko.observable(data.description);
	this.url = ko.observable(data.url);

	var marker = new google.maps.Marker(markerOptions(data.lat, data.lng, data.name));
};

/**
*
*
*
**/
var PlacesOfInterest = [
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
	name: 'ex. 1',
	lat: 33.358,
	lng: -111.855,
	description: 'lorem ipsum yada yada yada',
	url: 'google.com'
},{
	name: 'ex.2',
	lat: 33.349,
	lng: -111.689,
	description: 'lorem ipsum yada yada yada',
	url: 'google.com'
},{
	name: 'ex. 3',
	lat: 33.366,
	lng: -111.656,
	description:'lorem ipsum yada yada yada',
	url: 'google.com'
}];