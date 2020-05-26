import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Toggle from 'react-toggle'
import '../components/css/toggle.css'
import Calendar from 'react-calendar'
import { motion } from 'framer-motion'
import { useIntl } from 'gatsby-plugin-intl'

import 'react-calendar/dist/Calendar.css';

import '../components/css/form.css'

import male from '../images/male.svg'
import female from '../images/female.svg'

// TODO - check the state machine to see if there is already form data (for making corrections)
const BlessingForm = ({ send }) => {
  const intl = useIntl()
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
      <h2 style={{ textAlign: 'center' }}>{intl.formatMessage({ id: "form.enter-info" })}</h2>
      <div className="form-div">
        <Formik
          initialValues={{
            firstName: '', middleName: '', lastName: '',
            mother: '', father: '', gender: false,
            patriarch: '', stake: '', blessing: '', date: today
          }}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false)
            send('SUBMIT', { // bump state machine and pass in form values
              form: { ...values, locale: intl.locale } //add locale into the form data
            })
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required(() => intl.formatMessage({ id: "form.required" })),
            lastName: Yup.string().required(() => intl.formatMessage({ id: "form.required" })),
            patriarch: Yup.string().required(() => intl.formatMessage({ id: "form.required" })),
            stake: Yup.string().required(() => intl.formatMessage({ id: "form.required" })),
            blessing: Yup.string().required(() => intl.formatMessage({ id: "form.required" }))
          })}
        >
          {({ isSubmitting, setFieldValue, isValid, submitCount }) => (
            <Form className="blessing-form shadow">

              <h4 className="field-title">{intl.formatMessage({ id: "form.first" })}</h4>
              <Field type="text" name="firstName" placeholder={intl.formatMessage({ id: "form.first" })} />
              <ErrorMessage name="firstName" component="div" className="error-box" />

              <h4 className="field-title">{intl.formatMessage({ id: "form.middle" })} <span className="optional-tag">({intl.formatMessage({ id: "form.optional" })})</span></h4>
              <Field type="text" name="middleName" placeholder={intl.formatMessage({ id: "form.middle" })} />

              <h4 className="field-title">{intl.formatMessage({ id: "form.last" })}</h4>
              <Field type="text" name="lastName" placeholder={intl.formatMessage({ id: "form.last" })} />
              <ErrorMessage name="lastName" component="div" className="error-box" />

              <h4 className="field-title">{intl.formatMessage({ id: "form.gender" })}</h4>
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
                        // style={{ color: value ? colors.brandColor : colors.accentColor }}
                        style={{ color: colors.brandColor }}
                      >
                        {value ? intl.formatMessage({ id: "form.male" }) : intl.formatMessage({ id: "form.female" })}
                      </h4>
                    </>
                  )}
                </Field>
              </div>

              <h4 className="field-title">{intl.formatMessage({ id: "form.mother" })} <span className="optional-tag">({intl.formatMessage({ id: "form.optional" })})</span></h4>
              <Field type="text" name="mother" placeholder={intl.formatMessage({ id: "form.mother" })} />

              <h4 className="field-title">{intl.formatMessage({ id: "form.father" })} <span className="optional-tag">({intl.formatMessage({ id: "form.optional" })})</span></h4>
              <Field type="text" name="father" placeholder={intl.formatMessage({ id: "form.father" })} />

              <h4 className="field-title">{intl.formatMessage({ id: "form.patriarch" })}</h4>
              <Field type="text" name="patriarch" placeholder={intl.formatMessage({ id: "form.patriarch" })} />
              <ErrorMessage name="patriarch" component="div" className="error-box" />

              <h4 className="field-title">{intl.formatMessage({ id: "form.stake" })}</h4>
              <Field type="text" name="stake" placeholder="Aurora Colorado" />
              <ErrorMessage name="stake" component="div" className="error-box" />

              <h4 className="field-title">{intl.formatMessage({ id: "form.date" })}</h4>
              <Field name="date">
                {({ field: { value } }) => (
                  <Calendar
                    locale={intl.locale}
                    value={value}
                    onChange={date => setFieldValue('date', date)} // default Formik onChange doesn't handle date object, have to set it manually
                    view="decade" // default to the decade view as it can be confusing to reach the decade screen again
                  />
                )}
              </Field>

              <h4 className="field-title">{intl.formatMessage({ id: "form.blessing" })}</h4>
              <Field as="textarea" name="blessing" placeholder={intl.formatMessage({ id: "form.blessing-placeholder" })} style={{ resize: 'vertical' }} />
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
                  {intl.formatMessage({ id: "form.generic-error" })}
                </motion.div>}
              <motion.button whileTap={{ scale: 0.9 }} className="action-button" type="submit" disabled={isSubmitting}>{intl.formatMessage({ id: "form.generate" })}</motion.button>
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