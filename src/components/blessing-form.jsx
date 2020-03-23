import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Toggle from 'react-toggle'
import '../components/css/toggle.css'
import Calendar from 'react-calendar'
import { motion } from 'framer-motion'

import 'react-calendar/dist/Calendar.css';

import '../components/css/form.css'

import male from '../images/male.svg'
import female from '../images/female.svg'

// TODO - check the state machine to see if there is already form data (for making corrections)
const BlessingForm = ({ send }) => {
  const today = new Date() // default value for the calendar
  // set some sensible defaults
  const [colors, setColors] = useState({ brandColor: '#102542', accentColor: '#F87060' })
  useEffect(() => {
    setColors({
      brandColor: getComputedStyle && getComputedStyle(document.documentElement).getPropertyValue('--brand-color'),
      accentColor: getComputedStyle && getComputedStyle(document.documentElement).getPropertyValue('--accent-color')
    })
  }, []) // pass empty array; we only need this to run once

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Enter your patriarchal blessing information below.</h2>
      <div className="form-div">
        <Formik
          initialValues={{
            firstName: '', middleName: '', lastName: '',
            mother: '', father: '', gender: false,
            patriarch: '', stake: '', blessing: '', date: today
          }}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false)
            send('SUBMIT', { form: values }) // bump state machine and pass in form values
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required('This field is required'),
            lastName: Yup.string().required('This field is required'),
            patriarch: Yup.string().required('This field is required'),
            stake: Yup.string().required('This field is required'),
            blessing: Yup.string().required('This field is required')
          })}
        >
          {({ isSubmitting, setFieldValue, isValid, submitCount }) => (
            <Form className="blessing-form shadow">

              <h5>First Name</h5>
              <Field type="text" name="firstName" placeholder="First Name" />
              <ErrorMessage name="firstName" component="div" className="error-box" />

              <h5>Middle Name <span className="optional-tag">(optional)</span></h5>
              <Field type="text" name="middleName" placeholder="Middle Name" />

              <h5>Last Name</h5>
              <Field type="text" name="lastName" placeholder="Last Name" />
              <ErrorMessage name="lastName" component="div" className="error-box" />

              <h5>Gender</h5>
              <div className="gender-toggle">
                <Field name="gender">
                  {({ field: { value, onChange } }) => (
                    <>
                      <Toggle
                        id="gender"
                        checked={value}
                        onChange={onChange}
                        icons={{
                          checked: <img alt="" src={male} />,
                          unchecked: <img alt="" src={female} />
                        }}
                      />
                      <h4
                        className="gender-label"
                        style={{ color: value ? colors.brandColor : colors.accentColor }}
                      >
                        {value ? 'Male' : 'Female'}
                      </h4>
                    </>
                  )}
                </Field>
              </div>

              <h5>Mother's Full Name <span className="optional-tag">(optional)</span></h5>
              <Field type="text" name="mother" placeholder="Mother's Full Name" />

              <h5>Father's Full Name <span className="optional-tag">(optional)</span></h5>
              <Field type="text" name="father" placeholder="Father's Full Name" />

              <h5>Patriarch's Full Name</h5>
              <Field type="text" name="patriarch" placeholder="Patriarch's Full Name" />
              <ErrorMessage name="patriarch" component="div" className="error-box" />

              <h5>Stake or District</h5>
              <Field type="text" name="stake" placeholder="Aurora Colorado" />
              <ErrorMessage name="stake" component="div" className="error-box" />

              <h5>Date of the Blessing</h5>
              <Field name="date">
                {({ field: { value } }) => (
                  <Calendar
                    // locale=""
                    value={value}
                    onChange={date => setFieldValue('date', date)} // default Formik onChange doesn't handle date object, have to set it manually
                    view="decade" // default to the decade view as it can be confusing to reach the decade screen again
                  />
                )}
              </Field>

              <h5>Blessing Text</h5>
              <Field as="textarea" name="blessing" placeholder="Patriarchal Blessing" style={{ resize: 'vertical' }} />
              <ErrorMessage name="blessing" component="div" className="error-box" />

              {(!isValid && submitCount > 0) &&
                <motion.div className="submit-form-error"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-alert-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  Uh oh! You seem to be missing some parts of the form.
              </motion.div>}
              <motion.button whileTap={{ scale: 0.9 }} className="action-button" type="submit" disabled={isSubmitting}>Generate Document</motion.button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

// Male icon is Male by Gregor Cresnar from the Noun Project
// Female icon is Female by Adrien Coquet from the Noun Project

export default BlessingForm