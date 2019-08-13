	var listFoods = ['big mac', 'pasta', 'chicken', 'pizza', 'burrito', 'steak']
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
			console.log('hello')
		} else if (cardSelect === '3') {
			console.log('this is 3')
		}
		console.log($(this).attr("data-column"))
	})

	function foodStats() {
      for (var i=0; i<listFoods.length; i++) {
        foodItem = listFoods[i];

        foodAPI = foodItem.split(' ').join('%20')
        console.log(foodAPI)
        var queryURL = 'https://api.edamam.com/api/food-database/parser?ingr=' + listFoods[i] + '&app_id=4cb41cfc&app_key=e6e46f2b3d8ad790a36acf6989e22ea1';
 
        console.log(queryURL)


      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        //var foodNutrients = response.hints[0].food.nutrients;
        console.log(foodNutrients)
        //foodArray.push(foodNutrients)

      		$('.item-1').text('Calories:' + foodArray[0].ENERC_KCAL);
      		$('.item-1').append('Protein: ' + foodArray[0].FAT)
        });

      }
      console.log(foodArray);
    }
    //foodStats();