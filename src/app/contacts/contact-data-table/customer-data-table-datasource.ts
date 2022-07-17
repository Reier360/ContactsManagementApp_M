import { DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { CustomerService } from 'src/app/_services/customer.service';
import { CustomerList } from 'src/app/interfaces/customer/customer-list';

// TODO: replace this with real data from your application
const EXAMPLE_DATA: CustomerList[] = [];

/**
 * Data source for the CustomerDataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CustomerDataTableDataSource extends DataSource<CustomerList> {
  private customersSubject = new BehaviorSubject<CustomerList[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private customersCountSubject = new BehaviorSubject<number>(0);

  public count$ = this.customersCountSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  constructor(private customerService: CustomerService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<CustomerList[]> {
    return this.customersSubject.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    this.customersSubject.complete();
    this.loadingSubject.complete();
  }

  loadContacts(
    orderColumn: string = '',
    sortDirection = '',
    pageIndex = 0,
    pageSize = 10
  ) {
    this.loadingSubject.next(true);

    forkJoin([
      this.customerService.list({
        skip: pageIndex,
        take: pageSize,
        orderColumn: orderColumn,
        ascDesc: sortDirection,
      }),
      this.customerService.count(),
    ]).subscribe((data) => {
      this.loadingSubject.next(false);
      this.customersSubject.next(data[0]);
      this.customersCountSubject.next(data[1]);
    });
  }
}
