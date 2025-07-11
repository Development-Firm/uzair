import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "relative px-6 py-3 font-semibold text-white rounded-full bg-gradient-to-b from-[#1AC9F6] to-[#0ea5e9] shadow-inner transition-shadow duration-[800ms] delay-[500ms] hover:shadow-[0_0_25px_#1AC9F6] active:brightness-90",
        destructive:
          "relative px-6 py-3 font-semibold text-black rounded-full bg-white shadow-inner transition-shadow duration-[800ms] delay-[500ms] hover:shadow-[0_0_25px_#FFFFFF] active:brightness-90",
        outline:
          "rounded-full border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "rounded-full bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        border: "rounded-full bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 border border-primary",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
