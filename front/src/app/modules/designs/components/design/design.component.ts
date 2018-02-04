import { Component, OnInit } from '@angular/core';

import { DesignsService } from 'app/services/designs/designs.service';
import { IGetDesignsRequest, IGetDesignsResponse } from 'app/services/designs/IDesignsService';


@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css'],
  providers: [ DesignsService ]
})
export class DesignComponent implements OnInit {

  public designs: any[] = [];
  constructor(private _designsS: DesignsService) {
      this._designsS.GetDesignsReceived.add(this._designsReceived);

   }

  ngOnInit() {
      let request: IGetDesignsRequest = { categoriesId : [2] };
      this._designsS.GetDesigns(request);
  }

  private _designsReceived(reponse: IGetDesignsResponse) {
    this.designs = reponse.designs;
  }
}
