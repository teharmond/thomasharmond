"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
  Plus,
  Search,
  ExternalLink,
  Trash2,
  Edit2,
  X,
  ChevronDown,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type Ingredient = {
  name: string;
  amount: string;
};

type Recipe = {
  _id: Id<"recipes">;
  title: string;
  ingredients: Ingredient[];
  tags: string[];
  imageUrl?: string;
  sourceUrl?: string;
  createdAt: number;
  updatedAt: number;
};

export default function RecipesPage() {
  const recipes = useQuery(api.recipes.getRecipes);
  const createRecipe = useMutation(api.recipes.createRecipe);
  const updateRecipe = useMutation(api.recipes.updateRecipe);
  const deleteRecipe = useMutation(api.recipes.deleteRecipe);
  const addIngredientsToShopping = useMutation(
    api.shoppingList.addIngredientsFromRecipe
  );

  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [viewingRecipe, setViewingRecipe] = useState<Recipe | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formIngredients, setFormIngredients] = useState<Ingredient[]>([
    { name: "", amount: "" },
  ]);
  const [formTags, setFormTags] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formSourceUrl, setFormSourceUrl] = useState("");

  // Get all unique tags
  const allTags = Array.from(
    new Set(recipes?.flatMap((r) => r.tags) || [])
  ).sort();

  // Filter recipes
  const filteredRecipes = recipes?.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.ingredients.some((i) =>
        i.name.toLowerCase().includes(search.toLowerCase())
      );
    const matchesTag = !selectedTag || recipe.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const resetForm = () => {
    setFormTitle("");
    setFormIngredients([{ name: "", amount: "" }]);
    setFormTags("");
    setFormImageUrl("");
    setFormSourceUrl("");
  };

  const openEditDialog = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setFormTitle(recipe.title);
    setFormIngredients(
      recipe.ingredients.length > 0
        ? recipe.ingredients
        : [{ name: "", amount: "" }]
    );
    setFormTags(recipe.tags.join(", "));
    setFormImageUrl(recipe.imageUrl || "");
    setFormSourceUrl(recipe.sourceUrl || "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const validIngredients = formIngredients.filter(
      (i) => i.name.trim() && i.amount.trim()
    );
    const tags = formTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      if (editingRecipe) {
        await updateRecipe({
          id: editingRecipe._id,
          title: formTitle.trim(),
          ingredients: validIngredients,
          tags,
          imageUrl: formImageUrl.trim() || undefined,
          sourceUrl: formSourceUrl.trim() || undefined,
        });
        setEditingRecipe(null);
      } else {
        await createRecipe({
          title: formTitle.trim(),
          ingredients: validIngredients,
          tags,
          imageUrl: formImageUrl.trim() || undefined,
          sourceUrl: formSourceUrl.trim() || undefined,
        });
        setShowCreateDialog(false);
      }
      resetForm();
    } catch (error) {
      console.error("Failed to save recipe:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: Id<"recipes">) => {
    if (!confirm("Are you sure you want to delete this recipe?")) return;
    try {
      await deleteRecipe({ id });
      setViewingRecipe(null);
    } catch (error) {
      console.error("Failed to delete recipe:", error);
    }
  };

  const handleAddToShopping = async (recipeId: Id<"recipes">) => {
    try {
      await addIngredientsToShopping({ recipeId });
      alert("Ingredients added to shopping list!");
    } catch (error) {
      console.error("Failed to add ingredients:", error);
    }
  };

  const addIngredientRow = () => {
    setFormIngredients([...formIngredients, { name: "", amount: "" }]);
  };

  const updateIngredient = (
    index: number,
    field: "name" | "amount",
    value: string
  ) => {
    const updated = [...formIngredients];
    updated[index][field] = value;
    setFormIngredients(updated);
  };

  const removeIngredient = (index: number) => {
    if (formIngredients.length > 1) {
      setFormIngredients(formIngredients.filter((_, i) => i !== index));
    }
  };

  if (recipes === undefined) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading recipes...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Search and Filter */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                !selectedTag
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                  tag === selectedTag
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Recipe Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRecipes?.map((recipe) => (
          <button
            key={recipe._id}
            onClick={() => setViewingRecipe(recipe)}
            className="group relative flex flex-col overflow-hidden rounded-lg border bg-card text-left transition-colors hover:bg-accent"
          >
            {recipe.imageUrl && (
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col gap-2 p-3">
              <h3 className="font-medium leading-tight">{recipe.title}</h3>
              <p className="text-xs text-muted-foreground">
                {recipe.ingredients.length} ingredient
                {recipe.ingredients.length !== 1 ? "s" : ""}
              </p>
              {recipe.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {recipe.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                  {recipe.tags.length > 3 && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      +{recipe.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {filteredRecipes?.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
          <p className="text-muted-foreground">No recipes found</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCreateDialog(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add your first recipe
          </Button>
        </div>
      )}

      {/* Floating Add Button */}
      <Button
        size="lg"
        className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg"
        onClick={() => setShowCreateDialog(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Create/Edit Dialog */}
      <Dialog
        open={showCreateDialog || !!editingRecipe}
        onOpenChange={(open) => {
          if (!open) {
            setShowCreateDialog(false);
            setEditingRecipe(null);
            resetForm();
          }
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingRecipe ? "Edit Recipe" : "New Recipe"}
            </DialogTitle>
            <DialogDescription>
              {editingRecipe
                ? "Update your recipe details below."
                : "Add a new recipe to your collection."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Recipe name"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Ingredients</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={addIngredientRow}
                >
                  <Plus className="mr-1 h-3 w-3" />
                  Add
                </Button>
              </div>
              <div className="space-y-2">
                {formIngredients.map((ing, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      placeholder="Amount"
                      value={ing.amount}
                      onChange={(e) => updateIngredient(i, "amount", e.target.value)}
                      className="w-24 flex-shrink-0"
                    />
                    <Input
                      placeholder="Ingredient"
                      value={ing.name}
                      onChange={(e) => updateIngredient(i, "name", e.target.value)}
                      className="flex-1"
                    />
                    {formIngredients.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeIngredient(i)}
                        className="flex-shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={formTags}
                onChange={(e) => setFormTags(e.target.value)}
                placeholder="e.g., dinner, quick, vegetarian"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL (optional)</Label>
              <Input
                id="imageUrl"
                type="url"
                value={formImageUrl}
                onChange={(e) => setFormImageUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sourceUrl">Recipe Link (optional)</Label>
              <Input
                id="sourceUrl"
                type="url"
                value={formSourceUrl}
                onChange={(e) => setFormSourceUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowCreateDialog(false);
                  setEditingRecipe(null);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={!formTitle.trim() || isSubmitting}
              >
                {isSubmitting ? "Saving..." : editingRecipe ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Recipe Sheet */}
      <Sheet open={!!viewingRecipe} onOpenChange={() => setViewingRecipe(null)}>
        <SheetContent side="bottom" className="h-[85vh] overflow-y-auto">
          {viewingRecipe && (
            <>
              <SheetHeader className="text-left">
                <SheetTitle className="pr-8">{viewingRecipe.title}</SheetTitle>
                <SheetDescription>
                  {viewingRecipe.ingredients.length} ingredient
                  {viewingRecipe.ingredients.length !== 1 ? "s" : ""}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-6">
                {viewingRecipe.imageUrl && (
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <img
                      src={viewingRecipe.imageUrl}
                      alt={viewingRecipe.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                {viewingRecipe.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {viewingRecipe.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-muted px-3 py-1 text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="space-y-3">
                  <h4 className="font-medium">Ingredients</h4>
                  <ul className="space-y-2">
                    {viewingRecipe.ingredients.map((ing, i) => (
                      <li
                        key={i}
                        className="flex gap-2 rounded-lg bg-muted/50 px-3 py-2"
                      >
                        <span className="font-medium text-muted-foreground">
                          {ing.amount}
                        </span>
                        <span>{ing.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {viewingRecipe.sourceUrl && (
                  <a
                    href={viewingRecipe.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View original recipe
                  </a>
                )}

                <div className="flex flex-col gap-2 border-t pt-4">
                  <Button
                    variant="outline"
                    onClick={() => handleAddToShopping(viewingRecipe._id)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add ingredients to shopping list
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        openEditDialog(viewingRecipe);
                        setViewingRecipe(null);
                      }}
                    >
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => handleDelete(viewingRecipe._id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
