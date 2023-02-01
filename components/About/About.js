import Styles from "./About.module.css";

export function About(props) {
  return (
    <div className="background">{props.children}
      <div className="text-background">
      <h1 className="h1-about">Über uns</h1>
      <p className="p-about">TraWell hat es sich zum Ziel gesetzt, die Vereinbarkeit von Nachhaltigkeit und guter Reiseplanung zu vereinen und
         so grünes Reisen für alle zu ermöglichen. Dabei legen wir darauf Wert, dass alle sonst nicht aufgeführten Alternativen 
         schnell und übersichtlich dargestellt werden. Sind dir unsere Nachhaltigkeitsblätter aufgefallen? Diese geben dir einen 
         einen schnellen Überblick darüber, ob deine Route wenig oder mehr Emissionen verursachen würde. <br/>
         Wir danken dir ganz herzlich für die Nutzung, denn nur, wenn wir alle gemeinsam arbeiten, können wir unseren 
         Planeten retten. Empfehle uns gerne weiter und folge uns auf unseren Social-Media-Kanälen, um keins von unseren Projekten 
         zu verpassen!
      </p>
     </div> 
    </div>
  );
}
