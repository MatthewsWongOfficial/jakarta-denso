import { cn } from "@/lib/utils";
import { AlertCircle, Check, Info, X } from "lucide-react";
import React from "react";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive" | "success" | "warning" | "info";
  icon?: React.ReactNode;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
}

const variantStyles = {
  default: "bg-gray-100 text-gray-800 border-gray-200",
  destructive: "bg-red-50 text-red-800 border-red-200",
  success: "bg-green-50 text-green-800 border-green-200",
  warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
  info: "bg-blue-50 text-blue-800 border-blue-200",
};

const variantIcons = {
  default: null,
  destructive: <AlertCircle className="h-5 w-5" />,
  success: <Check className="h-5 w-5" />,
  warning: <AlertCircle className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />,
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", icon, onClose, title, children, ...props }, ref) => {
    const Icon = icon || variantIcons[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative w-full rounded-lg border p-4 shadow-sm",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <div className="flex gap-3">
          {Icon && (
            <div className="flex-shrink-0">
              {Icon}
            </div>
          )}
          <div className="flex-1">
            {title && (
              <h5 className="mb-1 font-medium leading-none tracking-tight">
                {title}
              </h5>
            )}
            <div className="text-sm">
              {children}
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="absolute right-2 top-2 rounded-lg p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";

export const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));

AlertTitle.displayName = "AlertTitle";

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));

AlertDescription.displayName = "AlertDescription";

export default Alert;