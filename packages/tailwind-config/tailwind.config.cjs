/** @type {import('tailwindcss').Config} */
module.exports ={
    content: [
      "./src/views/**/*.{js,jsx,ts,tsx,vue}",
      "./src/components/**/*.{js,jsx,ts,tsx,vue}",
      "./src/**/*.{js,jsx,ts,tsx,vue}",
      "../../packages/ui-lib/**/*.{js,ts,jsx,tsx,vue}",
    ],
    theme: {
      extend: {
        colors:{
            "board":{
                DEFAULT:'#323946',
                dark:'#1f242d'
            }
        },
        fontFamily:{
          "poppins":["Poppins", "sans-serif"]
        }
      },
    },
    plugins: [],
};