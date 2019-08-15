//3 Categories - Main Entree, Side Dish, Dessert
//Array of objects to hold the search term and image

var mainFoods = [
	{
		searchTerm: "whopper",
		displayImg: "assets/images/burger.png"
	},
	{
		searchTerm: "spaghetti",
		displayImg: "assets/images/pasta.png"
	},
	{
		searchTerm: "hot dog",
		displayImg: "assets/images/hot-dog.png"
	},
	{
		searchTerm: "pizza",
		displayImg: "assets/images/pizza.png",
	},
	{
		searchTerm: "taco",
		displayImg: "assets/images/taco.png"
	},
	{
		searchTerm: "sushi rice",
		displayImg: "assets/images/sushi.png"
	}
]

var sideFoods = [
	{
		searchTerm: "nachos",
		displayImg: "assets/images/nachos.png"
	},
	{
		searchTerm: "fries",
		displayImg: "assets/images/fries.png"
	},
	{
		searchTerm: "italian salad",
		displayImg: "assets/images/salad.png"
	},
	{
		searchTerm: "fruit bowl",
		displayImg: "assets/images/fruit.png"
	},
	{
		searchTerm: "soup",
		displayImg: "assets/images/soup.png"
	},
	{
		searchTerm: "pilaf",
		displayImg: "assets/images/rice.png"
	}
]

var desserts = [
	{
		searchTerm: "donut",
		displayImg: "assets/images/donut.png"
	},
	{
		searchTerm: "ice cream",
		displayImg: "assets/images/ice-cream.png"
	},
	{
		searchTerm: "cookie",
		displayImg: "assets/images/cookie.png"
	},
	{
		searchTerm: "cake",
		displayImg: "assets/images/cake.png"
	},
	{
		searchTerm: "pie",
		displayImg: "assets/images/pie.png"
	},
	{
		searchTerm: "snow-cone",
		displayImg: "assets/images/snow-cone.png"
	}
]

//A
var foodObj = [
{
	'display': false
}, 
{
	'display': false
}, 
{
	'display': false
}]

mainEntreeStats();
sideDishStats();
dessertStats();

//On click, append the image to the corresponding category 
$(document).on('click', '.flipper', function() {
	var cardSelect = $(this).parent().parent().attr("data-column");
	if (cardSelect === '1') {
		if (foodObj[cardSelect-1].display) {
			$('.card-1').empty();
			foodObj[cardSelect-1].display = false;		
		} else {
			var img = $('<img>');
			img.attr('src', $(this).attr('imgFile'))
			$('.card-1').append(img);	
			foodObj[cardSelect-1].display = true;		
		}
	} else if (cardSelect === '2') {
		if (foodObj[cardSelect-1].display) {
			$('.card-2').empty();
			foodObj[cardSelect-1].display = false;		
		} else {
			var img = $('<img>');
			img.attr('src', $(this).attr('imgFile'))
			$('.card-2').append(img);	
			foodObj[cardSelect-1].display = true;		
		}		
	} else if (cardSelect === '3') {
		if (foodObj[cardSelect-1].display) {
			$('.card-3').empty();
			foodObj[cardSelect-1].display = false		
		} else {
			var img = $('<img>');
			img.attr('src', $(this).attr('imgFile'))
			$('.card-3').append(img);	
			foodObj[cardSelect-1].display = true		
		}
	}
})

function mainEntreeStats() {
	//For each object in mainFoods array
	$.each(mainFoods, function(){ 
		var mainFoodNutrients;

		//store searchTerm and displayImg in attr to use later --> so they're always together
		var entreeItem = $("<div>").addClass("flipper").attr({
			"searchWord": this.searchTerm,
			"imgFile": this.displayImg, 
		});

		$(".main-entree").append(entreeItem);
		console.log('hee', entreeItem)

		var APIkey1 = '937a0db4501c979acd6238b0d2944f3f';
		var mainFood = this.searchTerm.split(' ').join('%20');
		var queryURL1 = 'https://api.edamam.com/api/food-database/parser?ingr=' + mainFood + '&app_id=4cb41cfc&app_key=' + APIkey1;

		$.ajax({
			url: queryURL1,
			method: "GET"
		}).done(function (response) {
			mainFoodNutrients = response.hints[0].food.nutrients;
			console.log(mainFoodNutrients);

			//create div to store the nutrients
			var backInfo = $("<div>").addClass("back").append([
				$("<p>").text("Calories: " + Math.ceil(mainFoodNutrients.ENERC_KCAL)),
				$("<p>").text("Protein: " + Math.ceil(mainFoodNutrients.PROCNT)),
				$("<p>").text("Fat: " + Math.ceil(mainFoodNutrients.FAT)),
				$("<p>").text("Carbs: " + Math.ceil(mainFoodNutrients.CHOCDF))
			]);

			var imgSRC = entreeItem.attr("imgFile");//pull attr that we stored earlier
			var frontImg = $("<img>").attr("src",imgSRC).addClass("front");

			//add picture and nutrients info to entreeItem
			entreeItem.append(frontImg);
			entreeItem.append(backInfo);
		})

	})
}	

