const dailyLimit = document.getElementById('daily-limit');
const resetBtn = document.getElementById('reset');
const saveBtn = document.getElementById('saveButton');
const dailyLimitInput = document.getElementById('daily-limit-input');
const mealFormBtn = document.getElementById('mealFormBtn');
const workoutFormBtn = document.getElementById('workoutFormBtn');

console.log(dailyLimit.textContent);

saveBtn.addEventListener('click', () => {
  if (NaN) {
    alert('Please Enter a Number.');
    return;
  }

  dailyLimit.textContent = dailyLimitInput.value;
  dailyLimitInput.value = '';
});

// Toggle Add Meal
mealFormBtn.addEventListener('click', () => {
  document.getElementById('collapse-meal').classList.toggle('show');
});

// Toggle Add Workout Form
workoutFormBtn.addEventListener('click', () => {
  document.getElementById('collapse-workout').classList.toggle('show');
});

// App init

class App {
  constructor() {
    const tracker = new calorieTracker(2000, 0, null, null);
  }

  _newItem() {}
  _removeItem() {}
  _filterItems() {}
  _reset() {}
  _setLimit() {}
}

// Tracker init

class calorieTracker {
  constructor(calorieLimit, totalCalories, meals, workouts) {
    this._calorieLimit = calorieLimit;
    this._totalCalories = totalCalories;
    this._meals = meals;
    this._workouts = workouts;
  }

  addMeal() {}
  removeMeal() {}
  addWorkout() {}
  removeWorkout() {}
  resetDay() {}
  addMeal() {}
  _displayCaloriesTotal() {}
  _displayCalorieLimit() {}
  _displayCaloriesConsumed() {}
  _displayCaloriesBurned() {}
  _displayCaloriesRemaining() {}
}

// meal

class meal {
  constructor(id, name, calories) {
    _this.id = id;
    _this.name = name;
    _this.calories = calories;
  }
}

//workouts

class workout {
  constructor(id, name, calories) {
    _this.id = id;
    _this.name = name;
    _this.calories = calories;
  }
}
