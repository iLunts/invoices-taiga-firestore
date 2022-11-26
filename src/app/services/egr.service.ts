import { forkJoin, from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Company, CompanyInfo, CompanyAddress } from '../models/company.model';
import { CompanyStorageService } from './company-storage.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class EgrService {
  constructor(
    private _http: HttpClient,
    private notificationService: NotificationService,
    // private companyService: CompanyService,
    private companyStorageService: CompanyStorageService
  ) {}

  getBaseInfoByRegNum$(UNP: string): Observable<any> {
    return from(
      this._http.get(
        `https://solidexcrm.com/api/v2/egr/getBaseInfoByRegNum/${UNP}`
      )
    );
  }

  getAddressByRegNum$(UNP: string): Observable<any> {
    return from(
      this._http.get(
        `https://solidexcrm.com/api/v2/egr/getAddressByRegNum/${UNP}`
      )
    );
  }

  getJurNamesByRegNum$(UNP: string): Observable<any> {
    return from(
      this._http.get(
        `https://solidexcrm.com/api/v2/egr/getJurNamesByRegNum/${UNP}`
      )
    );
  }

  getVEDByRegNum$(UNP: string): Observable<any> {
    return from(
      this._http.get(`https://solidexcrm.com/api/v2/egr/getVEDByRegNum/${UNP}`)
    );
  }

  getIPFIOByRegNum$(UNP: string): Observable<any> {
    return from(
      this._http.get(
        `https://solidexcrm.com/api/v2/egr/getIPFIOByRegNum/${UNP}`
      )
    );
  }

  getAllByUnp$(UNP: string): Observable<Company> {
    return forkJoin([
      this.getBaseInfoByRegNum$(UNP),
      this.getAddressByRegNum$(UNP),
      this.getJurNamesByRegNum$(UNP),
      this.getVEDByRegNum$(UNP),
      this.getIPFIOByRegNum$(UNP),
    ]).pipe(
      map(
        ([
          getBaseInfoByRegNum,
          getAddressByRegNum,
          getJurNamesByRegNum,
          getVEDByRegNum,
          getIPFIOByRegNum,
        ]) =>
          this.mappingCompany(
            getBaseInfoByRegNum,
            getAddressByRegNum,
            getJurNamesByRegNum,
            getVEDByRegNum,
            getIPFIOByRegNum,
            UNP
          )
      )
    );
  }

  private mappingJurAddress(data: any): CompanyAddress {
    let juridicalAddress = new CompanyAddress();

    juridicalAddress.city = data.vnp;
    juridicalAddress.cityType = data.nsi00239?.vntnpk;
    juridicalAddress.country = data.nsi00201?.vnstranp;
    juridicalAddress.houseNumber = data.vdom;
    juridicalAddress.office = data.vpom;
    juridicalAddress.officeType = data.nsi00227?.vntpomk || null;
    juridicalAddress.street = data.vulitsa;
    juridicalAddress.streetType = data.nsi00226?.vntulk;
    juridicalAddress.zipCode = data.nindex;
    juridicalAddress.phone =
      data.vtels?.replace(/\s/g, '').replace('-', '') || null;
    juridicalAddress.email = data.vemail;
    juridicalAddress.fax = data.vfax;
    juridicalAddress.vnsfull = data.nsi00202?.vnsfull;

    return juridicalAddress;
  }

  private mappingJurNames(data: any): CompanyInfo {
    let info = new CompanyInfo();

    info.fullName = data.vnaim;
    info.shortName = data.vn;
    info.name = data.vfn;

    info.fullNameBel = data.vnaimb;
    info.shortNameBel = data.vnb;
    info.nameBel = data.vfnb;

    info.registrationDate = data.dcrta;

    return info;
  }

  private mappingIPFIOByRegNum(data: any): CompanyInfo {
    let info = new CompanyInfo();

    info.fullName = 'Индивидуальный предприниматель ' + data.vfio;
    info.shortName = 'ИП ' + data.vfio;
    info.name = 'ИП ' + data.vfio;

    info.fullNameBel = 'Iндывідуальны прадпрымальнік ' + data.vfio;
    info.shortNameBel = 'IП ' + data.vfio;
    info.nameBel = 'IП ' + data.vfio;

    info.registrationDate = data.dcrta;
    info.unp = data.ngrn;

    return info;
  }

  private mappingCompany(
    getBaseInfoByRegNum: any,
    getAddressByRegNum: string,
    getJurNamesByRegNum: string,
    getVEDByRegNum: any,
    getIPFIOByRegNum: string,
    UNP: string
  ): Company {
    if (
      [
        getBaseInfoByRegNum,
        getAddressByRegNum,
        getJurNamesByRegNum,
        getVEDByRegNum,
        getIPFIOByRegNum,
      ].every((element) => element === null)
    ) {
      this.notificationService.warning(
        'Введенный вами УНП не был найден в базе ЕГР и скорее всего является ошибочным. Пожалуйста, проверьте правильность ввода всех данных'
      );
      return null!;
    }

    let company: Company = new Company();
    let baseInfoByRegNum = getBaseInfoByRegNum;
    let addressByRegNum = getAddressByRegNum;
    let jurNamesByRegNum = getJurNamesByRegNum;
    let VEDByRegNum = getVEDByRegNum;
    let IPFIOByRegNum = getIPFIOByRegNum;

    company._type = baseInfoByRegNum[0].nsi00211.nkvob;

    // 1 - Юр. лицо ; 2 - ИП
    if (company._type === 1) {
      company.info = this.mappingJurNames(jurNamesByRegNum[0]);
      company.juridicalAddress = this.mappingJurAddress(addressByRegNum[0]);
    } else {
      company.info = this.mappingIPFIOByRegNum(IPFIOByRegNum[0]);
    }

    company.ved = VEDByRegNum[0];
    company.info.unp = UNP;

    // const prevCompany = this.companyStorageService.getCompanyValue();
    // const prevCompany = this.companyService.getCompany();
    // company.bankAccount = prevCompany.bankAccount;
    // company.mailingAddress = prevCompany.mailingAddress;
    // company.responsiblePerson = prevCompany.responsiblePerson;
    // company.contacts = prevCompany.contacts;

    return company;
  }
}
