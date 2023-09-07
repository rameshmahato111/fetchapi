import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from "yup"
import { signup } from '../auth'
const RegistrationComponent = () => {

    const [values, setValues] = useState({
        error: "",
        success: false
    })

    //object destructure
    const { error, success } = values
    // show error message
    const showError = () => (
        error && <div className='text-red-500'>{error}</div>
    )

    const showSuccess = () => (
        success && <div className='text-green-500'>new account created</div>
    )


    return (
        <>
            <div className='w-full h-screen bg-gray-200 py-10'>

                <Formik initialValues={{
                    name: "", email: "", password: "",
                    cpassword: ""
                }}
                    validationSchema={Yup.object({
                        name: Yup.string().max(50, 'must be 50 or less ')
                            .required('full name is mandatory'),
                        email: Yup.string()
                            .email('invalid email address')
                            .required('email is mandatory'),
                        password: Yup.string()
                            .matches(/(?=.*[A-za-z])(?=.*\d)(?=.*[@#$?!])[A-Za-z\d@#$?!]{8,50}$/, 'must contain lowercase,uppercaseone numeric and special character and must be atleast 8 character')
                            .required('password is required'),

                        cpassword: Yup.string()
                            .required('comfirm password is mandatory')
                            .oneOf([Yup.ref('password'), null], 'password does not matches')

                    })}

                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true)
                        signup(values)
                            .then(data => {
                                if (data.error) {
                                    setValues({ ...values, error: data.error })
                                }
                                else {
                                    setValues({ ...values, success: true })
                                    resetForm()
                                }
                                setSubmitting(false)
                            })
                            .catch(err => console.log(err))
                    }}
                >

                    <div className='max-w-xs mx-auto px-5 my-10 shadow-lg shadow-gray-300 border border-gray-200 bg-white py-10 rounded-lg'>
                        <Form>
                            {showError()}
                            {showSuccess()}
                            <h1 className='text-center py-4'>Please Register Here</h1>
                            <div className='relative '>

                                <Field type="text" name='name' id="name" placeholder='Full Name'

                                    className='w-full h-12 focus:outline-none border border-gray-500 px-2 peer placeholder-transparent'

                                />
                                <ErrorMessage name='name'>
                                    {msg => <h1 className='text-red-500'>{msg}</h1>}

                                </ErrorMessage>

                                <label htmlFor="name" className='formFloating'> Full Name</label>
                            </div>

                            <div className='relative mt-5'>

                                <Field type="email" name='email' id="email" placeholder='Email'

                                    className='w-full h-12 focus:outline-none border border-gray-500 px-2 peer placeholder-transparent'

                                />
                                <ErrorMessage name='email'>
                                    {msg => <div className='text-red-500'>{msg}</div>}
                                </ErrorMessage>

                                <label htmlFor="email" className='formFloating'> Email</label>
                            </div>

                            <div className='relative mt-5'>

                                <Field type="password" name='password' id="password" placeholder='Password'

                                    className='w-full h-12 focus:outline-none border border-gray-500 px-2 peer placeholder-transparent'

                                />
                                <ErrorMessage name='password'>
                                    {msg => <h1 className='text-red-500'>{msg}</h1>}
                                </ErrorMessage>

                                <label htmlFor="password" className='formFloating'> Password</label>
                            </div>


                            <div className='relative mt-5'>

                                <Field type="password" name='cpassword' id="cpassword" placeholder='Confirm Password'

                                    className='w-full h-12 focus:outline-none border border-gray-500 px-2 peer placeholder-transparent'

                                />
                                <ErrorMessage name='cpassword'>
                                    {err => <h1 className='text-red-500'>{err}</h1>}
                                </ErrorMessage>

                                <label htmlFor="cpassword" className='formFloating'> Confirm Password</label>
                            </div>

                            <button type='submit' className='w-full mx-auto mt-5 bg-indigo-400 text-white rounded-lg px-5 py-4'>Register</button>
                        </Form>
                    </div>

                </Formik>

            </div>


        </>
    )
}

export default RegistrationComponent