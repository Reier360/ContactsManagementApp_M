import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactAddComponent } from './contacts/contact-add/contact-add.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'contacts',
    component: ContactListComponent,
  },
  {
    path: 'contacts/add',
    component: ContactAddComponent,
  },
  {
    path: 'contacts/edit',
    component: ContactListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
