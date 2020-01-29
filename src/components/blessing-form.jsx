import React, {useState, useEffect} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Toggle from 'react-toggle'
import '../components/css/toggle.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

import '../components/css/form.css'

import male from '../images/male.svg'
import female from '../images/female.svg'

// TODO - check the state machine to see if there is already form data (for making corrections)
const BlessingForm = ({send}) => {
  const today = new Date() // default value for the calendar
  // set some sensible defaults
  const [colors, setColors] = useState({brandColor: '#102542', accentColor: '#F87060'})
  useEffect(() => {
    setColors({
      brandColor: getComputedStyle && getComputedStyle(document.documentElement).getPropertyValue('--brand-color'),
      accentColor: getComputedStyle && getComputedStyle(document.documentElement).getPropertyValue('--accent-color')
    })
  }, []) // pass empty array; we only need this to run once

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Enter your patriarchal blessing information below.</h2>
      <Formik
        initialValues={{
          firstName: '', middleName: '', lastName: '',
          mother: '', father: '', gender: false,
          patriarch: '', stake: '', blessing: '', date: today
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false)
          send('SUBMIT', {form: values}) // bump state machine and pass in form values
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required('This field is required'),
          lastName: Yup.string().required('This field is required'),
          patriarch: Yup.string().required('This field is required'),
          stake: Yup.string().required('This field is required'),
          blessing: Yup.string().required('This field is required')
        })}
      >
        {({ isSubmitting, setFieldValue }) => (
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
            <Field type="text" name="stake" placeholder="Stake or District" />
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

            <button className="action-button" type="submit" disabled={isSubmitting}>Generate Document</button>
          </Form>
        )}
      </Formik>
    </>
  )
}

// Male icon is Male by Gregor Cresnar from the Noun Project
// Female icon is Female by Adrien Coquet from the Noun Project

export default BlessingForm