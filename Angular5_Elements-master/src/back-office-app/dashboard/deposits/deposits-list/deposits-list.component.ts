import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientBankOrder } from '../../../shared/models/client-bank-order-model';
import { ApiService } from '../../../shared/api.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { ClientOrderStatus } from '../../../../common/enums/client-order-status';

@Component({
	templateUrl: './deposits-list.component.html'
})

export class DepositsListComponent implements OnInit, OnDestroy {
	ClientOrderStatus = ClientOrderStatus;
	orders: ClientBankOrder[] = [];
	private ngUnsub = new Subject();

	constructor(private apiService: ApiService) { }

	ngOnInit() {
		this.apiService.get('fiat/order/list')
			.pipe(takeUntil(this.ngUnsub))
			.subscribe(response => {
				this.orders = response.sort((a, b) => Date.parse(b.createdDate) - Date.parse(a.createdDate));;
			});
	}

	ngOnDestroy(): void {
		this.ngUnsub.next();
		this.ngUnsub.complete();
	}

	sortingChanged(sortOrder: string) {
		switch (sortOrder) {
			case 'newest-first':
				this.orders = this.orders.sort((a, b) => Date.parse(b.createdDate) - Date.parse(a.createdDate));
				break;
			case 'oldest-first':
				this.orders = this.orders.sort((a, b) => Date.parse(a.createdDate) - Date.parse(b.createdDate));
				break;
			case 'status':
				this.orders = this.orders.sort((a, b) => a.status - b.status);
				break;
		}
	}

	getStatusBadgeClass(status: ClientOrderStatus): string {
		switch (status) {
			case ClientOrderStatus.Initiated: return 'badge-primary';
			case ClientOrderStatus.Pending: return 'badge-warning';
			case ClientOrderStatus.Completed: return 'badge-success';
			case ClientOrderStatus.Rejected: return 'badge-danger';
			default: return 'badge-dark'
		}
	}
}