import {
  Machine,
  assign
} from 'xstate'
import axios from 'axios'
import {preparePacket} from '../util'

// Convert functions
const generateDocx = (context, _) => {
  console.log(`preparing packet`)
  const packet = preparePacket(context.form)
  console.log(`generating docx`)
  console.table(packet)
  return axios.post(
    `https://api.laborforzion.com/scriptly/docx`,
    packet,
    { headers: { 'Content-Type': 'application/json', 'x-api-key': 'gKd0oWv9oa5sut9xpYQfJ5MwKk7ZHYsM9Iqn5HIB' } }
  ).then(response => JSON.parse(response.data.body))
}

const generatePDF = (context, _) => {
  console.log(`generating pdf`)
  return axios.post(
    `https://api.laborforzion.com/scriptly/pdf`,
    {srcKey: context.docx_key},
    { headers: { 'Content-Type': 'application/json', 'x-api-key': 'gKd0oWv9oa5sut9xpYQfJ5MwKk7ZHYsM9Iqn5HIB' } }
  ).then(response => JSON.parse(response.data.body))
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
            docx_key: (_, event) => event.data.Key,
            docx_link: (_, event) => event.data.Location
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
            pdf_link: (_, event) => event.data.Location
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