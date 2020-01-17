import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Toggle from 'react-toggle'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

import '../components/css/form.css'

import male from '../images/male.svg'
import female from '../images/female.svg'

const BlessingForm = () => {
  const today = new Date()
  return (
    <Layout>
      <SEO title="Form" />
      <Formik
        initialValues={{
          firstName: '', middleName: '', lastName: '',
          mother: '', father: '', gender: false,
          patriarch: '', stake: '', blessing: '', date:today
        }}
        onSubmit={(values, actions) => {
          console.log('submitting')
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
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
          <Form>

            <Field type="text" name="firstName" placeholder="First Name" />
            <ErrorMessage name="firstName" component="div" className="errorBox" />

            <Field type="text" name="middleName" placeholder="Middle Name" />

            <Field type="text" name="lastName" placeholder="Last Name" />
            <ErrorMessage name="lastName" component="div" className="errorBox" />

            <label htmlFor="gender">Gender</label>
            <Field name="gender">
              {({ field: {value, onChange} }) => (
                <Toggle
                  id="gender"
                  checked={value}
                  onChange={onChange}
                  icons={{
                    checked: <img alt="" src={male} />,
                    unchecked: <img alt="" src={female} />
                  }}
                />
              )}
            </Field>

            <Field type="text" name="mother" placeholder="Mother's Full Name" />

            <Field type="text" name="father" placeholder="Father's Full Name" />

            <Field type="text" name="patriarch" placeholder="Patriarch's Full Name" />
            <ErrorMessage name="patriarch" component="div" className="errorBox" />

            <Field type="text" name="stake" placeholder="Stake or District" />
            <ErrorMessage name="stake" component="div" className="errorBox" />

            <Field name="date">
              {({field: {value}}) => (
                <Calendar
                  // locale=""
                  value={value}
                  onChange={date => setFieldValue('date', date)} // default Formik onChange doesn't handle date object, have to set it manually
                  view="decade" // default to the decade view as it can be confusing to reach the decade screen again
                />
              )}
            </Field>

            <Field as="textarea" name="blessing" placeholder="Patriarchal Blessing" />
            <ErrorMessage name="blessing" component="div" className="errorBox" />

            <button className="action-button" type="submit" disabled={isSubmitting}>Generate Document</button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

// Male icon is Male by Gregor Cresnar from the Noun Project
// Female icon is Female by Adrien Coquet from the Noun Project

export default BlessingForm