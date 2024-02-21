import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialService";
import { Link } from "react-router-dom";


const TutorialsList = () => {
  const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveTutorials = () => {
    TutorialDataService.getAll()
      .then(response => {
        setTutorials(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTutorials();
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    TutorialDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    TutorialDataService.findByTitle(searchTitle)
      .then(response => {
        setTutorials(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
   <div className="list row">
   <div className="col-md-8">
     <div className="input-group mb-3">
       <input
         type="text"
         className="form-control"
         placeholder="Pesquisar por título"
         value={searchTitle}
         onChange={onChangeSearchTitle}
       />
       <div className="input-group-append">
         <button
           className="btn btn-outline-secondary"
           type="button"
           onClick={findByTitle}
         >
           Pesquisar
         </button>
       </div>
     </div>
   </div>
   <div className="col-md-6">
     <h4>Lista de Tutoriais</h4>

     <ul className="list-group">
       {tutorials &&
         tutorials.map((tutorial, index) => (
           <li
             className={
               "list-group-item " + (index === currentIndex ? "active" : "")
             }
             onClick={() => setActiveTutorial(tutorial, index)}
             key={index}
           >
             {tutorial.title}
           </li>
         ))}
     </ul>

     <button
       className="m-3 btn btn-sm btn-danger"
       onClick={removeAllTutorials}
     >
       Remover Todos
     </button>
   </div>
   <div className="col-md-6">
     {currentTutorial ? (
       <div>
         <h4>Tutorial</h4>
         <div>
           <label>
             <strong>Título:</strong>
           </label>{" "}
           {currentTutorial.title}
         </div>
         <div>
           <label>
             <strong>Descrição:</strong>
           </label>{" "}
           {currentTutorial.description}
         </div>
         <div>
           <label>
             <strong>Status:</strong>
           </label>{" "}
           {currentTutorial.published ? "Published" : "Pending"}
         </div>

         <Link
           to={"/tutorials/" + currentTutorial.id}
           className="badge badge-warning"
         >
           Editar
         </Link>
       </div>
     ) : (
       <div>
         <br />
         <p>Por favor clique em um tutorial...</p>
       </div>
     )}
   </div>
 </div>
);
};

export default TutorialsList;