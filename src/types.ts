export interface UserProfile {
  name: string;
  email: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  dietaryPreference: 'Veg' | 'Non-veg' | 'Eggetarian' | 'Vegan';
  allergies: string[];
  religionRestriction: string;
  fastingPreference: string;
  height: string;
  weight: string;
  healthGoal: 'Weight Loss' | 'Muscle Gain' | 'Maintain' | 'Manage Diabetes';
  dailyBudget: string;
  spiceLevel: 'Mild' | 'Medium' | 'Spicy';
  workingHours: string;
  subscriptionPlan: {
    status: 'Active' | 'Paused' | 'Expired';
    type: 'Monthly' | 'Quarterly' | 'Annual';
    renewalDate: string;
    daysLeft: number;
  };
}

export interface MealItem {
  id: string;
  name: string;
  time: string;
  calories: number;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  image: string;
  isEaten: boolean;
  carbs: number;
  protein: number;
  fats: number;
  description: string;
  ingredients: string[];
  tags: string[];
}

export interface DayPlan {
  id: string;
  dateStr: string;
  dayName: string;
  dayNumber: number;
  month: string;
  year: number;
  totalCalories: number;
  targetCalories: number;
  meals: MealItem[];
}

export interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  category: 'Vegetables' | 'Others' | 'Pantry' | 'Dairy';
  checked: boolean;
  price: number;
}

export interface NutritionData {
  avgDailyCalories: number;
  targetCalories: number;
  carbsPercent: number;
  proteinPercent: number;
  fatsPercent: number;
  dailyProtein: number;
  dailyFiber: number;
  dailySugar: number;
  dailySodium: number;
  weeklyTrend: { day: string; calories: number; target: number }[];
}

export interface CookProfile {
  name: string;
  rating: number;
  totalReviews: number;
  experienceYears: number;
  languages: string[];
  assigned: boolean;
  cuisine: string;
  availability: string;
  distanceKm: number;
  avatar: string;
  specialties: string[];
  hygieneScore: number;
  bio: string;
  phone: string;
}

export interface MealFeedback {
  id: string;
  dishName: string;
  date: string;
  mealType: string;
  taste: number;
  oilLevel: number;
  spice: number;
  quantity: number;
  notes: string;
  timestamp: string;
}

export type ActiveTab =
  | 'dashboard'
  | 'mealplan'
  | 'grocery'
  | 'nutrition'
  | 'mycook'
  | 'feedback'
  | 'profile'
  | 'cookportal';

export type ViewportMode = 'laptop' | 'mobile';
