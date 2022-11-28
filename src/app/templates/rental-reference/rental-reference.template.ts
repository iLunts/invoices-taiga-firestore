import { RENTAL_CERTIFICATE_HEADER_TEMPLATE } from './rental-reference-header.template';
import { RENTAL_CERTIFICATE_PRE_HEADER_TEMPLATE } from './rental-reference-pre-header.template';
import { REQUISITES_SIGN_TABLE_TEMPLATE } from '../common/requisites-sign.template';
import { REQUISITES_TABLE_TEMPLATE } from '../common/requisites.template';
import { SERVICES_RENTAL_CERTIFICATE_TABLE_TEMPLATE } from '../common/services-rental-certificate.template';

export const RENTAL_REFERENCE_TEMPLATE_ALL =
  RENTAL_CERTIFICATE_PRE_HEADER_TEMPLATE +
  RENTAL_CERTIFICATE_HEADER_TEMPLATE +
  SERVICES_RENTAL_CERTIFICATE_TABLE_TEMPLATE +
  REQUISITES_TABLE_TEMPLATE +
  REQUISITES_SIGN_TABLE_TEMPLATE;
