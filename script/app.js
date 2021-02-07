
//function for api calling according to search input value
function searchResult() {
  const getSearchInput = document.getElementById('item-category').value;

  //condition for checking search with null values
  if (getSearchInput != '')
    fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${getSearchInput}`
    )
      .then((response) => response.json())
      .then((data) => displayItems(data))


      //catching error values for search
      .catch(error=>{
        document.getElementById('item-category').value = '';
        alert('No Such Item Found...!!!');
    })
}

//function for showing items in front page
const displayItems = (items) => {
  const itemsDiv = document.getElementById('items-div');

//empty innerHTML for avoiding previous values
  itemsDiv.innerHTML = '';
  document.getElementById('show-food').innerHTML = '';
  const meal = items.meals;

  //loop for displaying each of search result
  meal.forEach((item) => {
    const itemDiv = document.createElement('div');
    const itemInfo = `<div class='show-item' onclick="displayDetails('${item.idMeal}')">
        <img src='${item.strMealThumb}'>
        <p>${item.strMeal}</p>
        </div>`;
    itemDiv.innerHTML = itemInfo;
    itemsDiv.appendChild(itemDiv);
  });

  //empty value for clearing the search input
  document.getElementById('item-category').value = '';
};


//function of calling api for clicked item
const displayDetails = (details) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${details}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => renderDetails(data));
};


//function for showing clicked items details
const renderDetails = (details) => {
  const itemsDiv = document.getElementById('show-food');
  const item=details.meals[0];
  itemsDiv.innerHTML = `
    <img src='${details.meals[0].strMealThumb}'>
        <h3>${details.meals[0].strMeal}</h3>
        <br>
        <h5>Ingredients</h5>`;


//converting object values to array     
        const arr=Object.values(item);

//loop for collecting ingredient only
        for (let i = 9; i <=28; i++){

//condition for avoiding null values of ingredient
            if(arr[i]!=""){
            const ingredient=document.createElement('p');
            ingredient.innerText='* '+arr[i];
            itemsDiv.appendChild(ingredient);
            }        
        }
};
