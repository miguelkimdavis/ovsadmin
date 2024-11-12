import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DisplayComponent } from './display/display.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { LoaderComponent } from './utility/loader/loader.component';
import { SnackbarComponent } from './utility/snackbar/snackbar.component';
import { ModalComponent } from './utility/modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    DisplayComponent,
    EditComponent,
    LoaderComponent,
    SnackbarComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), 
    AngularFirestoreModule,
    NgbModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
