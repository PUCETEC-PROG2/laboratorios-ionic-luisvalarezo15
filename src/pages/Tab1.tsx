import React, { useState } from "react";
import {
  IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";

import RepoItem from "../components/RepoItem";
import LoadingSpinner from "../components/LoadingSpinner";
import { Repository } from "../interfaces/Repository";
import { fetchRepositories } from "../services/GithubService";
import "./Tab1.css";

const Tab1: React.FC = () => {
  const [repositoryList, setRepositoryList] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        {loading ? (
          <LoadingSpinner />
        ) : errorMsg ? (
          <p style={{ padding: "1rem", color: "var(--ion-color-danger)" }}>{errorMsg}</p>
        ) : (
          <IonList>
            {repositoryList.map((repo) => (
              <RepoItem key={repo.id} {...repo} />
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;