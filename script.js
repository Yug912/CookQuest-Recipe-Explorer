let searchbox=document.querySelector('.searchbox');
let searchbutton=document.querySelector('.searchbutton');
let recipeContainer=document.querySelector('.recipe-container');
let recipebackbutton=document.querySelector('.recipe-back-button');
let recipedetailcontent=document.querySelector('.recipe-detail-content');
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
        `;
        const button=document.createElement('button');
        button.textContent='View Recipe';
        recipeDiv.appendChild(button);
        button.addEventListener('click',()=>{
            openpopup(meal);
        });
        recipeContainer.appendChild(recipeDiv);
    });
    
};
const fetchingredients=(meal)=>{
    let ingredientlist="";
    for(let i=0;i<20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient)
        {
            ingredientlist+=`<li>${meal[`strMeasure${i}`]} ${ingredient}</li>`;
        }
    }
    return ingredientlist;  
}
const openpopup=(meal)=>{
    recipedetailcontent.innerHTML=`
    <h2>${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul>${fetchingredients(meal)}</ul>
        
    `;
    recipedetailcontent.parentElement.style.display='block';  
}
searchbutton.addEventListener('click',(e)=>{
      e.preventDefault();
      const query=searchbox.value.trim();
      fetchRecipes(query);
})