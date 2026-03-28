// toast.tsx - compatibility shim; shadcn v2+ uses sonner instead of the old toast primitive.
// Re-export the Toaster and the toast function so existing imports keep working.
export { Toaster } from "@/components/ui/sonner"
export { toast } from "sonner"
