import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    gray: {
      "50": "#FAFAFA"
    }
  },
  textStyle: {
    h1: {
      fontsize: ["2.5rem", "8xl"],
      fontWeight: "bold",
      color: "gray.50",
    },
    h2: {
      fontsize: ["2xl", "6xl"],
      fontWeight: "bold",
      color: "gray.50",
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