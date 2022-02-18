// Ionic React imports
import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

// Plugin imports
import { App as capApp } from '@capacitor/app'
import { useEffect } from 'react'
import { Capacitor } from '@capacitor/core'
import { PushNotifications } from '@capacitor/push-notifications'

// Page import
import Home from './pages/Home'

// Setup Ionic React
setupIonicReact({
    hardwareBackButton: false
})

// App component
const App: React.FC = () => {
    
    const addListeners = async () => {
        await PushNotifications.addListener('registration', token => {
          console.info('Registration token: ', token.value);
        });
      
        await PushNotifications.addListener('registrationError', err => {
          console.error('Registration error: ', err.error);
        });
      
        await PushNotifications.addListener('pushNotificationReceived', notification => {
          console.log('Push notification received: ', notification);
        });
      
        await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
          console.log('Push notification action performed', notification.actionId, notification.inputValue);
        });
    }
      
    const registerNotifications = async () => {
        let permStatus = await PushNotifications.checkPermissions();
      
        if (permStatus.receive === 'prompt') {
          permStatus = await PushNotifications.requestPermissions();
        }
      
        if (permStatus.receive !== 'granted') {
          throw new Error('User denied permissions!');
        }
      
        await PushNotifications.register();
    }
    
    const getDeliveredNotifications = async () => {
        const notificationList = await PushNotifications.getDeliveredNotifications();
        console.log('delivered notifications', notificationList);
    }    

    // Handling hardware back button
    useEffect(() => {
        if (Capacitor.isNativePlatform) {
            capApp.addListener("backButton", (e) => {
                if (window.location.pathname === "/home") {
                    // Show A Confirm Box For User to exit app or not
                    let ans = window.confirm("Are you sure you want to exit?");
                    if (ans) {
                        capApp.exitApp();
                    } 
                } else if (window.location.pathname === "/") {
                    // Show A Confirm Box For User to exit app or not
                    let ans = window.confirm("Are you sure you want to exit?");
                    if (ans) {
                    capApp.exitApp();
                    } 
                } 
            }); 
        }
    }, []);

    return (
        // Main app
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route exact path="/home">
                        <Home />
                    </Route>
                    <Redirect exact path="/" to="/home" />
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    )
}

export default App
