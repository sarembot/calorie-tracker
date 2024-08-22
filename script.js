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
    this._totalCalories = this._calorieLimit;
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
        acc += workout.calories;
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

    gainLoss.textContent = parseInt(neg() - pos());

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

    let mealAcc = this._calorieLimit;
    let workoutAcc = 0;

    this._workouts.forEach((workout) => {
      workoutAcc += workout.calories;
    });

    this._meals.forEach((meal) => {
      mealAcc -= meal.calories;
    });

    remaining.textContent = mealAcc + workoutAcc;

    // if (acc < 0) {
    //   console.log(div);
    //   div.classList.remove('bg-success');
    //   div.style.backgroundColor = 'orange';
    // } else {
    //   div.classList.add('bg-success');
    // }
  }

  _displayCaloriesProgress() {
    const progressBar = document.getElementById('calorie-progress');
    const percentage = (this._calorieLimit / this._totalCalories) * 100;

    const width = Math.min(percentage, 100);

    progressBar.style.width = `${width}%`;

    // Change color of progress bar
    if (parseInt(document.querySelector('.remaining').textContent) > 0) {
      progressBar.classList.add('bg-success');
      progressBar.classList.remove('bg-danger');
    } else {
      progressBar.classList.remove('bg-success');
      progressBar.classList.add('bg-danger');
    }
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
// tracker.addMeal(new Meal('lunch', 500));
tracker.addMeal(new Meal('dinner', 600));
tracker.addWorkout(run);

// console.log(tracker._totalCalories);
