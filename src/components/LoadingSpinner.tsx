import React from "react";
import "./LoadingSpinner.css";
import { IonSpinner } from "@ionic/react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner">
      <IonSpinner name="crescent" />
    </div>
  );
};

export default LoadingSpinner;