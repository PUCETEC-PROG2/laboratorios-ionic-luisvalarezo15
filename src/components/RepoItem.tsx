import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonThumbnail } from "@ionic/react";
import { Repository } from "../interfaces/Repository";
import "./RepoItem.css";
import React from "react";
import { pencil, trash } from "ionicons/icons";

interface RepoItemProps extends Repository {
  full_name: string; 
  onDelete: (fullName: string) => void;
  onEdit: (repo: Repository & { full_name: string }) => void; 
}
const RepoItem: React.FC<RepoItemProps> = (repository) => {
  return (
    <IonItemSliding>
      <IonItem>
        <IonThumbnail slot="start">
          <img src={repository.avatarUrl} alt="Avatar" />
        </IonThumbnail>
        <IonLabel>
          <h3>{repository.name}</h3>
          <p>{repository.description}</p>
          <p>
            <strong>Lenguaje:</strong> {repository.language}
          </p>
        </IonLabel>
      </IonItem>
      <IonItemOptions>
        <IonItemOption color="primary" onClick={() => repository.onEdit(repository)}>
          <IonIcon icon={pencil} slot="icon-only" />
        </IonItemOption>
        <IonItemOption color="danger" onClick={() => repository.onDelete(repository.full_name)}>
          <IonIcon icon={trash} slot="icon-only" />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RepoItem;