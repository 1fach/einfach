import { twMerge, type ClassNameValue } from "tailwind-merge";
import { mergeProps } from "vue";

export const customMergeProps = (
  globalPTProps: Record<string, any> = {},
  selfPTProps: Record<string, any> = {},
  datasets: any
) => {
  /*
   * - mergeProps from Vue package
   * - twMerge from tailwind-merge package
   */
  const merged = mergeProps(globalPTProps, selfPTProps, datasets);
  merged.class = twMerge(merged.class as ClassNameValue);
  return merged;
};
