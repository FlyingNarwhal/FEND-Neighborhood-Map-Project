/**
*	Callback from google maps api to create a new map
* and a new infoWindow.
*	Also apply DOM bindings from knockout to the ViewModel
* @return {object} returns a google.maps.Map(), 
*		and a google.maps.InfoWindow()
**/
function init(){
	var map = new initMap();
	var service;
	var infoWindow = new initInfoWindow();
	ko.applyBindings(new ViewModel());
};

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

	this.markerOptions = function(lat, lng, title){
		var position = {lat, lng};
		// console.log(position)
		return {
			position: position,
			title: title,
			map: map,
			animation: google.maps.Animation.DROP
		}
	};

	/*
	*	Class to create objects for ViewModel.markerArray
	* @param data {object} object from PlacesOfInterest
	*	@return {object} return observable object 
	*		to the ViewModel.markerArray 
	*	@return {object} new google.maps.Marker()
	*/
	this.destination = function(data, Placelat, Placelng){
		this.name = ko.observable(data.name);
		this.lat = data.lat || Placelat;
		this.lng = data.lng || Placelng;
		this.description = ko.observable(data.description);
		this.url = ko.observable(data.url);
		this.id = ko.observable(data.id);
		this.marker = ko.observable(new google.maps.Marker(that.markerOptions(
			this.lat, this.lng, this.name())));
		this.visible = ko.observable(data.visible);

		// this.marker = new google.maps.Marker(markerOptions(this.lat(), this.lng(), this.name()));
	};

	this.animateMarker = function(marker){
		marker.marker().setAnimation(google.maps.Animation.BOUNCE);
				setTimeout(function(){
					marker.marker().setAnimation(null);
				}, 1400);
	};

	//receive clicks from KO, and reset infoWindow with new data
	this.openWindow = function(data){
		var position = {lat: data.lat, lng: data.lng};
		var description = "<strong>" + data.name() + "</strong>" + "<p>" +
		 		data.description() + "</p>" + '<a href="' + data.url() + '">' +
		 		"Visit Website" + "</a>";
		infoWindow.close();
		that.animateMarker(data);
		infoWindow.setContent(description);
		infoWindow.setPosition(position);
		infoWindow.open(map);
	};

	this.googlePlacesAPI = function(){
		var request = {
			location: {lat: 33.3500, lng: -111.7892},
			radius: '12000',
			query: 'restaurants' 
		};

		service = new google.maps.places.PlacesService(map);
		service.textSearch(request, callback);

		function callback(results, status){
			if(status == google.maps.places.PlacesServiceStatus.OK){
				results.forEach(function(place){
					var lat = place.geometry.location.lat();
					var lng = place.geometry.location.lng();
					that.markerArray.push(new that.destination(place, lat, lng));
					console.log(place);
				})
				ko.utils.arrayForEach(that.markerArray(), function(place){
					place.marker().addListener('click', function(){
						that.animateMarker(place);
						that.openWindow(place);
					});
				})
			} else {
				ko.utils.arrayForEach(that.markerArray(), function(place){
					place.marker().addListener('click', function(){
						that.animateMarker(place);
						that.openWindow(place);
					});
				})
				alert("Oops, something went wrong on our end,\nbut here are 5 places you'll still love!")
			}
		}
	};

	/**
	* create ko.observableArray of objects from each 
	*	place in PlacesOfInterest
	* @param place {object} received from PlacesOfInterest
	*	@param map {object} received from initMap()
	*/
	PlacesOfInterest.forEach(function(place){
		that.markerArray.push(new that.destination(place))
	});

	this.googlePlacesAPI();

	// filter items in markerArray based on user input
	// and remove the item from the listView, and its 
	// corresponding marker
	this.filteredItems = ko.computed(function(){
		var filter = ko.observable(this.query().toLowerCase());
		if(!filter()){
			return that.markerArray();
		} else {
			return ko.utils.arrayFilter(that.markerArray(), function(data){
				var string = data.name().toLowerCase().indexOf(filter()) !== -1;
				if(!string){
					data.marker().setVisible(false);
				}
				// TODO see if filter() exists in the infoWindow title, if so, keep infowindow
				// else remove the window, use substring()
				return string;
			});
		}
	}, that);

	this.query.subscribe(function(data){
		if(data == ''){
			ko.utils.arrayForEach(that.markerArray(), function(place){
				place.marker().setVisible(true);
			})
		}
	})

	// TODO make this also include those objects added by the API
	// ko.utils.arrayForEach(this.markerArray(), function(place){
	// 	place.marker().addListener('click', function(){
	// 		that.animateMarker(place);
	// 		that.openWindow(place);
	// 	});
	// });
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
	visible: true
},{
	name: 'The Soda Shop',
	lat: 33.378187,
	lng:  -111.741916,
	description: 'A unique twist on soda.',
	url: 'thesodashop.co',
	visible: true
},{
	name: 'ex. 1',
	lat: 33.358,
	lng: -111.855,
	description: 'lorem ipsum yada yada yada',
	url: 'google.com',
	visible: true
},{
	name: 'ex. 2',
	lat: 33.349,
	lng: -111.689,
	description: 'lorem ipsum yada yada yada',
	url: 'google.com',
	visible: true
},{
	name: 'ex. 3',
	lat: 33.366,
	lng: -111.656,
	description:'lorem ipsum yada yada yada',
	url: 'google.com',
	visible: true
}];