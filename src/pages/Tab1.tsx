import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import RepoItem from "../components/RepoItem";
import LoadingSpinner from "../components/LoadingSpinner";
import { Repository } from "../interfaces/Repository";
import { fetchRepositories } from "../services/GithubService";

import "./Tab1.css";

const Tab1: React.FC = () => {
  const [repositoryList, setRepositoryList] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRepos = async () => {
    try {
      setLoading(true);

      const repos = await fetchRepositories();
      console.log("Repositorios recibidos:", repos);

      setRepositoryList(repos);
    } catch (error) {
      console.error("Error al obtener repositorios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

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