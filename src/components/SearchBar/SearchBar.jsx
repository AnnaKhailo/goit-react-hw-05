import { Formik, Form, Field } from "formik";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  const notify = () => toast.error("Please fill in the search field!");

  const handleSubmit = (values, actions) => {
    values.query.trim() === "" && notify();
    onSearch(values.query);
    actions.resetForm();
  };

  return (
    <div>
      <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
        <Form className={css.searchForm}>
          <Field
            className={css.searchField}
            type="text"
            name="query"
            placeholder="Search movies"
          ></Field>
          <button className={css.searchBtn} type="submit">
            Search
          </button>
        </Form>
      </Formik>
      <Toaster />
    </div>
  );
}
