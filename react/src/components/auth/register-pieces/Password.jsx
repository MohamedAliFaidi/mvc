import { Formik, Form, Field } from "formik";

function Password({ handleRegister, passwordSchema, username, email }) {
  return (
    <div>
      {" "}
      <Formik
        initialValues={{
          password: "",
          confirm: "",
        }}
        validationSchema={passwordSchema}
        onSubmit={async (values) => {
          await handleRegister(username, email, values.password);
        }}
      >
        {({ errors, touched }) => (
          <Form className="mt-6">
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                password
              </label>
              <Field
                type="password"
                className=" opacity-70 block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="password"
              />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
            </div>
            <div className="mb-2">
              <label
                htmlFor="confirm"
                className="block text-sm font-semibold text-gray-800"
              >
                confirm
              </label>
              <Field
                type="password"
                className=" opacity-70 block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="confirm"
              />
              {errors.confirm && touched.confirm ? (
                <div>{errors.confirm}</div>
              ) : null}
            </div>
            <div className="mt-6">
              <button
                type="submit"
                name="submit"
                className={
                  "w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                }
              >
                Register
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Password;
