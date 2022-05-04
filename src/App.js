import './App.css';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';

function App() {

  let products = [
    "Produto 1",
    "Produto 2",
    "Produto 3",
    "Produto 4",
  ];

  const validationSchema = Yup.object({
    "name": Yup.string().required(),
    "email": Yup.string().email('E-mail inválido').required('E-mail é um campo obrigatório'),
    "product": Yup.string().required('Por favor, selecione um produto').oneOf(products),
    "use-terms":Yup.boolean().required(),
  })

  const InitialValues = {
    "name":"",
    "email":"",
    "product":"",
    "use-terms":"",
  }

  const possibleProducts = products.map((product, key) => {
    return (
    <option value={product} key={"productOption-"+key}>
      {product}
    </option>
    )
  })

  const renderError = (message) => <p style={{color:'red'}}>{message}</p>

  return (
    <div className="App">
      <h1>Fale Conosco</h1>
      <Formik
        initialValues={InitialValues} validationSchema={validationSchema}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form style={{display:"flex", flexDirection:"column", width:"100%", gap:'20px', alignItems:'center'}}>
          <Field name="name" type="text" placeholder="Nome Completo" />
          <ErrorMessage name="name" render={renderError} />
          <Field name="email" type="email" placeholder="E-mail"/>
          <ErrorMessage name="email" render={renderError} />
          <Field name="product" as="select">
            <option value="">Selecione um produto</option>
            {possibleProducts}
          </Field>
          <ErrorMessage name="product" render={renderError} />
          <label htmlFor=''use-terms>
            <Field name="use-terms"type="checkbox" />
            Aceito os <a href="https://google.com">termos de uso</a>.
            <ErrorMessage name="user-terms" render={renderError} />
          </label>
          <button type="submit">Enviar</button>
        </Form>
      </Formik>
    </div>
  );
}

export default App;
