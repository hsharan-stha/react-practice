import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  logoutAction,
  getAllProductAction,
  createProductAction,
  deleteProductAction,
  updateProductAction,
} from "../store/action";
import "./home.css";
import { useSelector } from "react-redux";
import DataTable from "../shared/data-table/data-table";

function Home() {
  const dispatch = useDispatch();

  const { data, isCreate } = useSelector((state) => state.product);


  const column = [
    { name: 'Id', key: 'id' },
    { name: 'Name', key: 'name' },
    { name: 'Description', key: 'description' },
    { name: 'Image', key: 'image' },
    { name: 'Quantity', key: 'quantity' },

    { name: 'Action', key: 'action', buttons: ['edit', 'delete'] }
]


  const history = useHistory();

  const [productForm, setproductForm] = useState({
    id: "",
    name: "",
    description: "",
    image: "",
    quantity: "",
  });

  const [acessBtn, setAccessBtn] = useState({
    save: true,
    update: false,
    cancel: true,
  });

  const [disableForm, setDisableForm] = useState(false);

  const [productiionModal, setProdcutionModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // submit for create and update
  const onSubmit = async () => {
    setAccessBtn({
      save: true,
      update: false,
      cancel: true,
    });
    setDisableForm(false);
    formikForm.resetForm();
    setProdcutionModal(false);
    if (!formikForm.values.id) {
      delete formikForm.values.id;
      dispatch(createProductAction(formikForm.values));
      await dispatch(getAllProductAction());
    } else {
      dispatch(updateProductAction(formikForm.values));
    }
  };

  //yup validation for product form
  const onValidation = yup.object().shape({
    name: yup.string().required("Product Name is Required!"),
    description: yup
      .string()
      .required("Description is Required!")
      .max(255, "Maximum character is 255"),
    image: yup.string().required("Image URL is Required!"),
    quantity: yup
      .number("Only number allowed")
      .required("Quantity is Required!"),
  });

  //formik form
  const formikForm = useFormik({
    initialValues: productForm,
    onSubmit,
    validationSchema: onValidation,
  });

  //edit for product form
  const editData = (el) => {
    setAccessBtn({
      save: false,
      update: true,
      cancel: true,
    });
    setDisableForm(false);
    formikForm.setValues(el).then((res) => { });
    setProdcutionModal(true);
  };

  //view for product form
  const viewData = (el) => {
    setAccessBtn({
      save: false,
      update: false,
      cancel: true,
    });
    setDisableForm(true);
    formikForm.setValues(el).then((res) => { });
    setProdcutionModal(true);
  };

  //create for product data
  const createData = () => {
    formikForm.resetForm();
    setAccessBtn({
      save: true,
      update: false,
      cancel: true,
    });
    setDisableForm(false);
    setProdcutionModal(true);
  };

  //open delete popup
  const deleteFnx = (el) => {
    setDeleteModal(true);
    formikForm.setValues(el).then((res) => { });
  };

  //delete for product
  const deleteData = async (el) => {
    setDeleteModal(false);
    await dispatch(deleteProductAction(el["id"]));
    dispatch(getAllProductAction());
  };

  // logut with remove token
  const logout = () => {
    localStorage.removeItem("token");
    history.push("/login");
    dispatch(logoutAction());
  };

  useEffect(() => {
    dispatch(getAllProductAction()); //to get first list of procut
  }, []);

  return (
    <>
      <ul className="nav justify-content-between border-bottom border-dark border-3">
        
        <li className="nav-item">
          <span
            className="nav-link"
            onClick={() => {
              logout();
            }}
          >
            <h5 className="text-black home-btn">
              <i className="bi bi-box-arrow-right mr-1"></i>
              Logout
            </h5>
          </span>
        </li>
      </ul>
      <div className="container mt-5">
        <div className="d-flex justify-content-start mb-1">
          <button
            type="button"
            className="btn btn-info"
            onClick={() => createData()}
            data-toggle="modal"
            data-target="#productFormModal"
          >
            <i className="bi bi-plus-circle mr-2"></i>
            Create
          </button>
        </div>

        <div className="table-responsive">
        <DataTable column={column} data={data} edit={editData} delete={deleteFnx}></DataTable>

          {/* <table className="table table-striped border border-bottom-0 border-secondary">
            <thead>
              <tr>
                <th scope="col">S.N.</th>
                <th scope="col">Product Name</th>
                <th scope="col">Description</th>
                <th scope="col">Image URl</th>
                <th scope="col">Quantity</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((el, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{el.name}</td>
                    <td>{el.description}</td>
                    <td>{el.image}</td>
                    <td>{el.quantity}</td>
                    <td className="d-flex justify-content-center">
                      <span
                        className="btn btn-default mr-2"
                        onClick={() => editData(el)}
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </span>
                      <span
                        className="btn btn-default mr-2"
                        onClick={() => viewData(el)}
                      >
                        <i className="bi bi-eye-fill"></i>
                      </span>
                      <span
                        className="btn btn-default"
                        onClick={() => {
                          deleteFnx(el);
                        }}
                      >
                        <i className="bi bi-trash3-fill"></i>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table> */}
        </div>
      </div>
      {/* Modal for production form*/}
      <Modal isOpen={productiionModal}>
        <ModalHeader
          toggle={() => {
            setProdcutionModal(false);
          }}
        >
          Product Information
        </ModalHeader>
        <ModalBody>
          <form onSubmit={formikForm.handleSubmit}>
            <div className="from-row">
              <div className="form-group col-12">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  autoComplete="off"
                  value={formikForm.values.name}
                  disabled={disableForm}
                  onChange={formikForm.handleChange}
                  onBlur={formikForm.handleBlur}
                />
              </div>
              {formikForm.errors.name
                ? formikForm.touched.name && (
                  <span className="text-danger ml-3">
                    {formikForm.errors.name}
                  </span>
                )
                : null}
            </div>
            <div className="from-row">
              <div className="form-group col-12">
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  className="form-control"
                  id="image"
                  autoComplete="off"
                  value={formikForm.values.image}
                  disabled={disableForm}
                  onChange={formikForm.handleChange}
                  onBlur={formikForm.handleBlur}
                />
              </div>
              {formikForm.values.image && (
                <div className="from-row">
                  <div className="form-group col-12">
                    <img
                      src={formikForm.values.image}
                      width="150"
                      height="80"
                      className="d-inline-block align-top"
                      alt="uploaded image"
                    />
                  </div>
                </div>
              )}
              {formikForm.errors.image
                ? formikForm.touched.image && (
                  <span className="text-danger ml-3">
                    {formikForm.errors.image}
                  </span>
                )
                : null}
            </div>
            <div className="from-row">
              <div className="form-group col-12">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  id="description"
                  rows="3"
                  autoComplete="off"
                  value={formikForm.values.description}
                  disabled={disableForm}
                  onChange={formikForm.handleChange}
                  onBlur={formikForm.handleBlur}
                ></textarea>
              </div>
              {formikForm.errors.description
                ? formikForm.touched.description && (
                  <span className="text-danger ml-3">
                    {formikForm.errors.description}
                  </span>
                )
                : null}
            </div>
            <div className="from-row">
              <div className="form-group col-12">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  id="quantity"
                  autoComplete="off"
                  value={formikForm.values.quantity}
                  disabled={disableForm}
                  onChange={formikForm.handleChange}
                  onBlur={formikForm.handleBlur}
                />
              </div>
              {formikForm.errors.quantity
                ? formikForm.touched.quantity && (
                  <span className="text-danger ml-3">
                    {formikForm.errors.quantity}
                  </span>
                )
                : null}
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          {acessBtn.cancel && (
            <button
              type="buttom"
              className="btn btn-danger mr-2"
              onClick={() => {
                setProdcutionModal(false);
              }}
            >
              Cancel
            </button>
          )}
          {acessBtn.save && (
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => onSubmit()}
            >
              Save
            </button>
          )}
          {acessBtn.update && (
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => onSubmit()}
            >
              Update
            </button>
          )}
        </ModalFooter>
      </Modal>
      {/* production form modal end*/}

      {/* Modal for delete confirmation*/}
      <Modal isOpen={deleteModal}>
        <ModalHeader
          toggle={() => {
            setDeleteModal(false);
          }}
        >
          Delete Product
        </ModalHeader>
        <ModalBody>Are you suere to delete this product?</ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setDeleteModal(false);
            }}
          >
            No
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteData(formikForm.values)}
          >
            Yes
          </button>
        </ModalFooter>
      </Modal>
      {/* delete modal end */}
    </>
  );
}

export default Home;