function sideDishStats() {
	//For each object in mainFoods array
	$.each(sideFoods, function(){ 
		var sideFoodNutrients;

		//store searchTerm and displayImg in attr to use later --> so they're always together
		var sideItem = $("<div>").addClass("flipper").attr({
			"searchWord": this.searchTerm,
			"imgFile": this.displayImg, 
		});

		$(".side-dish").append(sideItem);
		console.log('sideItem', sideItem)

		var APIkey2 = '9e3689f29fe4c6c1734056093c70c321';
		var sideFood = this.searchTerm.split(' ').join('%20');
		var queryURL2 = 'https://api.edamam.com/api/food-database/parser?ingr=' + sideFood + '&app_id=4cb41cfc&app_key=' + APIkey2;

		$.ajax({
			url: queryURL2,
			method: "GET"
		}).done(function (response) {
			sideFoodNutrients = response.hints[0].food.nutrients;
			console.log('sF',sideFoodNutrients);

			var backInfo = $("<div>").addClass("back").append([
				$("<p>").text("Calories: " + Math.ceil(sideFoodNutrients.ENERC_KCAL)),
				$("<p>").text("Protein: " + Math.ceil(sideFoodNutrients.PROCNT)),
				$("<p>").text("Fat: " + Math.ceil(sideFoodNutrients.FAT)),
				$("<p>").text("Carbs: " + Math.ceil(sideFoodNutrients.CHOCDF))
			]);

			var imgSRC = sideItem.attr("imgFile"); //pull attr that we stored earlier
			var frontImg = $("<img>").attr("src",imgSRC).addClass("front");
			
			sideItem.append(frontImg);
			sideItem.append(backInfo);
		})

	})
}		

function dessertStats() {
	//For each object in desserts array
	$.each(desserts, function(){ 
		var dessertNutrients;

		//store searchTerm and displayImg in attr to use later --> so they're always together
		var dessertItem = $("<div>").addClass("flipper").attr({
			"searchWord": this.searchTerm,
			"imgFile": this.displayImg, 
		});

		$(".dessert").append(dessertItem);
		console.log('dessertItem', dessertItem)

		var APIkey3 = 'bd8398262899eee9c356a37a4505df49';
		var dessertType = this.searchTerm.split(' ').join('%20');
		var queryURL3 = 'https://api.edamam.com/api/food-database/parser?ingr=' + dessertType + '&app_id=4cb41cfc&app_key=' + APIkey3;

		$.ajax({
			url: queryURL3,
			method: "GET"
		}).done(function (response) {
			dessertNutrients = response.hints[0].food.nutrients;
			console.log('dessertNutri', dessertNutrients);

			var backInfo = $("<div>").addClass("back").append([
				$("<p>").text("Calories: " + Math.ceil(dessertNutrients.ENERC_KCAL)),
				$("<p>").text("Protein: " + Math.ceil(dessertNutrients.PROCNT)),
				$("<p>").text("Fat: " + Math.ceil(dessertNutrients.FAT)),
				$("<p>").text("Carbs: " + Math.ceil(dessertNutrients.CHOCDF))
			]);

			var imgSRC = dessertItem.attr("imgFile");//pull attr that we stored earlier
			var frontImg = $("<img>").attr("src",imgSRC).addClass("front");

			dessertItem.append(frontImg);
			dessertItem.append(backInfo);
		})

	})
}		