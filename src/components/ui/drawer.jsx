import React from "react";

const Drawer = ({ isOpen, children }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } w-1/2 bg-background shadow-lg border-r border-border`}
      role="dialog"
    >
      <div className="px-4 overflow-y-auto">{children}</div>
    </div>
  );
};

export const DrawerTrigger = ({ onClick, children }) => (
  <button onClick={onClick} className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
    {children}
  </button>
);

export const DrawerHeader = ({ children }) => (
  <div className="px-1 text-foreground">{children}</div>
);

export const DrawerFooter = ({ children }) => (
  <div className="p-4 flex justify-end border-t border-border bg-muted text-muted-foreground">
    {children}
  </div>
);

export const DrawerTitle = ({ children }) => (
  <h2 className="text-lg font-semibold text-foreground">{children}</h2>
);

export const DrawerDescription = ({ children }) => (
  <p className="text-sm text-muted-foreground">{children}</p>
);

export default Drawer;
