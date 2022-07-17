import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CustomerList } from 'src/app/interfaces/customer/customer-list';
import { CustomerService } from 'src/app/_services/customer.service';
import { CustomerDataTableDataSource } from './customer-data-table-datasource';
import { merge, tap } from 'rxjs';

@Component({
  selector: 'app-contact-data-table',
  templateUrl: './contact-data-table.component.html',
  styleUrls: ['./contact-data-table.component.css'],
})
export class ContactDataTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CustomerList>;

  dataSource: CustomerDataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'name',
    'surname',
    'telephoneNumber',
    'emailAddress',
    'dateOfBirth',
    'actions',
  ];

  constructor(private customerService: CustomerService) {
    this.dataSource = new CustomerDataTableDataSource(customerService);
    this.dataSource.loadContacts();
  }

  ngAfterViewInit(): void {
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadLessonsPage()))
      .subscribe();

    this.table.dataSource = this.dataSource;
  }

  loadLessonsPage() {
    this.dataSource.loadContacts(
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  editContact(id: number) {}
}
