import {Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy} from "@angular/core";
import {FileMetadataModel} from "../../../../shared/models/file-metadata-model";
import {ElementsApiService} from "../../../../../common/services/elements-api.service";
import {Subject} from "rxjs/Subject";
import {takeUntil} from "rxjs/operators";
import {saveAs} from "file-saver/FileSaver";

@Component({
  selector: "app-attachment",
  templateUrl: "./attachment.component.html",
  styleUrls: ["./attachment.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttachmentComponent implements OnInit, OnDestroy {

  @Input() model: FileMetadataModel;
  private ngUnsub = new Subject();

  constructor(private api: ElementsApiService) { }

  ngOnInit() {
  }

  getFile() {
    const opts = {
      params: this.model,
      responseType: "blob"
    };
    this.api.get("file-storage/get-file", opts)
      .pipe(takeUntil(this.ngUnsub))
      .subscribe(x => this.downloadFile(x), err => alert(err));
  }

  getFileSizeInKb(): number {
    return Math.ceil(this.model.size / 1024);
  }

  ngOnDestroy(): void {
    this.ngUnsub.next();
    this.ngUnsub.complete();
  }

  private downloadFile(data: Response) {
    const blob = new Blob([data], { type: this.model.contentType });
    saveAs(blob, this.model.key);
  }
}
