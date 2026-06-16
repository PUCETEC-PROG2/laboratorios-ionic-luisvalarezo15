import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-field">
          <IonInput
            className="form-field"
            label="Descripcion"
            placeholder="Ingrese la descripccion del repositorio"
            labelPlacement="floating"
          />

          <IonTextarea
            className="form-field"
            label="Descripcion"
            placeholder="Ingrese la descripccion del repositorio"
            labelPlacement="floating"
            rows={4}
          />

          <IonButton
            className="form-field"
            expand="block"
            fill="solid"
          >
            Enviar
          </IonButton>
        </div>

        <ExploreContainer name="Tab 2 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;