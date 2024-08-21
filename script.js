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

    this._displayCaloriesConsumed(meal);
    this._displayCaloriesRemaining();
    this._displayCaloriesTotal();
  }

  removeMeal(meal) {
    this._meals.pop(meal);
    this._totalCalories -= meal.calories;

    this._displayCaloriesTotal();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;

    this._displayCaloriesBurned(workout);
    this._displayCaloriesTotal();
  }

  removeWorkout(workout) {
    this._workouts.pop(workout);
  }

  // Private Methods //

  // Display stuff in the DOM
  _displayCaloriesTotal() {
    const gainLoss = document.querySelector('#gainLoss');

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
    console.log(neg());

    gainLoss.textContent = parseInt(neg() - pos());
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

    let acc = this._calorieLimit;

    this._meals.forEach((meal) => {
      acc -= meal.calories;
    });

    remaining.textContent = acc;

    if (acc < 0) {
      console.log(div);
      div.classList.remove('bg-success');
      div.style.backgroundColor = 'orange';
    } else {
      div.classList.add('bg-success');
    }
  }

  _renderStats() {}

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
