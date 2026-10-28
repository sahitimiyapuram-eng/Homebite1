import React, { useEffect, useState } from 'react';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { DashboardBottomSection } from './components/dashboard/DashboardBottomSection';
import { HeroBanner } from './components/dashboard/HeroBanner';
import { MascotTipCard } from './components/dashboard/MascotTipCard';
import { MealsStrip } from './components/dashboard/MealsStrip';
import { QuickActions } from './components/dashboard/QuickActions';
import {
  FOOD_IMAGES,
  INITIAL_COOK,
  INITIAL_DAYS_PLAN,
  INITIAL_GROCERY_ITEMS,
  INITIAL_NUTRITION,
  INITIAL_USER,
} from './data/mockData';
import { CookPortalView } from './pages/CookPortalView';
import { FeedbackView } from './pages/FeedbackView';
import { GroceryView } from './pages/GroceryView';
import { MealPlanView } from './pages/MealPlanView';
import { MyCookView } from './pages/MyCookView';
import { NutritionView } from './pages/NutritionView';
import { ProfileView } from './pages/ProfileView';
import { WelcomeFlowView } from './pages/WelcomeFlowView';
import {
  ActiveTab,
  CookProfile,
  DayPlan,
  GroceryItem,
  MealFeedback,
  MealItem,
  NutritionData,
  UserProfile,
} from './types';
import { X } from 'lucide-react';

