import React, { useState } from 'react'
import { Form, Button } from "semantic-ui-react"
import { useFormik } from "formik"
import *as Yup from "yup"
import { toast } from "react-toastify";
import { registerApi } from "../../../api/user";

export default function RegisterForm(props) {
    const { showLoginForm } = props;
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),

        onSubmit: async(formData) => {
            setLoading(true);
            const response = await registerApi(formData);
            if(response?.jwt){
                toast.success("Registro Correcto")
                showLoginForm();
            } else{
                toast.error("Error al registrar al usuario, inténtelo más tarde")
            }
            setLoading(false);
        },

    });
    return (
        <Form className="register-form" onSubmit={formik.handleSubmit}>
            <Form.Input
                name="name" type="text" placeholder="Name" onChange={formik.handleChange} error={formik.errors.name}/>
            <Form.Input
                name="lastname" type="text" placeholder="Last Name" onChange={formik.handleChange} error={formik.errors.lastname} />
            <Form.Input
                name="username" type="text" placeholder="Name User" onChange={formik.handleChange} error={formik.errors.username}/>
            <Form.Input
                name="email" type="text" placeholder="E-mail" onChange={formik.handleChange} error={formik.errors.email}/>
            <Form.Input
                name="password" type="password" placeholder="Password" onChange={formik.handleChange} error={formik.errors.password}/>
            <div className="actions">
                <Button type="button" basic onClick={showLoginForm}>
                    Iniciar Sesión
                    </Button>
                <Button type="submit" className="submit" loading={loading}>
                    Registrar
                    </Button>
            </div>

        </Form>
    )
}


function initialValues() {
    return {
        name: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
    };
}

function validationSchema() {
    return {
        name: Yup.string().required(true),
        lastname: Yup.string().required(true),
        username: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        password: Yup.string().required(true),
    };
}