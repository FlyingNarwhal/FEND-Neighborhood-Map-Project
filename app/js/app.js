function init(){
	var map = new initMap();
	ko.applyBindings(new ViewModel());
}

function initMap(){
	//create map and center it on Gilbert AZ
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 33.3500, lng: -111.7892},
		zoom: 12,
	});

/**
*		//TODO Refactor code, to seperate concerns
*
*		//for each 'place' in the PlacesOfInterest Array, create a marker, and info window
*		PlacesOfInterest.forEach(function(place, index){
*			var description = "<strong>" + place.name + "</strong>" + "<p>" +
*	 		place.description + "</p>" + '<a href="' + place.url + '">' +
*	 		"Visit Website" + "</a>";
*
*			var marker = new google.maps.Marker(markerOptions(place.lat, place.lng, place.name, map))
*			var infoWindow = new google.maps.InfoWindow({
*				content: description
*			});
*
*			marker.addListener('click', function(evt){
*				infoWindow.open(map, marker);
*			});
*
*			//add an event listener to each the listView, to open the info window
*			document.getElementById(index).addEventListener('click', function(){
*				infoWindow.open(map, marker);
*			});
*		});
**/
	
};

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

var infoWindow = function(data){
	that = this;

	console.log(data.lat());
	var description = "<strong>" + data.name() + "</strong>" + "<p>" +
	 		data.description() + "</p>" + '<a href="' + data.url() + '">' +
	 		"Visit Website" + "</a>";
	// var lat = data.lat;
	// var lng = data.lng;
	var position = {lat: data.lat(), lng: data.lng()};

	this.description = ko.observable(description);
	this.position = ko.observable(position);

	var window = new google.maps.InfoWindow({
		content: description,
		position: position,
		map: map
	});
};

var destination = function(data){
	this.name = ko.observable(data.name);
	this.lat = ko.observable(data.lat);
	this.lng = ko.observable(data.lng);
	this.description = ko.observable(data.description);
	this.url = ko.observable(data.url);

	var marker = new google.maps.Marker(markerOptions(data.lat, data.lng, data.name));
};

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

// ko.applyBindings(new ViewModel);