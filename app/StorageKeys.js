export const WIZARD_STATUS = '@wizardDone';
export const WIZARD_NAME = '@WizardName';
export const WIZARD_PROGRAM = '@WizardProgram';
export const WIZARD_TRUE_STATE = 'true';
export const WIZARD_MAINTAIN = '0';
export const WIZARD_BURN = '1';
export const WIZARD_GAIN = '2';

export class Meal {
  constructor(name, grams = 1, grams_per_serving = 1, servings = 1, energy = 0, carbs = 0, protein = 0, fibre = 0) {
    this.name = name;
    this.grams = grams;
    this.grams_per_serving = grams_per_serving;
    this.servings = servings;
    this.energy = energy;
    this.carbs = carbs;
    this.protein = protein;
    this.fibre = fibre
  }
}

export class DayEntry {
  constructor(week = 1, day = 1, breakfast = [], morning_snack = [], lunch = [], afternoon_snack = [], dinner = []) {
    this.week = week;
    this.day = day;
    this.breakfast = breakfast;
    this.morning_snack = morning_snack;
    this.lunch = lunch;
    this.afternoon_snack = afternoon_snack;
    this.dinner = dinner;
  }

  // const data = {
  //   'week': 1,
  //   'day': 2,z
  //   'breakfast': [
  //     {
  //       'name': 'sandwich',
  //       'grams': 0,
  //       'portions': 0,
  //       'carbs': 0,
  //       'fiber': 0,
  //       'protein': 0,
  //     }
  //   ],
  //   'morning_snack': [{}],
  //   'lunch': [{}],
  //   'afternoon_snack': [{}],
  //   'dinner': [{}]
  // }
}