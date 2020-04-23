import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from "@angular/core";
import {ClientListModel, ClientSearchResult} from "../../../shared/models/client-search-result";
import {ApiService} from "../../../shared/api.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs/Subject";
import {AccountVerificationStatus} from "../../../../shared/enums/account-verification-status";
import {EnumKeysPipe} from "../../../shared/pipes/enum-keys.pipe";
import {FormBuilder, FormGroup} from "@angular/forms";
import {KeyValueModel} from "../../../../shared/models/key-value-model";
import {ClientSortBy} from "../../../../shared/enums/client-sort-by";

@Component({
  selector: "app-clients-list",
  templateUrl: "./clients-list.component.html",
  styleUrls: ["./clients-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EnumKeysPipe]
})
export class ClientsListComponent implements OnInit, OnDestroy {

  clients: ClientListModel[];
  clientsCount: number;
  statuses: KeyValueModel[];
  perPageCounts: number[];
  form: FormGroup;
  sortByList: KeyValueModel[];

  private ngUnsub = new Subject();

  constructor(
    private api: ApiService,
    private cd: ChangeDetectorRef,
    private ekp: EnumKeysPipe,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.perPageCounts = [5, 10, 25];
    this.statuses = this.ekp.transform(AccountVerificationStatus);
    this.sortByList = this.ekp.transform(ClientSortBy);
    this.form = this.fb.group({
      "pageNumber": this.fb.control(1),
      "perPageCount": this.fb.control(this.perPageCounts[1]),
      "sortBy": this.fb.control(ClientSortBy.Newest),
      "filter": this.fb.group({
        "name": this.fb.control(""),
        "statuses": this.fb.control([])
      })
    }
    );
    this.findClients();
  }

  findClients() {
    this.api.post("client/get-clients", this.form.value)
      .pipe(takeUntil(this.ngUnsub))
      .subscribe(this.onSuccess.bind(this), err => alert(err));
  }

  getStatusClass(status: AccountVerificationStatus) {
    switch (status) {
      case AccountVerificationStatus.NotVerified:
        return "badge-secondary";
      case AccountVerificationStatus.Pending:
        return "badge-warning";
      case AccountVerificationStatus.RunningChecks:
        return "badge-info";
      case AccountVerificationStatus.UnderReview:
        return "badge-danger";
      case AccountVerificationStatus.Approved:
        return "badge-success";
      default:
        return "badge-dark";
    }
  }

  private onSuccess(result: ClientSearchResult) {
    this.clients = result.data;
    this.clientsCount = result.count;
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }
}
