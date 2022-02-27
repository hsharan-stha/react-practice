import { useEffect } from "react";
import DataTable from "../shared/data-table/data-table";
import useGetData from "../shared/api-call/getApiHook";
import * as yup from 'yup';
import { useFormik } from "formik";
import usePostData from "../shared/api-call/postApiHook";
import axios from "axios";

function Todo() {

    const { loading, error, data, apiCall } = useGetData('http://localhost:3000/todo')

    const column = [
        { name: 'Id', key: 'id' },
        { name: 'Department', key: 'department' },
        { name: 'Description', key: 'description' }
    ]


    const validationSchema = yup.object().shape({
        id: yup.string().required(),
        department: yup.string().required(),
        description: yup.string().required()
    })




    const onSubmit = async (values) => {
        const res = await axios.post('http://localhost:3000/todo', values)
        if (res.status == 201) {
            apiCall()
        }
        console.log(res);

    }

    const todoForm = useFormik({
        initialValues: { id: '', department: '', description: '' },
        onSubmit,
        validationSchema,
    })

    // useEffect(() => {
    //     console.log('app')
    // }, [])


    return (
        <>
            <form onSubmit={todoForm.handleSubmit}>
                <label>Id</label><br />
                <input type="text" name="id" onChange={todoForm.handleChange} value={todoForm?.values.id} />
                {todoForm?.touched?.id && todoForm?.errors?.id}<br /><br />
                <label>Department</label><br />
                <input type="text" name="department" onChange={todoForm.handleChange} value={todoForm?.values.department} />
                {todoForm?.touched?.department && todoForm?.errors?.department}<br /><br />
                <label>Description</label><br />
                <textarea cols={12} rows={4} name="description" onChange={todoForm.handleChange} value={todoForm?.values.description}></textarea>
                {todoForm?.touched?.description && todoForm?.errors?.description}<br /><br />
                <button type="submit">Save</button>
            </form>
            <hr />
            <DataTable column={column} data={data}></DataTable>
        </>
    );
}


export default Todo