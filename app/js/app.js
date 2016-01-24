var map;
function initMap(){
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 33.3500, lng: -111.7892},
		zoom: 12,
	});

	PlacesOfInterest.forEach(function(place){
		var description = "<strong>" + place.name + "</strong>" + "<p>" +
		 place.description + "</p>" + '<a href="' + place.url + '">' +
		 "Visit Website" + "</a>";
		var marker = new google.maps.Marker(markerOptions(place.lat, place.lng, place.name, map))
		var infoWindow = new google.maps.InfoWindow({
			content: description
		});
		marker.addListener('click', function(evt){
			infoWindow.open(map, marker);
			console.log(evt);
		});
	});
};

var ViewModel = function(){
	var that = this;

	this.markerSet = ko.observableArray([]);

	PlacesOfInterest.forEach(function(place){
		that.markerSet.push(new destination(place))
	})

	this.infoWindow = function(data){
		destination.window();
	};
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

ko.applyBindings(new ViewModel);