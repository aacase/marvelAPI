var app = angular.module('app', []);
app.controller ('marvelContrl', function($scope){
	var heroName;
	var heroName2;
	var seriesName;
	var marvel1 = [];
	var marvel2 = [];
$scope.main = true;
$scope.newDiv= false;

$scope.woo = function(){
	$('.events').html("<li> </li>");
	async.series({
	one: function(callback){
		heroName =$scope.wooCharacter;
			$('.name').html('');
			$('.description').html('');
			$('.image').html('');
			$('.events').html('');
			$.getJSON("http://gateway.marvel.com:80/v1/public/characters?name=" + heroName + "&limit=100&apikey=9b468921eeceda45d379088e81c48169").then(function (json) {
  		$(".name").append(json.data.results[0].name);
  		$(".description").append(json.data.results[0].description);
  		$(".image").attr("src", json.data.results[0].thumbnail.path + "/detail.jpg");
  			$.each(json.data.results[0].events.items, function(i, item){ 
  				marvel1.push(item.name);

  		});
  			console.log(marvel1);	

  
  				});
			setTimeout(function(){
				callback(null, 1);

			}, 600);
	},
	two: function(callback){
		$('.name1').html('');
			$('.description1').html('');
			$('.image1').html('');
			heroName2 = $scope.wooCharacter2;
			$.getJSON("http://gateway.marvel.com:80/v1/public/characters?name=" + heroName2 + "&limit=100&apikey=9b468921eeceda45d379088e81c48169").then( function (json) {
				$(".name1").append(json.data.results[0].name);
  				$(".description1").append(json.data.results[0].description);
  				$(".image1").attr("src", json.data.results[0].thumbnail.path + "/detail.jpg");
				$.each(json.data.results[0].events.items, function(i,item){
					marvel2.push(item.name);

			});
				console.log(marvel2);	

			})
			setTimeout(function(){
				callback(null, 2);
			}, 500);
		},
		three: function(callback){


		var arr = marvel1.concat(marvel2);
			var sorted_arr = arr.sort();
			var results1 = [];
			for (var i = 0; i<arr.length -1; i ++){
				if(sorted_arr[i+1] == sorted_arr[i]){
					results1.push(sorted_arr[i]);
				}

				//this is fucked but it's a start
			
			}
				for (var j = 0; j<results1.length; j ++){
						$('.events').append('<li ng-model = "tryThisNow"><p>'+results1[j]+'</p></li>');
					}

			//for loop on results1
		console.log(results1);
			setTimeout(function(){
				callback(null, 3);
			}, 300);
	}, 
	four: function(callback){
			marvel1 = [];
			marvel2= []
			$scope.wooCharacter2 = '';
			$scope.wooCharacter = '';
		
		setTimeout(function(){
				callback(null, 4);
			}, 1);
		},

		},
		function(err, results){
			console.log(results);
});

	}
	
	$scope.click = function(){
		$scope.main = false;
		$scope.newDiv = true;
	$scope.tryThis = seriesName;
$.getJSON("http://gateway.marvel.com:80/v1/public/events?name="+seriesName+"&apikey=9b468921eeceda45d379088e81c48169", function (json){
	$(".name1").append(json.data.results[0].description);
})
}


	});



