"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Sheet = DialogPrimitive.Root
const SheetTrigger = DialogPrimitive.Trigger
const SheetClose = DialogPrimitive.Close
const SheetPortal = DialogPrimitive.Portal

const SheetOverlay = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Overlay>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>>(({ className, ...props }, ref) => (
 <DialogPrimitive.Overlay
   className={cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm", className)}
   {...props}
   ref={ref}
 />
))
SheetOverlay.displayName = "SheetOverlay"

const SheetContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>>(({ className, children, ...props }, ref) => (
 <SheetPortal>
   <SheetOverlay />
   <DialogPrimitive.Content
     ref={ref}
     className={cn("fixed inset-y-0 left-0 z-50 h-full w-72 gap-4 border-r bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500", className)}
     {...props}
   >
     {children}
     <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
       <X className="h-4 w-4" />
       <span className="sr-only">Close</span>
     </DialogPrimitive.Close>
   </DialogPrimitive.Content>
 </SheetPortal>
))
SheetContent.displayName = "SheetContent"

export { Sheet, SheetTrigger, SheetContent, SheetClose }