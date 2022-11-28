export const SERVICES_RENTAL_CERTIFICATE_TABLE_TEMPLATE = `
<table style="width: 100%; margin: 40px 0; vertical-align: middle;">
  <thead>
    <tr>
      <th style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA;">Дата</th>
      <th style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA; text-align: left;">Наименование товара</th>
      <th style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA;">Ед. изм.</th>
      <th style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA;">Кол-во</th>
      <th style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA;">Цена</th>
      <th style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA;">НДС</th>
      <th class="table-header-sum" style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA; width: 20%;">Сумма</th>
    </tr>
  </thead>
  <tbody>
    {{#each services}}
    <tr style="vertical-align: middle; border-bottom: 1px solid #333;">
      <td class="table-cell table-cell-regular" style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA;">{{formatDate this.date "DD.MM.YYYY"}}</td>
      <td class="table-cell table-cell-regular" style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA;">{{this.name.name}}</td>
      <td class="table-cell table-cell-regular table-cell-center" style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA;">{{this.unit.shortName}}</td>
      <td class="table-cell table-cell-regular table-cell-center" style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA;">{{this.count.amount}}</td>
      <td class="table-cell table-cell-regular table-cell-center" style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA;">{{this.price.amount}}</td>
      <td class="table-cell table-cell-regular table-cell-center" style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA;">{{this.tax.label}}</td>
      <td class="table-cell table-cell-sum" style="border: none; padding: 5px 15px; margin: 4px 10px; border-bottom: 1px solid #F5F6FA;">{{this.totalSum.amount}}</td>
    </tr>
    {{/each}}
    <tr>
      <td colspan="5" class="table-footer-cell-label" valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; line-height: 1.4; font-size: 13px;">Итого:</td>
      <td colspan="2" class="table-footer-cell-sum" valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; line-height: 1.4; font-size: 13px;">{{getTotalSumDigs}}</td>
    </tr>
    <tr>
      <td colspan="5" class="table-footer-cell-label" valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; line-height: 1.4; font-size: 13px;">Всего НДС:</td>
      <td colspan="2" class="table-footer-cell-sum" valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; line-height: 1.4; font-size: 13px;">Без НДС</td>
    </tr>
    <tr>
      <td colspan="5" class="table-footer-cell-label" valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; line-height: 1.4; font-size: 13px;">Всего к оплате с НДС:</td>
      <td colspan="2" class="table-footer-cell-sum" valign="middle" style="vertical-align: middle; border: none; padding: 5px 15px; margin: 4px 10px; line-height: 1.4; font-size: 13px;">{{getTotalSumDigs}}</td>
    </tr>
  </tbody>
</table>
`;
