import { Formik, Form, Field } from "formik";

function Email({schema,handler}) {
  return (
    <div>  <Formik
    initialValues={{
        username: "",
        email: "",
    }}
    validationSchema={schema}
    onSubmit={async (values) => {
      await handler(values.username, values.email);
    }}
  >
    {({ errors, touched }) => (
      <Form className="mt-6">
        <div className="mb-2">
          <label
            htmlFor="username"
            className="block text-sm font-semibold text-gray-800"
          >
            Username
          </label>
          <Field
            className=" opacity-70 block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            name="username"
          />
          {errors.username && touched.username ? <div>{errors.username}</div> : null}
        </div>
        <div className="mb-2">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-800"
          >
            Email
          </label>
          <Field
            type="email"
            className="block opacity-70 w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            name="email"
          />
          {errors.email && touched.email ? (
            <div>{errors.email}</div>
          ) : null}
        </div>
        {/* <a href="#" className="text-xs text-purple-600 hover:underline">
        Forget Password?
      </a> */}
        <div className="mt-6">
          <button
            type="submit"
            name="submit"
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
          >
            Register
          </button>
        </div>
      </Form>
    )}
  </Formik></div>
  )
}

export default Email