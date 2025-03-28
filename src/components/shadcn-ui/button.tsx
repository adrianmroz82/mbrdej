import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium  transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      effect: {
        expandIcon: "group gap-0 relative",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface IconProps {
  icon: React.ElementType;
  iconPlacement: "left" | "right";
}

interface IconRefProps {
  icon?: never;
  iconPlacement?: undefined;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

type ButtonIconProps = IconProps | IconRefProps;

const Button = forwardRef<HTMLButtonElement, ButtonProps & ButtonIconProps>(
  ({ className, variant, effect, size, icon: Icon, iconPlacement, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, effect, size, className }))} ref={ref} {...props}>
        {Icon &&
          iconPlacement === "left" &&
          (effect === "expandIcon" ? (
            <div className="w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-100 group-hover:pr-2 group-hover:opacity-100">
              <Icon />
            </div>
          ) : (
            <Icon />
          ))}
        <Slottable>{props.children}</Slottable>
        {Icon &&
          iconPlacement === "right" &&
          (effect === "expandIcon" ? (
            <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
              <Icon />
            </div>
          ) : (
            <Icon />
          ))}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
