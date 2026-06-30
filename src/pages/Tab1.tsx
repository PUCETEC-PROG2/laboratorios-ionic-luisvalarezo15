import React, { useState } from "react";
import {
  IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar,
  useIonViewWillEnter, IonButton, IonModal, IonItem, IonInput, IonTextarea, IonLoading
} from "@ionic/react";

import RepoItem from "../components/RepoItem";
import LoadingSpinner from "../components/LoadingSpinner";
import { Repository } from "../interfaces/Repository";
import { fetchRepositories, deleteRepository, updateRepository } from "../services/GithubService";
import "./Tab1.css";

const Tab1: React.FC = () => {
  const [repositoryList, setRepositoryList] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  
  const [showModal, setShowModal] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<any>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchRepos = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const repos = await fetchRepositories();
      setRepositoryList(repos);
    } catch (error) {
      setErrorMsg(`Error al cargar repositorios: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    fetchRepos();
  });

  const handleDelete = async (fullName: string) => {
    try {
      await deleteRepository(fullName);
      fetchRepos(); 
    } catch (error) {
      setErrorMsg(`Error al eliminar: ${(error as Error).message}`);
    }
  };

  
  const handleEditClick = (repo: any) => {
    setSelectedRepo(repo);
    setEditName(repo.name);
    setEditDescription(repo.description || "");
    setShowModal(true);
  };

  
  const handleSaveChanges = async () => {
    if (!editName.trim()) {
      alert("El nombre del repositorio es obligatorio");
      return;
    }

    try {
      setUpdating(true);
      await updateRepository(selectedRepo.full_name, {
        name: editName.trim(),
        description: editDescription.trim()
      });
      
      setShowModal(false); 
      fetchRepos(); 
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {loading ? (
          <LoadingSpinner />
        ) : errorMsg ? (
          <p style={{ padding: "1rem", color: "red" }}>{errorMsg}</p>
        ) : (
          <IonList>
            {repositoryList.map((repo: any) => (
              <RepoItem
                key={repo.id}
                {...repo}
                full_name={repo.full_name} 
                onDelete={handleDelete}
                onEdit={handleEditClick} 
              />
            ))}
          </IonList>
        )}

        
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Editar Repositorio</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem className="ion-margin-bottom">
              <IonInput
                label="Nuevo Nombre"
                labelPlacement="floating"
                value={editName}
                onIonInput={(e) => setEditName(e.detail.value!)}
              />
            </IonItem>

            <IonItem className="ion-margin-bottom">
              <IonTextarea
                label="Nueva Descripción"
                labelPlacement="floating"
                rows={4}
                value={editDescription}
                onIonInput={(e) => setEditDescription(e.detail.value!)}
              />
            </IonItem>

            <IonButton expand="block" onClick={handleSaveChanges} disabled={updating}>
              {updating ? "Guardando..." : "Guardar Cambios"}
            </IonButton>
            
            <IonButton expand="block" color="light" onClick={() => setShowModal(false)} disabled={updating}>
              Cancelar
            </IonButton>
          </IonContent>
        </IonModal>

        
        <IonLoading isOpen={updating} message="Actualizando repositorio..." />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;