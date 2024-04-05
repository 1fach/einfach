// @ts-nocheck
export default {
  root: ({ context }) => ({
    class: [
      // Font
      "font-medium",
      "text-xs leading-6 font-sans",

      // Alignment
      "flex items-center justify-center",
      "text-center",

      // Position
      "absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 origin-top-right",

      // Size
      "m-0",
      {
        "p-0": context.nogutter || context.dot,
        "p-1": !context.nogutter && !context.dot,
        "min-w-[0.5rem] h-2": context.dot,
        "min-w-[1rem] h-4": !context.dot,
      },

      // Shape
      {
        "rounded-full": context.nogutter || context.dot,
        "rounded-[10px]": !context.nogutter && !context.dot,
      },

      // Color
      "text-white dark:text-surface-900",
      "ring-1 ring-white dark:ring-surface-900",
      {
        "bg-primary-500 dark:bg-primary-400":
          !context.info &&
          !context.success &&
          !context.warning &&
          !context.danger &&
          !context.help &&
          !context.secondary,
        "bg-surface-500 dark:bg-surface-400": context.secondary,
        "bg-green-500 dark:bg-green-400": context.success,
        "bg-blue-500 dark:bg-blue-400": context.info,
        "bg-orange-500 dark:bg-orange-400": context.warning,
        "bg-purple-500 dark:bg-purple-400": context.help,
        "bg-red-500 dark:bg-red-400": context.danger,
      },
    ],
  }),
};
