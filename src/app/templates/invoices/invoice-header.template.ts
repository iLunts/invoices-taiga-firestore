// <p>
//   <img src="{{headerImage}}" style="display: block;"/>
// </p>

export const INVOICE_TEMPLATE_HEADER = `
<table style="width: 100%; border-width: 0">
  <tbody>
    <tr>
      <td style="width: 15%; border: 0"></td>
      <td style="width: 70%; border: 0">
      <p class="html-title">
        Счет-фактура №{{documentNumber number}} от \"{{formatDate createDate "DD"}}\" {{formatDate createDate "MMMM"}} {{formatDate createDate "YYYY"}}
        <br />
        <br />
        <span class="html-subtitle">
          Счет действителен до: {{formatDate expiredDate "DD.MM.YYYY"}}
        </span>
      </p>
      </td>
      <td style="width: 15%; border: 0">
        <img src="{{qrCode}}" style="display: inline-block; vertical-align: middle; width: 90px; margin-left: 15px;"/>
      </td>
    </tr>
  </tbody>
</table>
<p class="html-text">
  {{contractor.info.fullName}} в лице {{contractor.responsiblePerson.type}} {{contractor.responsiblePerson.fullName}} действующего на основании {{contractor.responsiblePerson.basis}}, просим Вас выделить строительную технику для работы на объекте.
  <br />
  В зоне проведения работ ЛЭП и подземные коммуникации отсутствуют. (Если имеются, то представить разрешение на проведение данных работ и ответственный за производство работ в данной зоне).
  <br />
  Сохранность техники гарантируем.
  <br />
  Своевременную оплату гарантируем.
</p>`;
