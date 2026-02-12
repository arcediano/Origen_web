/**
 * @file index.ts
 * @description Export centralizado de todos los componentes UI de Origen
 * @version 4.0.2 - Corregidos conflictos de tipos en Select
 */

// ============================================================================
// COMPONENTES BASE (Formularios)
// ============================================================================

export { Button, buttonVariants, ButtonGroup, SplitButton } from "./button";
export { Input, InputGroup } from "./input";
export { Textarea } from "./textarea";
export { Checkbox, CheckboxWithLabel, CheckboxGroup } from "./checkbox";
export { Toggle, ToggleGroup } from "./toggle";
export { Slider } from "./slider";

// ============================================================================
// COMPONENTES DE SELECCIÓN - CORREGIDO
// ============================================================================

export { Select } from "./select";
export type { SelectItem, SelectGroup } from "./select";

// ============================================================================
// COMPONENTES DE VISUALIZACIÓN
// ============================================================================

export { Progress, CircularProgress, SteppedProgress } from "./progress";
export { 
  Badge, 
  badgeVariants, 
  ProductBadge, 
  StatusBadge, 
  ShippingBadge 
} from "./badge";
export { 
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  FeatureCard,
  StatCard,
  ProductCard
} from "./card";
export { 
  Alert, 
  AlertTitle, 
  AlertDescription, 
  AlertWithIcon,
  AlertStack
} from "./alert";

// ============================================================================
// COMPONENTES DE NAVEGACIÓN
// ============================================================================

export { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent, 
  TabsWithIcon,
  useTabs 
} from "./tabs";

// ============================================================================
// COMPONENTES DE FORMULARIO AVANZADOS
// ============================================================================

export { Label, labelVariants } from "./label";

// ============================================================================
// UTILIDADES
// ============================================================================

export { cn } from "@/lib/utils";