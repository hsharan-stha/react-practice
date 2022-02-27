import { useEffect } from "react";
import DataTable from "../shared/data-table/data-table";
import useGetData from "../shared/api-call/getApiHook";
import * as yup from 'yup';
import { useFormik } from "formik";
import axios from "axios";

function Todo() {

    const { loading, error, data, apiCall } = useGetData('http://localhost:3000/todo')

    const column = [
        { name: 'Id', key: 'id' },
        { name: 'Department', key: 'department' },
        { name: 'Description', key: 'description' },
        { name: 'Action', key: 'action', buttons: ['edit', 'delete'] }
    ]


    const validationSchema = yup.object().shape({
        id: yup.string().required(),
        department: yup.string().required(),
        description: yup.string().required()
    })




    const onSubmit = async (values) => {
        try {
            if (values.forUpdate) {
                const res = await axios.put(`http://localhost:3000/todo/${values.id}`, values)
                console.log(res)
                if (res.status == 200) {
                    apiCall()
                    todoForm.resetForm();
                }

                return;
            }
            const res = await axios.post('http://localhost:3000/todo', values)
            if (res.status == 201) {
                apiCall()
                todoForm.resetForm();
            }
        }
        catch (error) {
            console.log(error)
        }

    }

    const todoForm = useFormik({
        initialValues: { id: '', department: '', description: '', forUpdate: false },
        onSubmit,
        validationSchema,
    })

    const editAction = (e) => {
        console.log(e)
        todoForm.setValues({
            id: e.id,
            department: e.department,
            description: e.description,
            forUpdate: true
        })
    }

    const deleteAction = async (e) => {
        try {
            const res = await axios.delete(`http://localhost:3000/todo/${e.id}`)
            console.log(res)
            if (res.status == 200) {
                apiCall()
                todoForm.resetForm();
            }
        } catch (error) {
            console.log(error)
        }
    }


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
            <DataTable column={column} data={data} edit={editAction} delete={deleteAction}></DataTable>
        </>
    );
}


export default Todo