//3 Categories - Main Entree, Side Dish, Dessert
//Array of objects to hold the search term and image


// Arrays for Dave  
// mainFoods
// sideFoods
// desserts
// myThreeFoods - this contains the names of the 3 foods user selects 


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
		displayImg: "assets/images/sno-cone.png"
	}
]

//Object for the 3 selections on top. On click, obj will toggle between true/false so only one image is appended 
var foodObj = [
	{
		display: false,
		source: null
	},
	{
		display: false,
		source: null
	},
	{
		display: false,
		source: null
	}]

//Functions for each category - this is when API is called 
mainEntreeStats();
sideDishStats();
dessertStats();

var myThreeFoods = ['', '', ''];

//On click, append the image to the corresponding category 
$(document).on('click', '.flipper', function () {

	var source = $(this).attr("source")
	//This selects the whole column (all 6) - so each category goes to the correct button on top
	var cardSelect = $(this).parent().parent().attr("data-column");
	if (cardSelect === '1') {
		if (foodObj[cardSelect - 1].display) {
			if (foodObj[cardSelect - 1].source !== source) {
				$('.card-1 img').attr('src', $(this).attr('imgFile'))
				myThreeFoods[0] = $(this).attr('searchWord');
				foodObj[cardSelect - 1].source = source
			}
		} else {
			var img = $('<img>');
			img.attr('src', $(this).attr('imgFile'))
			$('.card-1').append(img);
			foodObj[cardSelect - 1].display = true
			foodObj[cardSelect - 1].source = source
			//update myThreeFoods array 
			myThreeFoods[0] = $(this).attr('searchWord');
		}
	} else if (cardSelect === '2') {
		if (foodObj[cardSelect - 1].display) {
			if (foodObj[cardSelect - 1].source !== source) {
				$('.card-2 img').attr('src', $(this).attr('imgFile'))
				myThreeFoods[1] = $(this).attr('searchWord');
				foodObj[cardSelect - 1].source = source
			}
		} else {
			var img = $('<img>');
			img.attr('src', $(this).attr('imgFile'))
			$('.card-2').append(img);
			foodObj[cardSelect - 1].display = true
			foodObj[cardSelect - 1].source = source
			myThreeFoods[1] = $(this).attr('searchWord');
		}
	} else if (cardSelect === '3') {
		if (foodObj[cardSelect - 1].display) {
			if (foodObj[cardSelect - 1].source !== source) {
				$('.card-3 img').attr('src', $(this).attr('imgFile'))
				myThreeFoods[2] = $(this).attr('searchWord');
				foodObj[cardSelect - 1].source = source
			}
		} else {
			var img = $('<img>');
			img.attr('src', $(this).attr('imgFile'))
			$('.card-3').append(img);
			foodObj[cardSelect - 1].display = true
			foodObj[cardSelect - 1].source = source
			myThreeFoods[2] = $(this).attr('searchWord');
		}
	}
})

function mainEntreeStats() {
	//For each object in mainFoods array
	$.each(mainFoods, function (index) {
		var mainFoodNutrients;

		//store searchTerm and displayImg in attr to use later --> so they're always together
		var entreeItem = $("<div>").addClass("flipper").attr({
			"searchWord": this.searchTerm,
			"imgFile": this.displayImg,
			"source": index
		});

		$(".main-entree").append(entreeItem);

		var APIkey1 = '937a0db4501c979acd6238b0d2944f3f';
		var mainFood = this.searchTerm.split(' ').join('%20');
		var queryURL1 = 'https://api.edamam.com/api/food-database/parser?ingr=' + mainFood + '&app_id=4cb41cfc&app_key=' + APIkey1;

		$.ajax({
			url: queryURL1,
			method: "GET"
		}).done(function (response) {
			mainFoodNutrients = response.hints[0].food.nutrients;

			//create div to store the nutrients
			var backInfo = $("<div>").addClass("back").append([
				$("<p>").text("Calories: " + Math.ceil(mainFoodNutrients.ENERC_KCAL)),
				$("<p>").text("Protein: " + Math.ceil(mainFoodNutrients.PROCNT)),
				$("<p>").text("Fat: " + Math.ceil(mainFoodNutrients.FAT)),
				$("<p>").text("Carbs: " + Math.ceil(mainFoodNutrients.CHOCDF))
			]);

			//adding the nutrient info to the mainFoods array 
			mainFoods[index].Calories = Math.ceil(mainFoodNutrients.ENERC_KCAL)
			mainFoods[index].Protein = Math.ceil(mainFoodNutrients.PROCNT)
			mainFoods[index].Fat = Math.ceil(mainFoodNutrients.FAT)
			mainFoods[index].Carbs = Math.ceil(mainFoodNutrients.CHOCDF)

			var imgSRC = entreeItem.attr("imgFile");//pull 	attr that we stored earlier
			var frontImg = $("<img>").attr("src", imgSRC).addClass("front");

			//add picture and nutrients info to entreeItem
			entreeItem.append(frontImg);
			entreeItem.append(backInfo);
		})

	})
}

