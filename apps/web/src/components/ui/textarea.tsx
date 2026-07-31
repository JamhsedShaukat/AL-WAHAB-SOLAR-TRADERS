import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-1.5 block text-[13px] font-medium text-slate-300"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            "w-full rounded-xl bg-white/4 border border-white/10 px-4 py-3 text-[15px] text-white placeholder:text-slate-500 transition-all duration-200 outline-none min-h-30 resize-y",
            "focus:border-gold/50 focus:ring-2 focus:ring-gold/20",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-red-500/50 ring-2 ring-red-500/15",
            className,
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={
            error && textareaId ? `${textareaId}-error` : undefined
          }
          {...props}
        />
        {error && (
          <p
            id={textareaId ? `${textareaId}-error` : undefined}
            className="mt-1.5 text-[13px] text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";
