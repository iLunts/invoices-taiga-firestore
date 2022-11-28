export const RENTAL_CERTIFICATE_PRE_HEADER_TEMPLATE = `
<table style="width: 100%; border-width: 0">
  <tbody>
    <tr>
      <td class="html-pre-header" style="border: 0">
        Арендатор
      </td>
      <td class="html-pre-header" style="width: 37%; border: 0">
        <span class="html-text-underline html-text-bold">
          {{contractor.info.shortName}}
        </span>
        <br />
        Наименование организации
      </td>
      <td class="html-pre-header" style="border: 0">
        УНП
      </td>
      <td class="html-pre-header" style="border: 0">
        <span class="html-text-underline html-text-bold">
          {{contractor.info.unp}}
        </span>
      </td>
      <td class="html-pre-header" style="width: 10%; border: 0">
        Форма по ОКУД по ОКЮЛП
      </td>
      <td class="html-pre-header" style="width: 10%; border: 0" rowspan="2">
        <table>
          <tr>
            <td>
              <span class="html-text-bold">
                Коды
              </span>
            </td>
          </tr>
          <tr>
            <td>
              0501030
            </td>
          </tr>
          <tr>
            <td>
              ...
            </td>
          </tr>
        </table>
      </td>
      <td class="html-pre-header" style="width: 15%; border: 0" rowspan="2">
        <span class="html-text-mini html-text-align-right">
          Приложение 12
          <br/>
          К постановлению
          <br/>
          Министерства архитектуры
          <br/>
          И строительства
          <br/>
          Республика Беларусь
          <br/>
          11.04.2005г. №13
          <br/>
          Форма С-12
        </span>
      </td>
    </tr>
    <tr>
      <td class="html-pre-header" style="border: 0">
        Арендодатель
      </td>
      <td class="html-pre-header" style="border: 0">
        <span class="html-text-underline html-text-bold">
          {{profileCompany.info.shortName}}
        </span>
        <br />
        Наименование организации
      </td>
      <td class="html-pre-header" style="border: 0">
        УНП
      </td>
      <td class="html-pre-header" style="border: 0">
        <span class="html-text-underline html-text-bold">
          {{profileCompany.info.unp}}
        </span>
      </td>
      <td class="html-pre-header" style="border: 0"></td>
    </tr>
  </tbody>
</table>`;
