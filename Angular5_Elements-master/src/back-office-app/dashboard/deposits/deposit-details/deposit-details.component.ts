import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientBankOrder } from '../../../shared/models/client-bank-order-model';
import { Subject } from 'rxjs/Subject';
import { ApiService } from '../../../shared/api.service';
import { OrderModel } from '../../../../common/models/order.model';
import { takeUntil } from 'rxjs/operators';
import { ClientOrderStatus } from '../../../../common/enums/client-order-status';

@Component({
	templateUrl: './deposit-details.component.html'
})
export class DepositDetailsComponent implements OnInit, OnDestroy {
	ClientOrderStatus = ClientOrderStatus;

	order: ClientBankOrder;
	private ngUnsub = new Subject();
	
	constructor(
		private route: ActivatedRoute,
		private apiService: ApiService
	) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			let depositId = params['depositId'];
			this.fetchOrder(depositId);
		});
	}

	ngOnDestroy(): void {
		this.ngUnsub.next();
		this.ngUnsub.complete();
	}

	get statusBadgeClass(): string {
		switch(this.order.status){
			case ClientOrderStatus.Initiated: return 'badge-primary';
			case ClientOrderStatus.Pending: return 'badge-warning';
			case ClientOrderStatus.Completed: return 'badge-success';
			case ClientOrderStatus.Rejected: return 'badge-danger';
			default: return 'badge-dark'
		}
	}

	private fetchOrder(orderId: string) {
		this.apiService.get('fiat/client-bank-order-by-id/' + orderId)
			.pipe(takeUntil(this.ngUnsub))
			.subscribe(result => this.order = result);
	}
}