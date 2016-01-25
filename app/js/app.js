var map;
function initMap(){
	//create map and center it on Gilbert AZ
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 33.3500, lng: -111.7892},
		zoom: 12,
	});

	//for each 'place' in the PlacesOfInterest Array, create a marker, and info window
	PlacesOfInterest.forEach(function(place, index){
		var description = "<strong>" + place.name + "</strong>" + "<p>" +
		 place.description + "</p>" + '<a href="' + place.url + '">' +
		 "Visit Website" + "</a>";
		var marker = new google.maps.Marker(markerOptions(place.lat, place.lng, place.name, map))
		var infoWindow = new google.maps.InfoWindow({
			content: description
		});
		marker.addListener('click', function(evt){
			infoWindow.open(map, marker);
		});

		document.getElementById(index).addEventListener('click', function(){
			infoWindow.open(map, marker);
			console.log('click received');
		});
	});
};

var ViewModel = function(){
	var that = this;

	//create a knockout oberservable array, which will hold
	//an object of each 'place' inside PlacesOfInterest
	this.markerArray = ko.observableArray([]);

	PlacesOfInterest.forEach(function(place){
		that.markerArray.push(new destination(place))
	})
};


var markerOptions = function(lat, lng, title, map){
	var position = {lat, lng};
	return {
		position: position,
		title: title,
		map: map
	}
};

var destination = function(data){
	this.name = ko.observable(data.name);
	this.lat = ko.observable(data.lat);
	this.lng = ko.observable(data.lng);
	this.description = ko.observable(data.description);
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

ko.applyBindings(new ViewModel);