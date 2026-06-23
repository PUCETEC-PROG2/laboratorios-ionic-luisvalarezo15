import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { createRepositories } from "../services/GithubService";
import { RepositoryPayload } from "../interfaces/RepositoryPayload";
import { useIonViewWillLeave } from "@ionic/react";

import "./Tab2.css";


const Tab2: React.FC = () => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");


  const handleSubmit = async () => {
    try {

      const repository: RepositoryPayload = {
        name: name,
        description: description,
    
      };


      const response = await createRepositories(repository);


      if (response) {
        setMessage("Repositorio creado correctamente");
        setName("");
        setDescription("");
      }


    } catch (error) {
      setMessage(`Error: ${(error as Error).message}`);
    }
  };


  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Formulario de repositorio
          </IonTitle>
        </IonToolbar>
      </IonHeader>


      <IonContent fullscreen>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Formulario de repositorio
            </IonTitle>
          </IonToolbar>
        </IonHeader>


        <div className="form-field">

          <IonInput
            className="form-field"
            label="Nombre"
            placeholder="Ingrese el nombre del repositorio"
            labelPlacement="floating"
            value={name}
            onIonInput={(e) =>
              setName(e.detail.value!)
            }
          />


          <IonTextarea
            className="form-field"
            label="Descripción"
            placeholder="Ingrese la descripción del repositorio"
            labelPlacement="floating"
            rows={4}
            value={description}
            onIonInput={(e) =>
              setDescription(e.detail.value!)
            }
          />


          <IonButton
            className="form-field"
            expand="block"
            fill="solid"
            onClick={handleSubmit}
          >
            Crear repositorio
          </IonButton>


          <p>
            {message}
          </p>

        </div>


      </IonContent>

    </IonPage>
  );
};


export default Tab2;