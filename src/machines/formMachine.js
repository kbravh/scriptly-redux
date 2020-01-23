import {Machine} from 'xstate'

export const formMachine = Machine({
  "initial": "form",
  "states": {
    "form": {
      "on": {
        "SUBMIT": "gen_docx"
      }
    },
    "gen_docx": {
      "on": {
        "ERROR_DOCX": "error_docx",
        "SUCCESS_DOCX": "gen_pdf"
      }
    },
    "error_docx": {
      "on": {
        "RETRY": "gen_docx"
      }
    },
    "gen_pdf": {
      "on": {
        "ERROR_PDF": "error_pdf",
        "SUCCESS_PDF": "success"
      }
    },
    "error_pdf": {
      "RETRY_PDF": "gen_pdf"
    },
    "success": {}
  }
})