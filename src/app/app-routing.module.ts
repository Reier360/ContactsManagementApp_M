import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ContactAddComponent } from './contacts/contact-add/contact-add.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'contacts',
    component: ContactListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contacts/add',
    component: ContactAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contacts/edit/:id',
    component: ContactEditComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
