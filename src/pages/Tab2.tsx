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
  IonToast,
  IonLoading,
  IonItem,
  IonNote,
  useIonViewWillLeave,
} from "@ionic/react";
import {
  createRepositories,
  fetchUserInfo,
} from "../services/GithubService";
import { RepositoryPayload } from "../interfaces/RepositoryPayload";
import "./Tab2.css";

const Tab2: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  
  const [isTouched, setIsTouched] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastColor, setToastColor] = useState("success");

  useIonViewWillLeave(() => {
    setName("");
    setDescription("");
    setIsTouched(false);
  });

  React.useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const data = await fetchUserInfo();
      setUser(data);
    } catch (error) {
      triggerToast(`Error al obtener usuario: ${(error as Error).message}`, "danger");
    }
  };

 
  const triggerToast = (message: string, color: "success" | "danger") => {
    setToastMessage(message);
    setToastColor(color);
    setShowToast(true);
  };

  const handleSubmit = async () => {
    setIsTouched(true);

    
    if (!name.trim()) {
      triggerToast("El nombre del repositorio es obligatorio", "danger");
      return;
    }

    try {
      setLoading(true);
      const repository: RepositoryPayload = {
        name: name.trim(),
        description: description.trim(),
      };

      
      const response = await createRepositories(repository);

      if (response) {
        triggerToast("¡Repositorio creado correctamente!", "success");
        
        setName("");
        setDescription("");
        setIsTouched(false);
      }
    } catch (error) {
      
      triggerToast(`Error: ${(error as Error).message}`, "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2 - Usuario y Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-field" style={{ padding: "16px" }}>
          {/* POST /user - Mostrar Información de Usuario obtenida */}
          {user && (
            <div style={{ marginBottom: "24px", textAlign: "center" }}>
              <h3>Usuario GitHub</h3>
              <img
                src={user.avatar_url}
                alt="Avatar"
                width="80"
                style={{ borderRadius: "50%", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
              />
              <p><b>{user.login}</b></p>
            </div>
          )}
          <IonItem className={`${isTouched && !name.trim() ? 'ion-invalid' : 'ion-valid'} ion-margin-bottom`}>
            <IonInput
              label="Nombre del repositorio *"
              placeholder="Ej: mi-proyecto-api"
              labelPlacement="floating"
              value={name}
              onIonInput={(e) => setName(e.detail.value!)}
            />
            {isTouched && !name.trim() && <IonNote slot="error">El nombre es requerido</IonNote>}
          </IonItem>
          <IonItem className="ion-margin-bottom">
            <IonTextarea
              label="Descripción (Opcional)"
              placeholder="Ingrese la descripción del repositorio"
              labelPlacement="floating"
              rows={4}
              value={description}
              onIonInput={(e) => setDescription(e.detail.value!)}
            />
          </IonItem>
          <IonButton
            expand="block"
            onClick={handleSubmit}
            disabled={loading}
            className="ion-margin-top"
          >
            Crear repositorio
          </IonButton>
          <IonLoading
            isOpen={loading}
            message={"Creando repositorio en GitHub..."}
          />
          <IonToast
            isOpen={showToast}
            message={toastMessage}
            duration={3000}
            color={toastColor}
            onDidDismiss={() => setShowToast(false)}
            buttons={[{ text: 'Cerrar', role: 'cancel' }]}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;