// Helper to parse browser URL hash into navigation state for native browser back/forward support
function parseNavFromHash(hash: string): {
  inWelcomeFlow: boolean;
  welcomeStage: 'login' | 'onboarding';
  onboardingStep: number;
  activeTab: ActiveTab;
} {
  const clean = hash.replace(/^#\/?/, '').trim().toLowerCase();

  if (!clean || clean === 'login' || clean === 'welcome') {
    return {
      inWelcomeFlow: true,
      welcomeStage: 'login',
      onboardingStep: 1,
      activeTab: 'dashboard',
    };
  }

  if (clean.startsWith('onboard')) {
    const parts = clean.split('/');
    const stepNum = parts[1] ? parseInt(parts[1], 10) : 1;
    const step = Math.min(Math.max(stepNum || 1, 1), 4);
    return {
      inWelcomeFlow: true,
      welcomeStage: 'onboarding',
      onboardingStep: step,
      activeTab: 'dashboard',
    };
  }

  const validTabs: ActiveTab[] = [
    'dashboard',
    'mealplan',
    'grocery',
    'nutrition',
    'mycook',
    'feedback',
    'profile',
    'cookportal',
  ];

  if (validTabs.includes(clean as ActiveTab)) {
    return {
      inWelcomeFlow: false,
      welcomeStage: 'onboarding',
      onboardingStep: 4,
      activeTab: clean as ActiveTab,
    };
  }

  return {
    inWelcomeFlow: true,
    welcomeStage: 'login',
    onboardingStep: 1,
    activeTab: 'dashboard',
  };
}

export default function App() {
  const initialNav = parseNavFromHash(typeof window !== 'undefined' ? window.location.hash : '');
  const [inWelcomeFlow, setInWelcomeFlow] = useState<boolean>(initialNav.inWelcomeFlow);
  const [welcomeStage, setWelcomeStage] = useState<'login' | 'onboarding'>(initialNav.welcomeStage);
  const [onboardingStep, setOnboardingStep] = useState<number>(initialNav.onboardingStep);
  const [activeTab, setActiveTab] = useState<ActiveTab>(initialNav.activeTab);

  // State initialization with localStorage fallback
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('homebite_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [cook, setCook] = useState<CookProfile>(() => {
    const saved = localStorage.getItem('homebite_cook');
    return saved ? JSON.parse(saved) : INITIAL_COOK;
  });

  const [dayPlans, setDayPlans] = useState<DayPlan[]>(() => {
    const saved = localStorage.getItem('homebite_dayplans');
    return saved ? JSON.parse(saved) : INITIAL_DAYS_PLAN;
  });

  const [selectedDayId, setSelectedDayId] = useState<string>('day-21');

  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(() => {
    const saved = localStorage.getItem('homebite_groceries');
    return saved ? JSON.parse(saved) : INITIAL_GROCERY_ITEMS;
  });

  const [nutrition, setNutrition] = useState<NutritionData>(() => {
    const saved = localStorage.getItem('homebite_nutrition');
    return saved ? JSON.parse(saved) : INITIAL_NUTRITION;
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('homebite_dark_mode');
    return saved ? JSON.parse(saved) : false;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize browser history and hash for native browser Back button
  useEffect(() => {
    if (!window.location.hash || window.location.hash === '#' || window.location.hash === '#/') {
      window.history.replaceState(null, '', '#/login');
    }

    const handleSyncFromHash = () => {
      const nav = parseNavFromHash(window.location.hash);
      setInWelcomeFlow(nav.inWelcomeFlow);
      setWelcomeStage(nav.welcomeStage);
      setOnboardingStep(nav.onboardingStep);
      setActiveTab(nav.activeTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleSyncFromHash);
    window.addEventListener('popstate', handleSyncFromHash);

    return () => {
      window.removeEventListener('hashchange', handleSyncFromHash);
      window.removeEventListener('popstate', handleSyncFromHash);
    };
  }, []);

  const handleNavigateWelcome = (stage: 'login' | 'onboarding', step: number = 1) => {
    setInWelcomeFlow(true);
    setWelcomeStage(stage);
    setOnboardingStep(step);
    const targetHash = stage === 'login' ? '#/login' : `#/onboard/${step}`;
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTab = (tab: ActiveTab) => {
    window.location.hash = `#/${tab}`;
  };

  const handleOpenOnboarding = () => {
    window.location.hash = '#/onboard/1';
  };

  const handleOpenLogin = () => {
    window.location.hash = '#/login';
  };

  // Sync dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('homebite_dark_mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Sync user profile
  useEffect(() => {
    localStorage.setItem('homebite_user', JSON.stringify(user));
  }, [user]);

  // Sync groceries
  useEffect(() => {
    localStorage.setItem('homebite_groceries', JSON.stringify(groceryItems));
  }, [groceryItems]);

  // Sync day plans
  useEffect(() => {
    localStorage.setItem('homebite_dayplans', JSON.stringify(dayPlans));
  }, [dayPlans]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Toggle meal eaten
  const handleToggleEaten = (mealId: string) => {
    setDayPlans((prev) =>
      prev.map((day) => ({
        ...day,
        meals: day.meals.map((m) =>
          m.id === mealId ? { ...m, isEaten: !m.isEaten } : m
        ),
      }))
    );
    showToast('Meal status logged!');
  };

  // Alternative dishes pool for swapping
  const alternativeDishes: Omit<MealItem, 'id'>[] = [
    {
      name: 'Moong Dal Chilla & Mint Chutney',
      time: '8:00 AM',
      calories: 390,
      category: 'Breakfast',
      image: FOOD_IMAGES.poha,
      isEaten: false,
      carbs: 48,
      protein: 18,
      fats: 12,
      description: 'Lentil crepes prepared with cumin and low-oil spray.',
      ingredients: ['Moong Dal', 'Mint', 'Ginger', 'Hing'],
      tags: ['High Protein', 'Gluten Free'],
    },
    {
      name: 'Rajma Masala with Jeera Rice',
      time: '1:00 PM',
      calories: 640,
      category: 'Lunch',
      image: FOOD_IMAGES.dalRice,
      isEaten: false,
      carbs: 98,
      protein: 24,
      fats: 16,
      description: 'Homestyle red kidney beans with aromatic jeera rice.',
      ingredients: ['Red Rajma', 'Basmati Rice', 'Jeera', 'Coriander'],
      tags: ['Iron Rich', 'Comfort Meal'],
    },
    {
      name: 'Methi Thepla with Fresh Curd',
      time: '8:00 PM',
      calories: 510,
      category: 'Dinner',
      image: FOOD_IMAGES.paneerRoti,
      isEaten: false,
      carbs: 60,
      protein: 16,
      fats: 18,
      description: 'Fenugreek whole wheat spiced flatbreads with probiotic curd.',
      ingredients: ['Methi', 'Whole Wheat', 'Ajwain', 'Fresh Dahi'],
      tags: ['Light Dinner', 'Ayurvedic'],
    },
  ];

  // Swap meal logic
  const handleSwapMeal = (mealId: string) => {
    const randomAlt = alternativeDishes[Math.floor(Math.random() * alternativeDishes.length)];
    setDayPlans((prev) =>
      prev.map((day) => ({
        ...day,
        meals: day.meals.map((m) =>
          m.id === mealId
            ? {
                ...m,
                name: randomAlt.name,
                calories: randomAlt.calories,
                carbs: randomAlt.carbs,
                protein: randomAlt.protein,
                fats: randomAlt.fats,
                description: randomAlt.description,
                ingredients: randomAlt.ingredients,
              }
            : m
        ),
      }))
    );
    showToast(`Swapped with ${randomAlt.name}!`);
  };

  // Re-plan / Shuffle Day Plan with AI
  const handleShuffleDayPlan = (dayId: string) => {
    setDayPlans((prev) =>
      prev.map((day) => {
        if (day.id !== dayId) return day;
        return {
          ...day,
          meals: day.meals.map((m, idx) => {
            const alt = alternativeDishes[idx % alternativeDishes.length];
            return {
              ...m,
              name: alt.name,
              calories: alt.calories,
              carbs: alt.carbs,
              protein: alt.protein,
              fats: alt.fats,
              description: alt.description,
              ingredients: alt.ingredients,
            };
          }),
        };
      })
    );
    showToast('Plan optimized by AI with fresh seasonal recipes!');
  };

  // Grocery handlers
  const handleToggleGrocery = (id: string) => {
    setGroceryItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleAddGrocery = (item: Omit<GroceryItem, 'id'>) => {
    const newItem: GroceryItem = { ...item, id: `g-${Date.now()}` };
    setGroceryItems((prev) => [newItem, ...prev]);
    showToast(`Added ${item.name} to grocery list!`);
  };

  const handleDeleteGrocery = (id: string) => {
    setGroceryItems((prev) => prev.filter((i) => i.id !== id));
    showToast('Item removed from pantry list');
  };

  // Feedback handler
  const handleSubmitFeedback = (feedback: MealFeedback) => {
    showToast('Feedback saved! Chef Priya will tune spices for upcoming meals.');
    setCook((prev) => ({
      ...prev,
      totalReviews: prev.totalReviews + 1,
    }));
  };

  // User update handler
  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  // Active day meals for current day
  const currentDay = dayPlans.find((d) => d.id === selectedDayId) || dayPlans[0];

  // Search results
  const searchFilterActive = Boolean(searchQuery.trim());
  const matchingMeals = searchFilterActive
    ? dayPlans
        .flatMap((d) => d.meals)
        .filter(
          (m) =>
            m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.ingredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    : [];

  // =====================================================================
  // 1. OPENING FLOW (USER REQUIREMENT):
  // "when the app opens i see this image first as the then i scrolls and i
  //  see the login screen when i click login it automatically gets me to splash
  //  and onboard part of the site and on the last page of this splah and onboard
  //  page i see save and go to dashboard just then it will get me to the main
  //  dashboard page"
  // =====================================================================
  if (inWelcomeFlow) {
    return (
      <div className={`min-h-screen font-['Poppins'] transition-colors ${
        isDarkMode ? 'bg-[#18110E] text-[#FAF3EF]' : 'bg-[#FFFBF0] text-[#4B2E25]'
      }`}>
        <WelcomeFlowView
          initialUser={user}
          stage={welcomeStage}
          onboardingStep={onboardingStep}
          onNavigateWelcome={handleNavigateWelcome}
          onBackToDashboard={() => {
            setInWelcomeFlow(false);
            window.location.hash = '#/dashboard';
          }}
          onCompleteFlow={(newProfile) => {
            handleUpdateUser(newProfile);
            handleSelectTab('dashboard');
            showToast('Welcome to Homebite! Your personalized plan is active.');
          }}
          isDarkMode={isDarkMode}
        />
      </div>
    );
  }

  // =====================================================================
  // 2. MAIN DASHBOARD PAGE & TAB NAVIGATION (CLEAN DESKTOP VIEW)
  // No mobile view toggle, no login/splash in sidebar, no login on top
  // =====================================================================
  return (
    <div className={`min-h-screen font-['Poppins'] transition-colors ${
      isDarkMode ? 'bg-[#18110E] text-[#FAF3EF]' : 'bg-[#FFFBF0] text-[#4B2E25]'
    }`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#4B2E25] dark:bg-[#AE7C53] text-[#FFFBF0] shadow-2xl text-xs font-semibold animate-in slide-in-from-bottom-5">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="opacity-70 hover:opacity-100">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Full Responsive Workspace Layout */}
      <div className="flex h-screen overflow-hidden">
        {/* Clean Sidebar without login or splash buttons */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <Header
            user={user}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode(!isDarkMode)}
            onSelectTab={handleSelectTab}
            onOpenOnboarding={handleOpenOnboarding}
            onOpenLogin={handleOpenLogin}
          />

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
            {/* If active search query, display filtered meal results */}
            {searchFilterActive ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">
                    Search Results for &ldquo;{searchQuery}&rdquo;
                  </h2>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-[#AE7C53] hover:underline"
                  >
                    Clear Search
                  </button>
                </div>

                {matchingMeals.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {matchingMeals.map((meal) => (
                      <div
                        key={`${meal.id}-${meal.name}`}
                        className={`p-4 rounded-2xl border flex gap-3 ${
                          isDarkMode
                            ? 'bg-[#251B17] border-[#3D2C26]'
                            : 'bg-[#FAF3EF] border-[#E8D9CD]'
                        }`}
                      >
                        <img
                          src={meal.image}
                          alt={meal.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div>
                          <span className="text-[10px] text-[#AE7C53] uppercase font-bold">
                            {meal.category}
                          </span>
                          <h4 className="text-sm font-bold">{meal.name}</h4>
                          <p className="text-xs text-[#AE7C53] font-mono mt-0.5">
                            {meal.calories} kcal · P: {meal.protein}g
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-[#AE7C53]">
                    No meals or ingredients found matching &ldquo;{searchQuery}&rdquo;. Try &ldquo;Poha&rdquo;, &ldquo;Paneer&rdquo;, or &ldquo;Dal&rdquo;.
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* View: DASHBOARD */}
                {activeTab === 'dashboard' && (
                  <div className="space-y-6">
                    {/* Hero banner with Indian food photo & metrics */}
                    <HeroBanner
                      user={user}
                      todayCalories={currentDay.totalCalories}
                      targetCalories={nutrition.targetCalories}
                      cookRating={cook.rating}
                      daysLeft={user.subscriptionPlan.daysLeft}
                      onSelectTab={handleSelectTab}
                      isDarkMode={isDarkMode}
                    />

                    {/* Quick Actions Shortcuts */}
                    <QuickActions
                      onSelectTab={handleSelectTab}
                      isDarkMode={isDarkMode}
                    />

                    {/* Today's Meals with real images and eaten toggle */}
                    <MealsStrip
                      meals={currentDay.meals}
                      onToggleEaten={handleToggleEaten}
                      onSwapMeal={handleSwapMeal}
                      isDarkMode={isDarkMode}
                    />

                    {/* Mascot Tip Card with cute 3D robot chef */}
                    <MascotTipCard isDarkMode={isDarkMode} />

                    {/* CRITICAL BOTTOM SECTION FROM SCREENSHOT 2 */}
                    <DashboardBottomSection
                      isDarkMode={isDarkMode}
                      onSelectHealthMode={(mode) => {
                        showToast(`Health Mode filtered for: ${mode}`);
                      }}
                    />
                  </div>
                )}

                {/* View: MEAL PLAN */}
                {activeTab === 'mealplan' && (
                  <MealPlanView
                    dayPlans={dayPlans}
                    selectedDayId={selectedDayId}
                    onSelectDay={setSelectedDayId}
                    onToggleEaten={handleToggleEaten}
                    onSwapMeal={handleSwapMeal}
                    onShuffleDayPlan={handleShuffleDayPlan}
                    isDarkMode={isDarkMode}
                  />
                )}

                {/* View: GROCERY */}
                {activeTab === 'grocery' && (
                  <GroceryView
                    items={groceryItems}
                    onToggleCheck={handleToggleGrocery}
                    onAddItem={handleAddGrocery}
                    onDeleteItem={handleDeleteGrocery}
                    isDarkMode={isDarkMode}
                  />
                )}

                {/* View: NUTRITION */}
                {activeTab === 'nutrition' && (
                  <NutritionView
                    nutrition={nutrition}
                    user={user}
                    isDarkMode={isDarkMode}
                  />
                )}

                {/* View: MY COOK */}
                {activeTab === 'mycook' && (
                  <MyCookView
                    cook={cook}
                    isDarkMode={isDarkMode}
                    onNavigateFeedback={() => handleSelectTab('feedback')}
                  />
                )}

                {/* View: FEEDBACK */}
                {activeTab === 'feedback' && (
                  <FeedbackView
                    isDarkMode={isDarkMode}
                    onSubmitFeedback={handleSubmitFeedback}
                  />
                )}

                {/* View: PROFILE */}
                {activeTab === 'profile' && (
                  <ProfileView
                    user={user}
                    onUpdateUser={handleUpdateUser}
                    isDarkMode={isDarkMode}
                    onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                    onOpenOnboarding={handleOpenOnboarding}
                    onOpenLogin={handleOpenLogin}
                  />
                )}

                {/* View: COOK PORTAL */}
                {activeTab === 'cookportal' && (
                  <CookPortalView
                    onBackToCustomerView={() => handleSelectTab('dashboard')}
                    isDarkMode={isDarkMode}
                  />
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
