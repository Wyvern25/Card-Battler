	var mainFoods = ['whopper', 'spaghetti', 'mcchicken', 'pizza', 'burrito', 'ramen']
	var sideFoods = ['fries', 'potatoes', 'salad', 'beans', 'breadsticks', 'chowder']
	var desserts = ['pie', 'cookie', 'cake', 'donut', 'flan', 'ice cream']
	var foodItem;
	var foodAPI;
	var foodArray = [];
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

	$(document).on('click', '.flipper', function() {
		var cardSelect = $(this).parent().parent().attr("data-column");
		if (cardSelect === '1') {
			if (foodObj[cardSelect].display) {
				$('.card-1').empty();
				foodObj[cardSelect].display	= false		
			} else {
				var img = $('<img>');
				img.attr('src', $(this).attr('data-src'))
				$('.card-1').append(img);	
				foodObj[cardSelect].display	= true		
			}
		} else if (cardSelect === '2') {
			if (foodObj[cardSelect].display) {
				$('.card-2').empty();
				foodObj[cardSelect].display	= false		
			} else {
				var img = $('<img>');
				img.attr('src', $(this).attr('data-src'))
				$('.card-2').append(img);	
				foodObj[cardSelect].display	= true		
			}		
		} else if (cardSelect === '3') {
			if (foodObj[cardSelect].display) {
				$('.card-3').empty();
				foodObj[cardSelect].display	= false		
			} else {
				var img = $('<img>');
				img.attr('src', $(this).attr('data-src'))
				$('.card-3').append(img);	
				foodObj[cardSelect].display	= true		
			}
		}
		console.log($(this).attr("data-column"))
	})

	function mainEntreeStats() {
      for (var i=0; i<mainFoods.length; i++) {
        foodItem = mainFoods[i];

        foodAPI = foodItem.split(' ').join('%20')
        var APIkey1 = '6c5995fa07c3dd42ab33c898425c550a';
        var queryURL1 = 'https://api.edamam.com/api/food-database/parser?ingr=' + mainFoods[i] + '&app_id=4cb41cfc&app_key=' + APIkey1;
 
        console.log(queryURL)


      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var foodNutrients = response.hints[0].food.nutrients;
        console.log(foodNutrients)
        foodArray.push(foodNutrients)

	        for (var j=1; j<=foodArray.length; j++) {
	      		$('.item-' + j).text('Calories:' + foodArray[j-1].ENERC_KCAL + '\n');
	      		$('.item-' + j).append('Protein: ' + foodArray[j-1].PROCNT+ '\n');
	      		$('.item-' + j).append('Fat: ' + foodArray[j-1].FAT + '\n');
	      		$('.item-' + j).append('Carbs: ' + foodArray[j-1].CHOCDF);
	        }
      	});
      }
      console.log(foodArray);
    }

	function sideDishStats() {
      for (var i=0; i<sideFoods.length; i++) {
        foodItem = sideFoods[i];

        foodAPI = foodItem.split(' ').join('%20')
        var APIkey2 = 'ca199ed290602300fee474300b19a7ed';
        var queryURL2 = 'https://api.edamam.com/api/food-database/parser?ingr=' + sideFoods[i] + '&app_id=4cb41cfc&app_key=' + APIkey2;
 
        console.log(queryURL)


      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var foodNutrients = response.hints[0].food.nutrients;
        console.log(foodNutrients)
        foodArray.push(foodNutrients)

	        for (var j=1; j<=foodArray.length; j++) {
	      		$('.item-' + j).text('Calories:' + foodArray[j-1].ENERC_KCAL + '\n');
	      		$('.item-' + j).append('Protein: ' + foodArray[j-1].PROCNT+ '\n');
	      		$('.item-' + j).append('Fat: ' + foodArray[j-1].FAT + '\n');
	      		$('.item-' + j).append('Carbs: ' + foodArray[j-1].CHOCDF);
	        }
      	});
      }
      console.log(foodArray);
    }

	function dessertStats() {
      for (var i=0; i<desserts.length; i++) {
        foodItem = desserts[i];

        foodAPI = foodItem.split(' ').join('%20')
        var APIkey3 = 'bd8398262899eee9c356a37a4505df49';
        var queryURL3 = 'https://api.edamam.com/api/food-database/parser?ingr=' + desserts[i] + '&app_id=4cb41cfc&app_key=' + APIkey3;
 
        console.log(queryURL)


      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var foodNutrients = response.hints[0].food.nutrients;
        console.log(foodNutrients)
        foodArray.push(foodNutrients)

	        for (var j=1; j<=foodArray.length; j++) {
	      		$('.item-' + j).text('Calories:' + foodArray[j-1].ENERC_KCAL + '\n');
	      		$('.item-' + j).append('Protein: ' + foodArray[j-1].PROCNT+ '\n');
	      		$('.item-' + j).append('Fat: ' + foodArray[j-1].FAT + '\n');
	      		$('.item-' + j).append('Carbs: ' + foodArray[j-1].CHOCDF);
	        }
      	});
      }
      console.log(foodArray);
    }    
    //mainEntreeStats();
    //sideDishStats();






