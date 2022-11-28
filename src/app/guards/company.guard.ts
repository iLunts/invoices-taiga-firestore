import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { CompanyService } from '../services/company.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyGuard implements CanActivate {
  routing = environment.routing;

  constructor(private companyService: CompanyService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const status = this.companyService.getCompanyFromLocalStorage();

    // TODO: Need added checker for valid Company
    if (!status) {
      this.router.navigate([this.routing.admin.settings.company], {
        queryParams: { cannotBeEmpty: true },
      });
      return false;
    } else {
      return true;
    }
  }
}