function sideDishStats() {
	//For each object in mainFoods array
	$.each(sideFoods, function (index) {
		var sideFoodNutrients;

		//store searchTerm and displayImg in attr to use later --> so they're always together
		var sideItem = $("<div>").addClass("flipper").attr({
			"searchWord": this.searchTerm,
			"imgFile": this.displayImg,
			"source": index
		});

		$(".side-dish").append(sideItem);

		var APIkey2 = '9e3689f29fe4c6c1734056093c70c321';
		var sideFood = this.searchTerm.split(' ').join('%20');
		var queryURL2 = 'https://api.edamam.com/api/food-database/parser?ingr=' + sideFood + '&app_id=4cb41cfc&app_key=' + APIkey2;

		$.ajax({
			url: queryURL2,
			method: "GET"
		}).done(function (response) {
			sideFoodNutrients = response.hints[0].food.nutrients;

			var backInfo = $("<div>").addClass("back").append([
				$("<p>").text("Calories: " + Math.ceil(sideFoodNutrients.ENERC_KCAL)),
				$("<p>").text("Protein: " + Math.ceil(sideFoodNutrients.PROCNT)),
				$("<p>").text("Fat: " + Math.ceil(sideFoodNutrients.FAT)),
				$("<p>").text("Carbs: " + Math.ceil(sideFoodNutrients.CHOCDF))
			]);

			sideFoods[index].Calories = Math.ceil(sideFoodNutrients.ENERC_KCAL)
			sideFoods[index].Protein = Math.ceil(sideFoodNutrients.PROCNT)
			sideFoods[index].Fat = Math.ceil(sideFoodNutrients.FAT)
			sideFoods[index].Carbs = Math.ceil(sideFoodNutrients.CHOCDF)

			var imgSRC = sideItem.attr("imgFile"); //pull attr that we stored earlier
			var frontImg = $("<img>").attr("src", imgSRC).addClass("front");

			sideItem.append(frontImg);
			sideItem.append(backInfo);
		})

	})
}

function dessertStats() {
	//For each object in desserts array
	$.each(desserts, function (index) {
		var dessertNutrients;

		//store searchTerm and displayImg in attr to use later --> so they're always together
		var dessertItem = $("<div>").addClass("flipper").attr({
			"searchWord": this.searchTerm,
			"imgFile": this.displayImg,
			"source": index
		});

		$(".dessert").append(dessertItem);

		var APIkey3 = 'bd8398262899eee9c356a37a4505df49';
		var dessertType = this.searchTerm.split(' ').join('%20');
		var queryURL3 = 'https://api.edamam.com/api/food-database/parser?ingr=' + dessertType + '&app_id=4cb41cfc&app_key=' + APIkey3;

		$.ajax({
			url: queryURL3,
			method: "GET"
		}).done(function (response) {
			dessertNutrients = response.hints[0].food.nutrients;

			var backInfo = $("<div>").addClass("back").append([
				$("<p>").text("Calories: " + Math.ceil(dessertNutrients.ENERC_KCAL)),
				$("<p>").text("Protein: " + Math.ceil(dessertNutrients.PROCNT)),
				$("<p>").text("Fat: " + Math.ceil(dessertNutrients.FAT)),
				$("<p>").text("Carbs: " + Math.ceil(dessertNutrients.CHOCDF))
			]);

			desserts[index].Calories = Math.ceil(dessertNutrients.ENERC_KCAL)
			desserts[index].Protein = Math.ceil(dessertNutrients.PROCNT)
			desserts[index].Fat = Math.ceil(dessertNutrients.FAT)
			desserts[index].Carbs = Math.ceil(dessertNutrients.CHOCDF)


			var imgSRC = dessertItem.attr("imgFile");//pull attr that we stored earlier
			var frontImg = $("<img>").attr("src", imgSRC).addClass("front");

			dessertItem.append(frontImg);
			dessertItem.append(backInfo);
		})

	})
}

$('.toMapBtn').on('click', function() {
	if (!(myThreeFoods[0]) == false && !(myThreeFoods[1]) == false && !(myThreeFoods[2]) == false) {
			location.href = "map.html"
	} else {
			console.log('please select 3 total')
	}
})

//FIREBASE





