import { BrandVariants, Theme, createLightTheme } from "@fluentui/react-components";

const myNewTheme: BrandVariants = { 
      10: "#040208",
      20: "#1B1131",
      30: "#29185A",
      40: "#351D7E",
      50: "#3F21A4",
      60: "#4A26CB",
      70: "#5C35D7",
      80: "#6F47DB",
      90: "#7F57DF",
      100: "#8E68E3",
      110: "#9D79E7",
      120: "#AB8AEA",
      130: "#B89BEE",
      140: "#C5ACF1",
      150: "#D2BEF5",
      160: "#DFCFF8"
    };
    
export const lightTheme: Theme = {
       ...createLightTheme(myNewTheme), 
};
    