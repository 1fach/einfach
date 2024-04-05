import type { ContextMenuPassThroughOptions } from "primevue/contextmenu";

// @ts-nocheck
export default {
  root: {
    class: [
      "min-w-[12rem]",
      "rounded-md",
      "shadow-md",
      "py-2",
      "bg-surface-0 dark:bg-surface-700",
      "text-surface-700 dark:text-white/80",
      "dark:border dark:border-surface-700",
    ],
  },
  menu: {
    class: ["list-none", "m-0", "p-0", "outline-none"],
  },
  menuitem: {
    class: "relative",
  },
  content: ({ context }) => ({
    class: [
      //Shape
      "rounded-none",
      // Colors
      "text-surface-700 dark:text-white/80",
      {
        "text-surface-500 dark:text-white/70":
          !context.focused && !context.active,
        "text-surface-500 dark:text-white/70 bg-surface-200 dark:bg-surface-600/90":
          context.focused && !context.active,
        "text-primary-700 dark:text-surface-0/80 bg-primary-50 dark:bg-primary-400/30":
          context.active,
      },
      // Transitions
      "transition-shadow",
      "duration-200",
      // States
      {
        "hover:bg-surface-100 dark:hover:bg-surface-600/80": !context.active,
        "hover:bg-primary-400/30 dark:hover:bg-primary-300/30 text-primary-700 dark:text-surface-0/80":
          context.active,
      },
      // Disabled
      { "opacity-60 pointer-events-none cursor-default": context.disabled },
    ],
  }),
  action: {
    class: [
      "relative",
      "flex",
      "items-center",
      "py-3",
      "px-5",
      "text-surface-700 dark:text-white/80",
      "no-underline",
      "overflow-hidden",
      "cursor-pointer",
      "select-none",
    ],
  },
  icon: {
    class: ["mr-2", "text-surface-600 dark:text-white/70"],
  },
  label: {
    class: ["leading-none"],
  },
  submenu: ({ state }) => ({
    class: [
      // Size
      "w-full sm:w-48",
      // Spacing
      "py-1",
      "m-0",
      "list-none",
      // Shape
      "shadow-md",
      "rounded-md",
      "dark:border dark:border-surface-700",
      // Position
      "static sm:absolute",
      "z-10",
      { "sm:absolute sm:left-full sm:top-0": state.focusedItemInfo.level > 1 },
      // Color
      "bg-surface-0 dark:bg-surface-700",
    ],
  }),
  submenuIcon: {
    class: ["ml-auto"],
  },
  separator: {
    class: "border-t border-surface-200 dark:border-surface-600 my-1",
  },
  transition: {
    enterFromClass: "opacity-0",
    enterActiveClass: "transition-opacity duration-250",
  },
} satisfies ContextMenuPassThroughOptions;
