import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { enviroment } from './enviromentConfig';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    importProvidersFrom(provideFirebaseApp(() => initializeApp(enviroment))), 
  importProvidersFrom(provideAuth(() => getAuth())), 
  importProvidersFrom(provideFirestore(() => getFirestore())),
  importProvidersFrom(HttpClientModule)]
};
