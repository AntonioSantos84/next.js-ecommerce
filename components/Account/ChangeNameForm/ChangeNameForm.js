import React, { useState } from 'react'
import { Form, Button } from "semantic-ui-react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { toast } from "react-toastify"
import { updateNameApi } from "../../../api/user"

export default function ChangeNameForm(props) {
    const { user, logout, setReloadUser } = props;
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(user.name, user.lastname),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await updateNameApi(user.id, formData, logout);
            if(!response) {
                toast.error("Error updating the new user information");
            } else {
                setReloadUser(true);
                toast.success("Information updated");
            }
            setLoading(false);
        },
    });

    return (
        <div className="change-name-form">
            <h4>Change full name</h4>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group widths="equal">
                    <Form.Input name="name" placeholder="Your new name" onChange={formik.handleChange} value={formik.values.name} error={formik.errors.name} />
                    <Form.Input name="lastname" placeholder="Your new lastname" onChange={formik.handleChange} value={formik.values.lastname} error={formik.errors.lastname} />
                </Form.Group>
                <Button className="submit" loading={loading}>Save</Button>
            </Form>
        </div>
    )
}

function initialValues(name, lastname) {
    return {
        name: name || "",
        lastname: lastname || "",
    };
}

function validationSchema() {
    return {
        name: Yup.string().required(true),
        lastname: Yup.string().required(true),
    }
}