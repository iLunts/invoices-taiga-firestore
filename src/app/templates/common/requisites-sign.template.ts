export const REQUISITES_SIGN_TABLE_TEMPLATE = `
<table style="width: 100%; border-width: 0; margin: 0;">
  <tbody>
    <tr>
      <td class="html-requisites-sign-border" style="width: 50%; border: 0; border-bottom: 1px solid #5b5b5b;">
        <p class="html-requisites-sign">Подпись / м.п.</p>
      </td>
      <td class="html-requisites-sign-border" style="width: 50%; border: 0; border-bottom: 1px solid #5b5b5b;">
        <p class="html-requisites-sign">Подпись / м.п. <span class="html-requisites-sign-bold">{{contractor.responsiblePerson.fullName}}</span></p>
      </td>
    </tr>
  </tbody>
</table>
`;
