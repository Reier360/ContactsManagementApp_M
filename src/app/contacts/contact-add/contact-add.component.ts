import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/_services/customer.service';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css'],
})
export class ContactAddComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {}

  public form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    surname: ['', Validators.required],
    name: ['', Validators.required],
    telephoneNumber: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
  });

  ngOnInit(): void {}

  add() {
    //  let name = this.form.controls['name'].value;
    //  let surname = this.form.controls['surname'].value;
    //  let telephoneNumber = parseInt(this.form.controls['telephoneNumber'].value);
    //  let emailAddress = this.form.controls['emailAddress'].value;
    //  let dateOfBirth = this.form.controls['dateOfBirth'].value;
    // this.customerService.add({
    //   name: name ? name : '',
    //   surname: surname ? surname : '',
    //   telephoneNumber: telephoneNumber ? telephoneNumber : '',
    //   emailAddress: emailAddress ? emailAddress : '',
    //   dateOfBirth: dateOfBirth ? dateOfBirth : '',
    // });
  }
}
