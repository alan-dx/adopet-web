import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    gray: {
      "50": "#FAFAFA"
    },
    green: {
      "300": "#14D361"
    },
    purple: {
      "200": "#9871F5",
      "500": "#8257E5",
    }
  },
  textStyles: {
    h1: {
      fontsize: ["2.5rem", "8xl"],
      fontWeight: "bold",
      color: "gray.50",
    },
    h2: {
      fontSize: ["xl", "6xl"],
      fontWeight: "bold",
      color: "#FFFF",
    },
    p: {
      fontSize: ["lg", "4xl"],
      fontWeight: "normal",
      color: "gray.50",
    }
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto'
  }
})