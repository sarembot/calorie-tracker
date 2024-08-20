// App init

class App {
  constructor() {
    new CalorieTracker(2000, 0, null, null);
  }

  _newItem() {}
  _removeItem() {}
  _filterItems() {}
  _reset() {}
  _setLimit() {
    //   saveBtn.addEventListener('click', () => {
    //     if (NaN) {
    //       alert('Please Enter a Number.');
    //       return;
    //     }
    //     dailyLimit.textContent = dailyLimitInput.value;
    //     dailyLimitInput.value = '';
    //   });
  }
}

// Tracker init

class CalorieTracker {
  constructor() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
  }

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;

    this._displayCaloriesConsumed(meal);
  }

  removeMeal(meal) {
    this._meals.pop(meal);
    this._totalCalories -= meal.calories;
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;

    this._displayCaloriesBurned(workout);
  }

  removeWorkout(workout) {
    this._workouts.pop(workout);
  }

  resetDay() {}

  _displayCaloriesTotal() {
    const gainLoss = document.querySelector('#gainLoss');
  }

  _displayCalorieLimit() {
    const dailyLimit = document.getElementById('dailyLimit');
    dailyLimit.textContent = this._calorieLimit;
  }
  _displayCaloriesConsumed(meal) {
    const consumed = document.getElementById('consumed');

    const newNum = parseInt(consumed.textContent) + meal.calories;
    consumed.textContent = newNum;
  }
  _displayCaloriesBurned(workout) {
    const burned = document.getElementById('burned');

    const newNum = parseInt(burned.textContent) + workout.calories;
    burned.textContent = newNum;
  }
  _displayCaloriesRemaining() {}
}

// meal

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

//workouts

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

// init application
const tracker = new CalorieTracker();

const breakfast = new Meal('breakfast', 1000);

const run = new Workout('run', 500);

tracker.addMeal(breakfast);
tracker.addMeal(new Meal('lunch', 500));
tracker.addMeal(new Meal('dinner', 600));
tracker.addWorkout(run);

console.log(tracker._totalCalories);
