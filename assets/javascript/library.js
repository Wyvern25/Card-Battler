	var mainFoods = ['whopper', 'spaghetti', 'mcchicken', 'pizza', 'burrito', 'ramen']
	var mainFoodsTracy = [
		{
		searchTerm: "whopper",
		displayImg: "assets/images/burger.png"
	},
	{
		searchTerm: "spaghetti",
		displayImg: "assets/images/pasta.png"
	},
	{
		searchTerm: "mcchicken",
		displayImg: "assets/images/hot-dog.png"
	},
	{
		searchTerm: "pizza",
		displayImg: "assets/images/pizza.png",
	},
	{
		searchTerm: "burrito",
		displayImg: "assets/images/taco.png"
	},
	{
		searchTerm: "ramen",
		displayImg: "assets/images/sushi.png"
	}
]

	var sideFoods = ['fries', 'potatoes', 'salad', 'beans', 'breadsticks', 'chowder']
	var desserts = ['pie', 'cookie', 'cake', 'donut', 'flan', 'ice cream']
	var mainfoodItem;
	var sideFoodItem;
	var dessertItem;
	var mainFoodNutrients;
	var sideFoodNutrients;
	var dessertNutrients;
	var foodAPI1;
	var foodAPI2;
	var foodAPI3;
	var mainFoodArray = [];
	var sideFoodArray = [];
	var dessertArray = [];
	var userDeck = [];
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

	mainEntreeStatsTracy();

	$(document).on('click', '.flipper', function() {
		var cardSelect = $(this).parent().parent().attr("data-column");
		if (cardSelect === '1') {
			if (foodObj[cardSelect-1].display) {
				$('.card-1').empty();
				foodObj[cardSelect-1].display	= false		
			} else {
				var img = $('<img>');
				img.attr('src', $(this).attr('data-src'))
				$('.card-1').append(img);	
				foodObj[cardSelect-1].display	= true		
			}
		} else if (cardSelect === '2') {
			if (foodObj[cardSelect-1].display) {
				$('.card-2').empty();
				foodObj[cardSelect-1].display	= false		
			} else {
				var img = $('<img>');
				img.attr('src', $(this).attr('data-src'))
				$('.card-2').append(img);	
				foodObj[cardSelect-1].display	= true		
			}		
		} else if (cardSelect === '3') {
			if (foodObj[cardSelect-1].display) {
				$('.card-3').empty();
				foodObj[cardSelect-1].display	= false		
			} else {
				var img = $('<img>');
				img.attr('src', $(this).attr('data-src'))
				$('.card-3').append(img);	
				foodObj[cardSelect-1].display	= true		
			}
		}
	})

	//=======================TRACY CORRECT CARD SELECTION==========================//

	function mainEntreeStatsTracy (){
		$.each(mainFoodsTracy, function(){ //for each object in mainFoods array
			var mainfoodNutrientsTracy;

			//store searchTerm and displayImg in attr to use later --> so they're always together
			var entreeItem = $("<div>").addClass("flipper entreeItem").attr({
				"searchWord": this.searchTerm,
				"imgFile": this.displayImg,
			});
			$(".entreeTracy").append(entreeItem);

			var APIkey1 = '52b5ea98265df551a8c942716cdfcbec';
			var mainFoodTracy = this.searchTerm;
			console.log(mainFoodTracy);
			var queryURLTracy= 'https://api.edamam.com/api/food-database/parser?ingr=' + mainFoodTracy + '&app_id=4cb41cfc&app_key=' + APIkey1;

			$.ajax({
				url: queryURLTracy,
				method: "GET"
			}).done(function (response) {
				mainfoodNutrientsTracy = response.hints[0].food.nutrients;
				console.log(mainfoodNutrientsTracy);

				var backInfo = $("<div>").addClass("back backT").append([
					$("<p>").text("Calories: " + mainfoodNutrientsTracy.ENERC_KCAL),
					$("<p>").text("Proteins: " + mainfoodNutrientsTracy.PROCNT),
					$("<p>").text("Fat: " + mainfoodNutrientsTracy.FAT),
					$("<p>").text("Carbs: " + mainfoodNutrientsTracy.CHOCDF)
				]);

				var imgSRC = entreeItem.attr("imgFile");//pull attr that we stored earlier
				var frontImg = $("<img>").attr("src",imgSRC).addClass("front frontT");

				entreeItem.append(frontImg);
				entreeItem.append(backInfo);
			})

		})
	}	

	//======================END OF TRACY=================================================//
	
		
	function mainEntreeStats() {
      for (var i=0; i<mainFoods.length; i++) {
        mainfoodItem = mainFoods[i];

        foodAPI1 = mainfoodItem.split(' ').join('%20')
        var APIkey1 = '52b5ea98265df551a8c942716cdfcbec';
        var queryURL1 = 'https://api.edamam.com/api/food-database/parser?ingr=' + mainFoods[i] + '&app_id=4cb41cfc&app_key=' + APIkey1;
 
        //console.log(queryURL1)
      $.ajax({
        url: queryURL1,
        method: "GET"
      }).done(function(response) {
        mainfoodNutrients = response.hints[0].food.nutrients;
        //console.log('mainfoodnutritents', mainfoodNutrients)
				mainFoodArray.push(mainfoodNutrients)
				//console.log(mainFoodArray);

	        for (var j=1; j<=mainFoodArray.length; j++) {
	      		$('.item-' + j).text('Calories:' + mainFoodArray[j-1].ENERC_KCAL + '\n');
	      		$('.item-' + j).append('Protein: ' + mainFoodArray[j-1].PROCNT + '\n');
	      		$('.item-' + j).append('Fat: ' + mainFoodArray[j-1].FAT + '\n');
	      		$('.item-' + j).append('Carbs: ' + mainFoodArray[j-1].CHOCDF);
	        }
      	});
      }
      
    }

	function sideDishStats() {
      for (var k=0; k<sideFoods.length; k++) {
        sideFoodItem = sideFoods[k];

        foodAPI2 = sideFoodItem.split(' ').join('%20')
        var APIkey2 = 'e6e46f2b3d8ad790a36acf6989e22ea1';
        var queryURL2 = 'https://api.edamam.com/api/food-database/parser?ingr=' + sideFoods[k] + '&app_id=4cb41cfc&app_key=' + APIkey2;
 
        // console.log(queryURL2)


      $.ajax({
        url: queryURL2,
        method: "GET"
      }).done(function(response) {
        sideFoodNutrients = response.hints[0].food.nutrients;
       // console.log('sidefood', sideFoodNutrients)
        sideFoodArray.push(sideFoodNutrients)

	        for (var l=1; l<=sideFoodArray.length; l++) {
	      		$('.side-item-' + l).text('Calories:' + sideFoodArray[l-1].ENERC_KCAL + '\n');
	      		$('.side-item-' + l).append('Protein: ' + sideFoodArray[l-1].PROCNT+ '\n');
	      		$('.side-item-' + l).append('Fat: ' + sideFoodArray[l-1].FAT + '\n');
	      		$('.side-item-' + l).append('Carbs: ' + sideFoodArray[l-1].CHOCDF);
	        }
      	});
      }
      //console.log(sideFoodArray);
    }

	function dessertStats() {
      for (var m=0; m<desserts.length; m++) {
        dessertItem = desserts[m];

        foodAPI3 = dessertItem.split(' ').join('%20')
        var APIkey3 = 'ca199ed290602300fee474300b19a7ed';
        var queryURL3 = 'https://api.edamam.com/api/food-database/parser?ingr=' + desserts[m] + '&app_id=4cb41cfc&app_key=' + APIkey3;
 
        // console.log(queryURL3)


      $.ajax({
        url: queryURL3,
        method: "GET"
      }).done(function(response) {
        dessertNutrients = response.hints[0].food.nutrients;
       // console.log('dessert', dessertNutrients)
        dessertArray.push(dessertNutrients)

	        for (var n=1; n<=dessertArray.length; n++) {
	      		$('.dessert-item-' + n).text('Calories:' + dessertArray[n-1].ENERC_KCAL + '\n');
	      		$('.dessert-item-' + n).append('Protein: ' + dessertArray[n-1].PROCNT+ '\n');
	      		$('.dessert-item-' + n).append('Fat: ' + dessertArray[n-1].FAT + '\n');
	      		$('.dessert-item-' + n).append('Carbs: ' + dessertArray[n-1].CHOCDF);
	        }
      	});
      }
      // console.log(dessertArray);
    }    
    mainEntreeStats();
    sideDishStats();
    dessertStats();






