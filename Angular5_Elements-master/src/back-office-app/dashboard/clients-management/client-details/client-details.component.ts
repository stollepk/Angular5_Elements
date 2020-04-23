import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {ElementsApiService} from "../../../../common/services/elements-api.service";
import {CountryService} from "../../../../common/services/country.service";
import {Country} from "../../../../common/models/country";
import {takeUntil} from "rxjs/operators";
import {ClientDetailsModel} from "../../../shared/models/client-details-model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: "app-client-details",
  templateUrl: "./client-details.component.html",
  styleUrls: ["./client-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientDetailsComponent implements OnInit, OnDestroy {

  client: ClientDetailsModel;

  private ngUnsub = new Subject();
  private countries: Country[];

  constructor(
    private api: ElementsApiService,
    private countryService: CountryService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.countryService.getCountries()
      .pipe(takeUntil(this.ngUnsub))
      .subscribe(x => this.countries = x);
    this.api.get(`client/get-client-details?id=${this.route.snapshot.params["id"]}`)
      .pipe(takeUntil(this.ngUnsub))
      .subscribe(x => { this.client = x; this.cd.detectChanges(); }, err => alert(err));
  }

  getCountryNameById(id: number): string {
    const result = this.countries.find(x => x.id === id);
    if (result) {
      return result.countryName;
    }
    return null;
  }

  approve() {
    this.api.post(`client/approve-client/${this.client.id}`, null)
      .pipe(takeUntil(this.ngUnsub))
      .subscribe(() => alert("Approved!"), err => alert(err));
  }

  ngOnDestroy(): void {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }

}
