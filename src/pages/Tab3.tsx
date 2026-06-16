import { IonCard, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="card-container">
          <IonCard className="card">
            <img
              src="https://avatars.githubusercontent.com/u/191405317?v=4&size=64"
              alt="Foto de perfil"
            />
            <IonCardHeader className="card">
              <IonCardTitle>Luis Valarezo</IonCardTitle>
              <IonCardTitle>luisvalarezo15</IonCardTitle>
            </IonCardHeader>
            <p>
              Estudiante de desarrollo de software en cuarto semestre en la
              Pontificia Universidad Catolica del Ecuador
            </p>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;