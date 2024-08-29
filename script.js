// App init

class App {
  constructor() {
    this._tracker = new CalorieTracker();

    // toggle

    document
      .getElementById('meal-form')
      .addEventListener('submit', this._newMeal);
  }

  _newMeal(e) {
    e.preventDefault();
  }

  _newItem() {}
  _removeItem() {}
  _filterItems() {}
  _reset() {}
  _setLimit() {}
}

// Tracker init

class CalorieTracker {
  constructor() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
  }

  // Public Methods/API //

  // Adding and removing meals/workouts
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;

    this._renderStats();
    this._displayCaloriesConsumed(meal);
    this._displayCaloriesRemaining();
    this._displayCaloriesTotal();
  }

  removeMeal(meal) {
    this._meals.pop(meal);
    this._totalCalories -= meal.calories;

    this._renderStats();
    this._displayCaloriesTotal();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;

    this._renderStats();

    this._displayCaloriesBurned(workout);
    this._displayCaloriesTotal();
    this._displayCaloriesRemaining();
  }

  removeWorkout(workout) {
    this._workouts.pop(workout);

    this._renderStats();
  }

  // Private Methods //

  // Display stuff in the DOM
  _displayCaloriesTotal() {
    const gainLoss = document.querySelector('#gainLoss');
    const div = document.querySelector('#gainLossDiv');

    const pos = () => {
      let acc = 0;
      this._workouts.forEach((workout) => {
        acc -= workout.calories;
      });
      return acc;
    };

    const neg = () => {
      let acc = 0;
      this._meals.forEach((meal) => {
        acc += meal.calories;
      });
      return acc;
    };

    gainLoss.textContent = parseInt(neg() + pos());

    if (parseInt(gainLoss.textContent) < 0) {
      div.classList.remove('bg-success');
      div.classList.add('bg-danger');
    }
  }

  _displayCalorieLimit() {
    const dailyLimit = document.getElementById('dailyLimit');
    dailyLimit.textContent = this._calorieLimit;
  }

  _displayCaloriesConsumed(meal) {
    const consumed = document.getElementById('consumed');

    consumed.textContent = parseInt(consumed.textContent) + meal.calories;
  }

  _displayCaloriesBurned(workout) {
    const burned = document.getElementById('burned');

    burned.textContent = parseInt(burned.textContent) + workout.calories;
  }

  _displayCaloriesRemaining() {
    const remaining = document.getElementById('remaining');
    const div = document.querySelector('.remaining');
    const progressBar = document.getElementById('calorie-progress');

    let mealAcc = this._calorieLimit;
    let workoutAcc = 0;

    this._workouts.forEach((workout) => {
      workoutAcc += workout.calories;
    });

    this._meals.forEach((meal) => {
      mealAcc -= meal.calories;
    });

    remaining.textContent = mealAcc + workoutAcc;

    if (parseInt(remaining.textContent) < 0) {
      // change cals remaining div color
      div.classList.remove('bg-light');
      div.classList.add('bg-danger');

      // change progress bar color
      progressBar.classList.remove('bg-primary');
      progressBar.classList.add('bg-danger');
    } else {
      div.classList.remove('bg-danger');
      div.classList.add('bg-light');

      progressBar.classList.remove('bg-danger');
      progressBar.classList.add('bg-success');
    }
  }

  _displayCaloriesProgress() {
    const progressBar = document.getElementById('calorie-progress');
    const percentage = (this._totalCalories / this._calorieLimit) * 100;
    console.log(percentage);

    const width = Math.min(percentage, 100);
    console.log(width);

    progressBar.style.width = `${width}%`;
  }

  _renderStats() {
    this._displayCaloriesProgress();
  }

  resetDay() {}
  setLimits() {}
  loadItems() {}
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
tracker.addMeal(new Meal('lunch', 500));
tracker.addMeal(new Meal('dinner', 600));
tracker.addWorkout(run);
tracker.addWorkout(new Workout('bike', 700));

// console.log(tracker._totalCalories);
