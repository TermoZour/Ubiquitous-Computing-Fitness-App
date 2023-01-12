export const WIZARD_STATUS = '@wizardDone';
export const WIZARD_NAME = '@WizardName';
export const WIZARD_PROGRAM = '@WizardProgram';
export const WIZARD_TRUE_STATE = 'true';
export const WIZARD_MAINTAIN = '0';
export const WIZARD_BURN = '1';
export const WIZARD_GAIN = '2';
export const MEAL_DB = '@MealDb';

export class MealEntry {
  constructor(id, amount, isGrams) {
    this.id = id;
    this.amount = amount;
    this.isGrams = isGrams; // if true, amount is grams of meal. if false, amount is servings of meal.
  }
}

export class DayEntry {
  constructor(breakfast = [], morning_snack = [], lunch = [], afternoon_snack = [], dinner = []) {
    this.breakfast = breakfast;
    this.morning_snack = morning_snack;
    this.lunch = lunch;
    this.afternoon_snack = afternoon_snack;
    this.dinner = dinner;
  }
}

export const mealDatabase = [
  {
    "id": "5054781302810",
    "name": "Mozarella Sticks",
    "grams": 240,
    "energy_per_100g": 324,
    "carbs_per_100g": 25,
    "fibre_per_100g": 1.8,
    "protein_per_100g": 11,
    "servings": 12,
    "energy_per_serving": 62,
    "carbs_per_serving": 4.7,
    "fibre_per_serving": 0.5,
    "protein_per_serving": 2.1
  },
  {
    "id": "1",
    "name": "Breaded Chicken",
    "grams": 100,
    "energy_per_100g": 50
  }
]
