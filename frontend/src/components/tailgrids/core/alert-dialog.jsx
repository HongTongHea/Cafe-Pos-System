"use client";

import {
  createContext,
  useContext,
  useState,
  cloneElement,
  isValidElement,
  useEffect,
} from "react";

import { createPortal } from "react-dom";
import { cn } from "../../../utils/cn";


// --------------------------------------------------
// Context
// --------------------------------------------------

const AlertDialogContext = createContext(null);


// --------------------------------------------------
// AlertDialog
// --------------------------------------------------

export function AlertDialog({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setOpen = (value) => {
    if (!isControlled) {
      setInternalOpen(value);
    }

    onOpenChange?.(value);
  };

  return (
    <AlertDialogContext.Provider
      value={{
        open: isOpen,
        setOpen,
      }}
    >
      {children}
    </AlertDialogContext.Provider>
  );
}


// --------------------------------------------------
// AlertDialogTrigger
// --------------------------------------------------

export function AlertDialogTrigger({
  children,
  asChild = false,
  ...props
}) {
  const { setOpen } = useContext(AlertDialogContext);

  const handleClick = (event) => {
    props.onClick?.(event);

    if (!event.defaultPrevented) {
      setOpen(true);
    }
  };

  // Render the child directly
  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...props,
      onClick: handleClick,
    });
  }

  // Default button
  return (
    <button
      type="button"
      {...props}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}


// --------------------------------------------------
// AlertDialogContent
// --------------------------------------------------

export function AlertDialogContent({
  className,
  children,
  ...props
}) {
  const { open, setOpen } = useContext(AlertDialogContext);

  const [mounted, setMounted] = useState(false);

  // Prevent document.body access during SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render when closed
  if (!open || !mounted) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center p-4"
      role="presentation"
    >
      {/* ---------------------------------------- */}
      {/* Backdrop */}
      {/* ---------------------------------------- */}

      <div
        className="absolute inset-0 bg-black/30"
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />

      {/* ---------------------------------------- */}
      {/* Dialog */}
      {/* ---------------------------------------- */}

      <div
        role="alertdialog"
        aria-modal="true"
        className={cn(
          "z-[999999] w-full max-w-md rounded-xl bg-white p-6 shadow-2xl",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}


// --------------------------------------------------
// AlertDialogHeader
// --------------------------------------------------

export function AlertDialogHeader({
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 text-left",
        className
      )}
      {...props}
    />
  );
}


// --------------------------------------------------
// AlertDialogTitle
// --------------------------------------------------

export function AlertDialogTitle({
  className,
  ...props
}) {
  return (
    <h2
      className={cn(
        "text-xl font-semibold text-gray-900",
        className
      )}
      {...props}
    />
  );
}


// --------------------------------------------------
// AlertDialogDescription
// --------------------------------------------------

export function AlertDialogDescription({
  className,
  ...props
}) {
  return (
    <p
      className={cn(
        "mt-1 text-sm leading-6 text-gray-500",
        className
      )}
      {...props}
    />
  );
}


// --------------------------------------------------
// AlertDialogFooter
// --------------------------------------------------

export function AlertDialogFooter({
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        "mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}


// --------------------------------------------------
// AlertDialogCancel
// --------------------------------------------------

export function AlertDialogCancel({
  className,
  children,
  onClick,
  ...props
}) {
  const { setOpen } = useContext(AlertDialogContext);

  const handleClick = (event) => {
    onClick?.(event);

    if (!event.defaultPrevented) {
      setOpen(false);
    }
  };

  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-lg",
        "border border-gray-300 bg-white px-4",
        "text-sm font-medium text-gray-700",
        "transition hover:bg-gray-50",
        "focus:outline-none focus:ring-2 focus:ring-gray-300",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}


// --------------------------------------------------
// AlertDialogAction
// --------------------------------------------------

export function AlertDialogAction({
  className,
  children,
  onClick,
  ...props
}) {
  const { setOpen } = useContext(AlertDialogContext);

  const handleClick = (event) => {
    onClick?.(event);

    if (!event.defaultPrevented) {
      setOpen(false);
    }
  };

  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-lg",
        "bg-red-600 px-4",
        "text-sm font-medium text-white",
        "transition hover:bg-red-700",
        "focus:outline-none focus:ring-2 focus:ring-red-500",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}