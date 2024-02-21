import React, { useState } from "react";
import TutorialDataService from "../services/TutorialService";

const AddTutorial = () => {
  // Definindo o status inicial das constantes da página
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  // Funcionamento do botão para o envio dos dados do formulário
  const saveTutorial = () => {
    var data = {
      title: tutorial.title,
      description: tutorial.description
    };

    TutorialDataService.create(data)
      .then(response => {
        setTutorial({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log("Erro");
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  // O retorno é o HTML da página que será mostrada
  return (
   <div className="submit-form">
     {submitted ? (
       <div>
         <h4>Você enviou com sucesso!</h4>
         <button className="btn btn-success" onClick={newTutorial}>
           Adicionar
         </button>
       </div>
     ) : (
       <div>
         <div className="form-group">
           <label htmlFor="title">Título</label>
           <input
             type="text"
             className="form-control"
             id="title"
             required
             value={tutorial.title}
             onChange={handleInputChange}
             name="title"
           />
         </div>

         <div className="form-group">
           <label htmlFor="description">Descrição</label>
           <input
             type="text"
             className="form-control"
             id="description"
             required
             value={tutorial.description}
             onChange={handleInputChange}
             name="description"
           />
         </div>

         <button onClick={saveTutorial} className="btn btn-success">
           Enviar
         </button>
       </div>
     )}
   </div>
 );
};

export default AddTutorial;