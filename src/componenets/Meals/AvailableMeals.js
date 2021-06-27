import { useEffect, useState } from 'react'; 
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealsItem/MealItem';

// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];



const AvailableMeals = (props) => {

     const [meals, setMeals] = useState([]);
     const [isLoading, setIsLoading] = useState(true);
     const [httpError, sethttpError] = useState(null);
  
     useEffect(() => {
        const fetchMeals = async () => {
           const response = await fetch('https://foodorder-react-4920e-default-rtdb.firebaseio.com/meals.json');
           const responseData = await response.json();

           if(!response.ok){
              throw new Error("Something went wrong");
           }

           const loadedMeals = [];

           for(const key in responseData){
             loadedMeals.push({
              id : key,
              name : responseData[key].name,
              description : responseData[key].description,
              price : responseData[key].price,
             });
           }

        setMeals(loadedMeals);
        setIsLoading(false);
        };

       
          fetchMeals().catch(error => {
            setIsLoading(false);
            sethttpError(error.message);  
          });
         
     }, []);

     if(isLoading){
         return(
           <section className={classes.MealsLoading}>
             <p>Loading...</p>
           </section>
         );
     }

     if(httpError){
        return (
          <section className={classes.MealsError} >
            <p>{httpError}</p>
          </section>
        );
     }

    const mealsList = meals.map((meal) => (<MealItem key={meal.id}
                                                          id={meal.id}
                                                         name={meal.name}
                                                         description={meal.description}
                                                         price={meal.price}
                                                        />));

    return(
    <section className={classes.meals}>
        <ul>
        <Card>
            {mealsList}
        </Card>    
        </ul>
    </section>
    );

};

export default AvailableMeals;