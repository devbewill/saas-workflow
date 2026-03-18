import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InfoGrid } from "@/components/composed/info-grid";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PenTool, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * EditableInfoGrid — Renders a list of label:value pairs in a responsive grid with editable inputs.
 * Used for OCS data where fields need to be editable from the interface.
 * Features an edit toggle button that switches between read-only and editable modes.
 */
export function EditableInfoGrid({ items, columns = 3 }) {
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState(() =>
    items.reduce((acc, item, index) => {
      acc[index] = item.value;
      return acc;
    }, {}),
  );

  const handleValueChange = (index, newValue) => {
    setValues((prev) => ({
      ...prev,
      [index]: newValue,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save values to your backend/state management
    console.log("Saving values:", values);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset values to original
    setValues(() =>
      items.reduce((acc, item, index) => {
        acc[index] = item.value;
        return acc;
      }, {}),
    );
  };

  const gridClass =
    columns === 3
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      : columns === 4
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        : "grid grid-cols-1 md:grid-cols-2 gap-4";

  // Create items with current values for InfoGrid
  const displayItems = items.map((item, index) => ({
    ...item,
    value: values[index],
  }));

  return (
    <div>
      {isEditing ? (
        <div className={gridClass}>
          {items.map((item, i) => (
            <div key={i} className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {item.label}
              </p>
              <Input
                value={values[i]}
                onChange={(e) => handleValueChange(i, e.target.value)}
                className="text-sm"
              />
            </div>
          ))}
        </div>
      ) : (
        <InfoGrid items={displayItems} columns={columns} />
      )}
    </div>
  );
}

/**
 * EditableSectionPanel - A wrapper around SectionPanel that includes edit toggle functionality.
 * Use this when you want to make a section editable with an edit button in header.
 */
export function EditableSectionPanel({
  title,
  description,
  icon: Icon,
  items,
  columns = 3,
  children,
  className,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState(() =>
    items.reduce((acc, item, index) => {
      acc[index] = item.value;
      return acc;
    }, {}),
  );

  const handleValueChange = (index, newValue) => {
    setValues((prev) => ({
      ...prev,
      [index]: newValue,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save values to your backend/state management
    console.log("Saving values:", values);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset values to original
    setValues(() =>
      items.reduce((acc, item, index) => {
        acc[index] = item.value;
        return acc;
      }, {}),
    );
  };

  const gridClass =
    columns === 3
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      : columns === 4
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        : "grid grid-cols-1 md:grid-cols-2 gap-4";

  // Create items with current values for InfoGrid
  const displayItems = items.map((item, index) => ({
    ...item,
    value: values[index],
  }));

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            {Icon && <Icon size={16} />}
            {title}
          </CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancel}
                className="gap-1"
              >
                <X size={14} />
                Annulla
              </Button>
              <Button size="sm" onClick={handleSave} className="gap-1">
                <Check size={14} />
                Salva
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="gap-1"
            >
              <PenTool size={14} />
              Modifica
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className={gridClass}>
            {items.map((item, i) => (
              <div key={i} className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {item.label}
                </p>
                <Input
                  value={values[i]}
                  onChange={(e) => handleValueChange(i, e.target.value)}
                  className="text-sm"
                />
              </div>
            ))}
          </div>
        ) : (
          <InfoGrid items={displayItems} columns={columns} />
        )}
      </CardContent>
    </Card>
  );
}
