import React, {useState, useEffect} from "react"
import {withFormik, Form, Field} from "formik"
import * as Yup from "yup"
import axios from "axios"

const UserForm = ({values, errors, touched, status}) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        status && setUsers([...users, status])
    }, [status])

    return (
        <div>
            <Form>
                <label htmlFor="name">Name </label>
                <Field 
                    id="name"
                    type="text"
                    name="name"/><br />
                    {touched.name && errors.name && <p>{errors.name}</p>}<br />
                <label htmlFor="email">Email </label>
                <Field 
                    id="email"
                    type="text"
                    name="email"/><br />
                {touched.email && errors.email && <p>{errors.email}</p>}<br />
                <label htmlFor="password">Password </label>
                <Field 
                    id="password"
                    type="text"
                    name="password"/><br />
                {touched.password && errors.password && <p>{errors.password}</p>}<br />
                <Field 
                    type="checkbox"
                    name="terms"
                    checked={values.terms}/>
                    
                <span> Agree to Terms of Agreement</span><br /><br />
                <button type="submit">Submit</button>
            </Form>
            {users.map(user => {
                return (
                    <div key={user.id}>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Password: {user.password}</p>
                        <br />
                    </div>
                )
            })}
        </div>
    )

}

export default withFormik({
    mapPropsToValues({name, email, password, terms}) {
        return {
            name: "",
            email: "",
            password: "",
            terms: false
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Name is a required field!"),
        email: Yup.string().required("Email is a required field!"),
        password: Yup.string().required("Password is a required field!"),
        terms: Yup.bool()

    }),

    handleSubmit(values, { setStatus, resetForm }) {
        console.log("submitting ", values)
        axios.post("https://reqres.in/api/users", values)
        .then(res => {
            console.log("Success: ", res)
            setStatus(res.data)
            resetForm()
        })
        .catch(err => {
            console.log("Error: ", err.response)
        })
    }


})(UserForm)