// Ionic React imports
import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonLoading } from '@ionic/react'

// CSS & icon import
import './Home.css'
import { reload } from 'ionicons/icons'

// Component import
import { random } from '../components/random'

// Plugin import


const Home: React.FC = () => {

    const [present, dismiss] = useIonLoading()
    const delay = (req: number) => new Promise(res => setTimeout(res, req));

    const newAffirmation = async () => {
        present({
            duration: 2000,
            spinner: 'bubbles'
        })
        await delay(2000)
        window.location.reload()
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Daily Affirmations</IonTitle>
                    <IonButton color="light" slot="end" onClick={newAffirmation} className="toolbar-button">
                        <IonIcon className="icon-color" icon={reload}/>
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding" color="tertiary">
                <div className="container">
                    <IonCard color="secondary">
                        <IonCardContent className="affirmation-card">
                            {random}
                        </IonCardContent>
                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Home
