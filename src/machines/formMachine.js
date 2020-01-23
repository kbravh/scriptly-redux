import {
  Machine,
  assign
} from 'xstate'

// Convert functions
const generateDocx = (context, event) => {
  console.log(`generating docx`)
  return new Promise((resolve, reject) => {
    setTimeout(() => {resolve(`https://google.com`)}, 1000)
  })
}

const generatePDF = (context, event) => {
  console.log(`generating pdf`)
  return new Promise((resolve, reject) => {
    setTimeout(() => {resolve(`https://google.com`)}, 2000)
  })
}

export const formMachine = Machine({
  "initial": "form",
  context: {
    form: undefined,
    docx_link: undefined,
    pdf_link: undefined
  },
  "states": {
    "form": {
      "on": {
        "SUBMIT": {
          target: "gen_docx",
          actions: assign({
            form: (_, event) => event.form
          })
        }
      }
    },
    "gen_docx": {
      invoke: {
        id: "generateDocx",
        src: generateDocx,
        onDone: {
          target: "gen_pdf",
          actions: assign({
            docx_link: (_, event) => event.data
          })
        },
        onError: "error_docx"
      },
    },
    "gen_pdf": {
      invoke: {
        id: "generatePDF",
        src: generatePDF,
        onDone: {
          target: "success",
          actions: assign({
            pdf_link: (_, event) => event.data
          })
        },
        onError: "error_pdf"
      },
      "on": {
        "ERROR_PDF": "error_pdf",
        "SUCCESS_PDF": "success"
      }
    },
    "error_docx": {
      "on": {
        "RETRY": "gen_docx"
      }
    },
    "error_pdf": {
      "RETRY_PDF": "gen_pdf"
    },
    "success": {}
  }
})