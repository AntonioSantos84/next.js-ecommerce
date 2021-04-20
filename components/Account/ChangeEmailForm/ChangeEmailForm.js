import React, { useState } from 'react'
import {Form, Button } from "semantic-ui-react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { toast } from "react-toastify"
import { updateEmailApi } from "../../../api/user"

export default function ChangeEmailForm(props) {
    const {user, logout, setReloadUser } = props;
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(user.email),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await updateEmailApi(user.id, formData.email, logout);
            if(!response || response?.statusCode === 400) {
                toast.error("Error updating the new email address");
            } else{
                setReloadUser(true);
                toast.success("Email updated");
                formik.handleReset();
            }
            setLoading(false);
        },
    });


    return (
        <div className="change-email-form">
            <h4> Change your email<span>( Your current email: {user.email})</span></h4>
        
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group widths="equal">
                <Form.Input name="email" placeholder="Your new email" onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email}/>
                <Form.Input name="repeatEmail" placeholder="Confirm your new email" onChange={formik.handleChange} value={formik.values.repeatemail} error={formik.errors.repeatemail}/>
            </Form.Group>
            <Button className="submit" loading={loading}>Save</Button>
        </Form>
        </div>
    )
}


function initialValues(email, repeatemail) {
    return {
        email: email || "",
        repeatEmail: repeatemail || "",
    };
}

function validationSchema() {
    return {
        email: Yup.string()
        .email(true)
        .required(true)
        .oneOf([Yup.ref("repeatEmail")], true),
        repeatEmail: Yup.string()
        .email(true)
        .required(true)
        .oneOf([Yup.ref("email")],true),
    }
}