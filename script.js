let searchbox=document.querySelector('.searchbox');
let searchbutton=document.querySelector('.searchbutton');
let recipeContainer=document.querySelector('.recipe-container');

const fetchRecipes=async(query)=>{
    recipeContainer.innerHTML='fetching recipes...';
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response=await data.json();
   recipeContainer.innerHTML='';
    response.meals.forEach(meal => {
        const recipeDiv=document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=`
         <img src="${meal.strMealThumb}">
            <h2>${meal.strMeal}</h2>
            <p>${meal.strArea}</p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>
            <button onclick="window.open('${meal.strSource}','_blank')">View Recipe</button>
        `;
        
        recipeContainer.appendChild(recipeDiv);
    });
    
};
searchbutton.addEventListener('click',(e)=>{
      e.preventDefault();
      const query=searchbox.value.trim();
      fetchRecipes(query);
})