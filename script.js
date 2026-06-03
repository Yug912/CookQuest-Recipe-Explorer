let searchbox=document.querySelector('.searchbox');
let searchbutton=document.querySelector('.searchbutton');
let recipeContainer=document.querySelector('.recipe-container');

const fetchRecipes=async(query)=>{
    recipeContainer.innerHTML='fetching recipes...';
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response=await data.json();
   recipeContainer.innerHTML='';
    response.meals.forEach(meal => {
        const recieveDiv=document.createElement('div');
        recieveDiv.classList.add('recipe');
        recieveDiv.innerHTML=`
         <img src="${meal.strMealThumb}">
            <h2>${meal.strMeal}</h2>
            <p>${meal.strArea}</p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `;
        recipeContainer.appendChild(recieveDiv);
    });
    
};
searchbutton.addEventListener('click',(e)=>{
      e.preventDefault();
      const query=searchbox.value.trim();
      fetchRecipes(query);
})