// App init
class App {
  constructor() {
    this._tracker = new CalorieTracker();

    // Event Listners ---
    // New meal
    document
      .getElementById('meal-form')
      .addEventListener('submit', this._newMeal.bind(this));

    // New Workout
    document
      .getElementById('workout-form')
      .addEventListener('submit', this._newWorkout.bind(this));
  }

  _newMeal(e) {
    e.preventDefault();

    let name = document.getElementById('meal-name');
    let calories = document.getElementById('meal-calories');

    // validate inputs
    if (name.value === '' || calories.value === '') {
      alert('Please fill in all required fields.');
      return;
    }

    const meal = new Meal(name.value, +calories.value);
    this._tracker.addMeal(meal);
    name.value = '';
    calories.value = '';
  }

  _newWorkout(e) {
    e.preventDefault();

    let name = document.getElementById('workout-name');
    let calories = document.getElementById('workout-calories');

    // validate inputs
    if (name.value === '' || calories.value === '') {
      alert('Please fill in all required fields.');
      return;
    }

    const workout = new Workout(name.value, +calories.value);
    this._tracker.addWorkout(workout);
    name.value = '';
    calories.value = '';
  }

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
    this._displayNewMeal(meal);
    this._renderStats();
  }

  removeMeal(meal) {
    this._meals.pop(meal);
    this._totalCalories -= meal.calories;

    this._renderStats();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._displayNewWorkout(workout);
    this._renderStats();
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

    gainLoss.textContent = 0;
    gainLoss.textContent =
      this._displayCaloriesConsumed() - this._displayCaloriesBurned();

    if (parseInt(gainLoss.textContent) < 0) {
      div.classList.remove('bg-success');
      div.classList.add('bg-danger');
    }
  }

  _displayCalorieLimit() {
    const dailyLimit = document.getElementById('dailyLimit');
    dailyLimit.textContent = this._calorieLimit;
  }

  _displayCaloriesConsumed() {
    const consumed = document.getElementById('consumed');

    const calsConsumed = this._meals.reduce(
      (total, meal) => total + parseInt(meal.calories),
      0
    );

    consumed.textContent = calsConsumed;
    return calsConsumed;
  }

  _displayCaloriesBurned() {
    const burned = document.getElementById('burned');

    const calsBurned = this._workouts.reduce(
      (total, workout) => total + parseInt(workout.calories),
      0
    );

    console.log(calsBurned);
    burned.textContent = calsBurned;
    return calsBurned;
  }

  _displayCaloriesRemaining() {
    const remaining = document.getElementById('remaining');
    const div = document.querySelector('.remaining');
    const progressBar = document.getElementById('calorie-progress');

    remaining.textContent = parseInt(
      this._calorieLimit - this._displayCaloriesConsumed()
    );

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

    const width = Math.min(percentage, 100);

    progressBar.style.width = `${width}%`;
  }

  _displayNewMeal(meal) {
    const meals = document.getElementById('meal-items');

    const div = document.createElement('div');
    div.classList.add('card', 'my-2');
    div.setAttribute('data-id', meal.id);
    div.innerHTML = `
    <div class="card-body">
      <div class="d-flex flex-row align-items-center justify-content-between">
        <h4 class="mx-2">${meal.name}</h4>
        <div class="fs-5 bg-success text-white text-center rounded-2 px-2 px-lg-5">
          ${meal.calories}
        </div>
        <button class="delete btn btn-danger text-white btn-sm mx-2">
          <i class="fa-solid fa-x"></i>
        </button>
      </div>
    </div>
    `;
    meals.appendChild(div);
  }

  _displayNewWorkout(workout) {
    const workouts = document.getElementById('workout-items');

    const div = document.createElement('div');
    div.classList.add('card', 'my-2');
    div.setAttribute('data-id', workout.id);
    div.innerHTML = `
    <div class="card-body">
      <div class="d-flex flex-row align-items-center justify-content-between">
        <h4 class="mx-2 fs-5">${workout.name}</h4>
        <div class="fs-5 bg-primary text-white text-center rounded-2 px-2 px-lg-5">
          ${workout.calories}
        </div>
        <button class="delete btn btn-danger btn-sm mx-2">
          <i class="fa-solid fa-x"></i>
        </button>
      </div>
    </div>
    `;
    workouts.appendChild(div);
  }

  _renderStats() {
    this._displayCaloriesProgress();
    this._displayCaloriesTotal();
    this._displayCalorieLimit();
    this._displayCaloriesRemaining();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
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
const init = new App();
