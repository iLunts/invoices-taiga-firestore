import { INVOICE_TEMPLATE_HEADER } from './invoice-header.template';
import { REQUISITES_SIGN_TABLE_TEMPLATE } from '../common/requisites-sign.template';
import { REQUISITES_TABLE_TEMPLATE } from '../common/requisites.template';
import { SERVICES_TEMPLATE_TABLE } from '../common/services.template';

export const INVOICE_TEMPLATE_ALL =
  INVOICE_TEMPLATE_HEADER +
  SERVICES_TEMPLATE_TABLE +
  REQUISITES_TABLE_TEMPLATE +
  REQUISITES_SIGN_TABLE_TEMPLATE;
