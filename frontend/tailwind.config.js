/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'max1': { max: '1080px' },
        xs: '400px',  
        'xsm':{min: '550px'},
        'max2': { max: '480px' },
        'nmd': { min:'932px'}, // Custom media query for max-width 1080px
        'range1': { min: '500px', max: '640px'  }, // Custom media query for max-width 1280px
      },
      fontFamily: {
      
        poppins: ['Poppins', 'Sans'],
        hindi:['Hindi','Poppins'],
        jakarta:['Jakarta','Sans'], 
        istok:['Istok','Sans'],
        istokn:['IstokN','Sans'],
        montserrat: ['Montserrat', 'Sans'], 
        instSans: ['instrumentSans', 'Sans'],
        instSansN: ['instrumentSansnorm', 'Sans'],  
        instSansB: ['instrumentSansBold', 'Sans'], 
        inter: ['Inter', 'Sans'],
        interi: ['InterI', 'Sans'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
