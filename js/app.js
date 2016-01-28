/**
*	Callback from google maps api to create a new map
* and a new infoWindow.
*	Also apply DOM bindings from knockout to the ViewModel
* @return {object} returns a google.maps.Map(), 
*		and a google.maps.InfoWindow()
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
* ViewModel to handle knockout events.
*
*
*
**/
var ViewModel = function(){
	var that = this;

	//create a knockout oberservable array, which will hold
	//an object of each 'place' inside PlacesOfInterest
	this.markerArray = ko.observableArray([]);
	this.filteredArray = ko.observableArray([]);
	this.query = ko.observable('');

	//TODO based on boolean value returned by stringstartswith, push to filtered array
	this.filteredItems = ko.computed(function(){
		var filter = this.query().toLowerCase();
		// var filter = filterStr.toLowerCase();
		if(!filter){
			return that.markerArray();
		} else {
			return ko.utils.arrayFilter(that.markerArray(), function(data){
				var string = stringStartsWith(data.name().toLowerCase(), filter);
				if(string){
					that.markerArray().forEach(function(place){
						place.marker().setVisible(false);
						if(place.name().toLowerCase() === string){
							place.marker().setVisible(true);
						};
					});
				};
				return string;
			});
		};
	}, that);

	/**
	* create ko.observableArray of objects from each 
	*	place in PlacesOfInterest
	* @param place {object} received from PlacesOfInterest
	*	@param map {object} received from initMap()
	*/
	PlacesOfInterest.forEach(function(place){
		that.markerArray.push(new destination(place, map))
	});

	ko.utils.arrayForEach(this.markerArray(), function(place){
		place.marker().addListener('click', function(){
			animateMarker(place);
			openWindow(place);
		});
	});
};

/**
* stringStartsWith adapted from knockout sourcecode
* https://github.com/knockout/knockout/blob/master/src/utils.js
* ko.utils.stringStartsWith() is not included in minified knockout
*
* @param string {string} the name atr in markerArray
* @param startsWith {string} received from viewModel filter input
* @return {boolean}
*/
var stringStartsWith = function(string, startsWith){
  string = string || "";
 	if(startsWith.length > string.length){
 		return false;
 	} else {
 		if(string.substring(0, startsWith.length) === startsWith){
 			console.log();
 			return string;
 		};
 	};
};

/*
*	Class to create objects for ViewModel.markerArray
* @param data {object} object from PlacesOfInterest
*	@return {object} return observable object 
*		to the ViewModel.markerArray 
*	@return {object} new google.maps.Marker()
*/
var destination = function(data){
	this.name = ko.observable(data.name);
	this.lat = ko.observable(data.lat);
	this.lng = ko.observable(data.lng);
	this.description = ko.observable(data.description);
	this.url = ko.observable(data.url);
	this.id = ko.observable(data.id);
	this.marker = ko.observable(new google.maps.Marker(markerOptions(
		this.lat(), this.lng(), this.name())));

	// this.marker = new google.maps.Marker(markerOptions(this.lat(), this.lng(), this.name()));
};

var markerOptions = function(lat, lng, title){
	var position = {lat, lng};
	return {
		position: position,
		title: title,
		map: map,
		animation: google.maps.Animation.DROP
	}
};

var animateMarker = function(marker){
	marker.marker().setAnimation(google.maps.Animation.BOUNCE);
			setTimeout(function(){
				marker.marker().setAnimation(null);
			}, 1400);
};

//receive clicks from KO, and reset infoWindow with new data
var openWindow = function(data){
	var position = {lat: data.lat(), lng: data.lng()};
	var description = "<strong>" + data.name() + "</strong>" + "<p>" +
	 		data.description() + "</p>" + '<a href="' + data.url() + '">' +
	 		"Visit Website" + "</a>";
	infoWindow.close();
	animateMarker(data);
	infoWindow.setContent(description);
	infoWindow.setPosition(position);
	infoWindow.open(map);
};

/**
* The initial data to be used to populate
* the map with markers
**/
var PlacesOfInterest = [
{
	name: 'Bagel Man',
	lat: 33.348880,
	lng: -111.976837,
	description: 'Get yourself some decent bagels.',
	url: '',
	id: 0
},{
	name: 'The Soda Shop',
	lat: 33.378187,
	lng:  -111.741916,
	description: 'A unique twist on soda.',
	url: 'thesodashop.co',
	id: 1
},{
	name: 'ex. 1',
	lat: 33.358,
	lng: -111.855,
	description: 'lorem ipsum yada yada yada',
	url: 'google.com',
	id: 2
},{
	name: 'ex.2',
	lat: 33.349,
	lng: -111.689,
	description: 'lorem ipsum yada yada yada',
	url: 'google.com',
	id: 3
},{
	name: 'ex. 3',
	lat: 33.366,
	lng: -111.656,
	description:'lorem ipsum yada yada yada',
	url: 'google.com',
	id: 4
}];