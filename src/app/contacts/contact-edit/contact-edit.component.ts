import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerEdit } from 'src/app/interfaces/customer/customer-edit';
import { CustomerService } from 'src/app/_services/customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
})
export class ContactEditComponent implements OnInit {
  errorMessage: string = '';
  successMessage: string = '';
  id: number = 0;

  public form = this.formBuilder.group({
    emailAddress: ['', [Validators.required, Validators.email]],
    surname: ['', Validators.required],
    name: ['', Validators.required],
    telephoneNumber: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getContact();
  }

  getContact() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') ?? '0');

    this.customerService.get(this.id).subscribe({
      next: (v: CustomerEdit) => {
        this.form.controls['name'].setValue(v.name);
        this.form.controls['surname'].setValue(v.surname);
        this.form.controls['telephoneNumber'].setValue(
          v.telephoneNumber.toString()
        );
        this.form.controls['emailAddress'].setValue(v.emailAddress);
        this.form.controls['dateOfBirth'].setValue(v.dateOfBirth.toString());
      },
      error: (e) => {
        this.errorMessage = 'Error saving contact.';
      },
    });
  }

  save() {
    let name = this.form.controls['name'].value ?? '';
    let surname = this.form.controls['surname'].value ?? '';
    let telephoneNumber = this.form.controls['telephoneNumber'].value ?? '0';
    let emailAddress = this.form.controls['emailAddress'].value ?? '';
    let dateOfBirth = new Date(this.form.controls['dateOfBirth'].value ?? '');

    this.customerService
      .edit({
        id: this.id,
        name: name,
        surname: surname,
        telephoneNumber: parseInt(telephoneNumber ?? '0'),
        emailAddress: emailAddress,
        dateOfBirth: dateOfBirth,
      })
      .subscribe({
        next: (v: any) => {
          this.successMessage = 'Contact saved successfully.';
        },
        error: (e) => {
          this.errorMessage = 'Error saving contact.';
        },
      });
  }
}
