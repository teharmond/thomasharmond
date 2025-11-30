"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Coffee,
  UtensilsCrossed,
  Moon,
  Cookie,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type MealType = "breakfast" | "lunch" | "dinner" | "other";

const mealTypes: { type: MealType; label: string; icon: typeof Coffee }[] = [
  { type: "breakfast", label: "Breakfast", icon: Coffee },
  { type: "lunch", label: "Lunch", icon: UtensilsCrossed },
  { type: "dinner", label: "Dinner", icon: Moon },
  { type: "other", label: "Snack/Dessert", icon: Cookie },
];

// Get Monday of the week for a given date
function getMonday(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Format date as YYYY-MM-DD
function formatDateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

// Format date for display
function formatDateDisplay(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

// Check if date is today
function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export default function MealPlanPage() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<MealType | null>(
    null
  );
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>("");

  const recipes = useQuery(api.recipes.getRecipes);
  const addMealPlan = useMutation(api.mealPlans.addMealPlan);
  const removeMealPlan = useMutation(api.mealPlans.removeMealPlan);

  // Calculate week dates starting from Monday
  const weekDates = useMemo(() => {
    const today = new Date();
    const monday = getMonday(today);
    monday.setDate(monday.getDate() + weekOffset * 7);

    const dates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      dates.push(d);
    }
    return dates;
  }, [weekOffset]);

  const startDate = formatDateKey(weekDates[0]);
  const endDate = formatDateKey(weekDates[6]);

  const mealPlans = useQuery(api.mealPlans.getMealPlansForDateRange, {
    startDate,
    endDate,
  });

  // Group meal plans by date and meal type
  const mealPlansByDateAndType = useMemo(() => {
    const grouped: Record<string, Record<MealType, typeof mealPlans>> = {};
    if (!mealPlans) return grouped;

    for (const plan of mealPlans) {
      if (!grouped[plan.date]) {
        grouped[plan.date] = {
          breakfast: [],
          lunch: [],
          dinner: [],
          other: [],
        };
      }
      grouped[plan.date][plan.mealType].push(plan);
    }
    return grouped;
  }, [mealPlans]);

  const handleAddMeal = (date: string, mealType: MealType) => {
    setSelectedDate(date);
    setSelectedMealType(mealType);
    setSelectedRecipeId("");
    setShowAddDialog(true);
  };

  const handleConfirmAdd = async () => {
    if (!selectedDate || !selectedMealType || !selectedRecipeId) return;

    try {
      await addMealPlan({
        date: selectedDate,
        mealType: selectedMealType,
        recipeId: selectedRecipeId as Id<"recipes">,
      });
      setShowAddDialog(false);
    } catch (error) {
      console.error("Failed to add meal:", error);
    }
  };

  const handleRemoveMeal = async (planId: Id<"mealPlans">) => {
    try {
      await removeMealPlan({ id: planId });
    } catch (error) {
      console.error("Failed to remove meal:", error);
    }
  };

  // Sort dates so today appears first
  const sortedDates = useMemo(() => {
    const todayIndex = weekDates.findIndex((d) => isToday(d));
    if (todayIndex === -1) return weekDates;
    return [
      ...weekDates.slice(todayIndex),
      ...weekDates.slice(0, todayIndex),
    ];
  }, [weekDates]);

  if (mealPlans === undefined || recipes === undefined) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading meal plans...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Week Navigation */}
      <div className="flex items-center justify-between rounded-lg bg-muted/50 p-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setWeekOffset((prev) => prev - 1)}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="text-center">
          <p className="text-sm font-medium">
            {formatDateDisplay(weekDates[0])} - {formatDateDisplay(weekDates[6])}
          </p>
          {weekOffset === 0 && (
            <p className="text-xs text-muted-foreground">This week</p>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setWeekOffset((prev) => prev + 1)}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {weekOffset !== 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setWeekOffset(0)}
          className="mx-auto"
        >
          Back to this week
        </Button>
      )}

      {/* Days List */}
      <div className="flex flex-col gap-4">
        {sortedDates.map((date) => {
          const dateKey = formatDateKey(date);
          const dayPlans = mealPlansByDateAndType[dateKey];
          const today = isToday(date);

          return (
            <div
              key={dateKey}
              className={cn(
                "rounded-lg border",
                today && "border-primary ring-1 ring-primary"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-between rounded-t-lg border-b px-4 py-2",
                  today ? "bg-primary/10" : "bg-muted/50"
                )}
              >
                <div>
                  <p className="font-medium">
                    {date.toLocaleDateString("en-US", { weekday: "long" })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {date.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                {today && (
                  <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                    Today
                  </span>
                )}
              </div>

              <div className="divide-y">
                {mealTypes.map(({ type, label, icon: Icon }) => {
                  const meals = dayPlans?.[type] || [];

                  return (
                    <div key={type} className="p-3">
                      <div className="mb-2 flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{label}</span>
                      </div>

                      <div className="flex flex-col gap-2">
                        {meals.map((meal) => (
                          <div
                            key={meal._id}
                            className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2"
                          >
                            <span className="text-sm">
                              {meal.recipe?.title || "Unknown recipe"}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleRemoveMeal(meal._id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 justify-start text-muted-foreground"
                          onClick={() => handleAddMeal(dateKey, type)}
                        >
                          <Plus className="mr-1 h-3 w-3" />
                          Add {label.toLowerCase()}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Meal Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Meal</DialogTitle>
            <DialogDescription>
              Choose a recipe for{" "}
              {selectedMealType && mealTypes.find((m) => m.type === selectedMealType)?.label.toLowerCase()}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Select value={selectedRecipeId} onValueChange={setSelectedRecipeId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a recipe" />
              </SelectTrigger>
              <SelectContent>
                {recipes.length === 0 ? (
                  <div className="p-2 text-center text-sm text-muted-foreground">
                    No recipes yet. Add some first!
                  </div>
                ) : (
                  recipes.map((recipe) => (
                    <SelectItem key={recipe._id} value={recipe._id}>
                      {recipe.title}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowAddDialog(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleConfirmAdd}
                disabled={!selectedRecipeId}
              >
                Add
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
