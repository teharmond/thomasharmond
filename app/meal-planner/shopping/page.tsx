"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Plus, Trash2, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function ShoppingListPage() {
  const items = useQuery(api.shoppingList.getShoppingList);
  const addItem = useMutation(api.shoppingList.addShoppingItem);
  const toggleItem = useMutation(api.shoppingList.toggleShoppingItem);
  const deleteItem = useMutation(api.shoppingList.deleteShoppingItem);
  const clearChecked = useMutation(api.shoppingList.clearCheckedItems);

  const [newItemName, setNewItemName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || isAdding) return;

    setIsAdding(true);
    try {
      await addItem({ name: newItemName.trim() });
      setNewItemName("");
    } catch (error) {
      console.error("Failed to add item:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggle = async (id: Id<"shoppingListItems">) => {
    try {
      await toggleItem({ id });
    } catch (error) {
      console.error("Failed to toggle item:", error);
    }
  };

  const handleDelete = async (id: Id<"shoppingListItems">) => {
    try {
      await deleteItem({ id });
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleClearChecked = async () => {
    if (!confirm("Clear all checked items?")) return;
    try {
      await clearChecked();
    } catch (error) {
      console.error("Failed to clear checked items:", error);
    }
  };

  // Calculate time remaining for checked items
  const getTimeRemaining = (checkedAt: number) => {
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
    const remaining = TWENTY_FOUR_HOURS - (Date.now() - checkedAt);
    const hours = Math.floor(remaining / (60 * 60 * 1000));
    const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  // Separate unchecked and checked items
  const uncheckedItems = items?.filter((item) => !item.checked) || [];
  const checkedItems = items?.filter((item) => item.checked) || [];

  if (items === undefined) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading shopping list...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Add Item Form */}
      <form onSubmit={handleAddItem} className="flex gap-2">
        <Input
          placeholder="Add item..."
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={!newItemName.trim() || isAdding}>
          <Plus className="h-4 w-4" />
        </Button>
      </form>

      {/* Unchecked Items */}
      {uncheckedItems.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            To Buy ({uncheckedItems.length})
          </h3>
          <div className="flex flex-col gap-1">
            {uncheckedItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-3 rounded-lg border bg-card p-3"
              >
                <button
                  onClick={() => handleToggle(item._id)}
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-muted-foreground/50 transition-colors hover:border-primary hover:bg-primary/10"
                >
                  <Check className="h-3 w-3 opacity-0" />
                </button>
                <span className="flex-1">{item.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => handleDelete(item._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Checked Items */}
      {checkedItems.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">
              Completed ({checkedItems.length})
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearChecked}
              className="text-xs text-muted-foreground"
            >
              Clear all
            </Button>
          </div>
          <div className="flex flex-col gap-1">
            {checkedItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-3 rounded-lg border border-muted bg-muted/30 p-3"
              >
                <button
                  onClick={() => handleToggle(item._id)}
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/80"
                >
                  <Check className="h-3 w-3" />
                </button>
                <span className="flex-1 text-muted-foreground line-through">
                  {item.name}
                </span>
                {item.checkedAt && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {getTimeRemaining(item.checkedAt)}
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => handleDelete(item._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground">
            Checked items disappear after 24 hours
          </p>
        </div>
      )}

      {/* Empty State */}
      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
          <p className="text-muted-foreground">Your shopping list is empty</p>
          <p className="text-sm text-muted-foreground">
            Add items above or add ingredients from recipes
          </p>
        </div>
      )}
    </div>
  );
}
