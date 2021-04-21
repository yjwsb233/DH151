let data = [
	{
		'title':'Takamatsu',
		'description':'I love Takamatsu because the udon here is amazingly cheap and delicious. It also has one of my favorite bookstores in the world!',
		'lat': 34.34088268614786, 
		'lon': 134.05004730927806,
		'image':'https://lh3.googleusercontent.com/proxy/G8DccAFFn8lfukRKNwxhcuMatHxha_se3jtSGONT8XsRQXRPePzUAcyupvN-nlKqot0C99RcPR1RZ8qx9C5OepLXl6rybBP6U3CbSPu5FOZncKSv6mmoGP_N4TYnPBozmKsH10rNCk-n_6w'
	},
	{
		'title':'Paris',
		'description':'Paris is a city that always speaks to me in a special way. I have set the location to the place which contains one of my best memories there – the Georges Brassens book market.',
		'lat': 48.831358978159685,
		'lon':  2.3017509253082347,
		'image': 'https://photos.mandarinoriental.com/is/image/MandarinOriental/paris-2017-home?wid=2880&hei=1280&fmt=jpeg&crop=9,336,2699,1200&anchor=1358,936&qlt=75,0&fit=wrap&op_sharpen=0&resMode=sharp2&op_usm=0,0,0,0&iccEmbed=0&printRes=72'
	},
	{
		'title':'Shenzhen',
		'description': 'Shenzhen is where I was born and raised. It is the only place I will call home, although I have not gone back in a long time.',
		'lat': 13.7563,
		'lon': 100.5018,
		'image':'https://www.china-briefing.com/news/wp-content/uploads/2019/09/china-briefing-shenzhen-city-profile.jpg'
	},
	{
		'title':'Tulum',
		'description':'I went cave diving in Tulum, Mexico, and it was one of the most fascinating thing I have done. The water was crystal clear.',
		'lat': 20.32566214023188, 
		'lon': -87.39123412698414,
		'image':'https://aguaclaradivingtulum.com/wp-content/uploads/2013/11/At28ZhPH-1024x683.jpeg'
	},
	{
		'title':'Anchorage',
		'description': 'I went to Alaska a few weeks ago with my friends. Although we missed the northern lights, I was very happy during our trip to the Matanuska Glacier, which was stunning.',
		'lat': 61.69510964307052,
		'lon': -147.60034562928942,
		'image': 'https://alaskaphototreks.com/wp-content/uploads/2016/01/matanuska-glacier-pressure-ridge.jpg'
	}]

	var map = L.map('map').setView([13.7563,100.5018],1);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	//create feature group
	let myMarkers = L.featureGroup();

	var purpleIcon = L.icon({
		iconUrl: 'Purple-marker.png',
		shadowUrl: 'Marker-shadow.png',
	
		iconSize:     [30, 30], // size of the icon
		shadowSize:   [30, 15], // size of the shadow
		iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
		shadowAnchor: [9, -3],  // the same for the shadow
		popupAnchor:  [-3, -50] // point from which the popup should open relative to the iconAnchor
	});

	//loop through data
	data.forEach(function(item,index){

		var marker = L.marker([item.lat,item.lon],{icon:purpleIcon})
			.bindPopup(`<div><b>${item.title}</b></div><img src=${item.image} width=100%> <br>${item.description}`) 
		
			myMarkers.addLayer(marker)

		$('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${index})">${item.title}<br></div>`) 

	});

	$('.sidebar').append("Created by Haiqi Zhou")

	myMarkers.addTo(map)

	//define layers 
	let layers = {
		"The Places I've Been": myMarkers 
	}

	//add layer control box
	L.control.layers(null,layers).addTo(map)

	map.fitBounds(myMarkers.getBounds())

	function flyToIndex(index){
		map.flyTo([data[index].lat,data[index].lon],12)
		myMarkers.getLayers()[index].openPopup()
	}