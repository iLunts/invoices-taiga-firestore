export const REQUISITES_TABLE_TEMPLATE = `
<table style="width: 100%; border-width: 0">
  <tbody>
    <tr>
      <td style="width: 50%; border: 0">
        <p class="html-requisites-title">
          Арендодатель
        </p>
        <p class="html-requisites">
          {{profileCompany.info.fullName}}
          <br />
          УНП: {{profileCompany.info.unp}}
          <br />
          Юр. адрес: {{profileCompany.juridicalAddress.zipCode}}&nbsp;
          {{profileCompany.juridicalAddress.country}}&nbsp;
          г. {{profileCompany.juridicalAddress.city}}&nbsp;
          ул. {{profileCompany.juridicalAddress.street}}&nbsp;
          д.{{profileCompany.juridicalAddress.houseNumber}}&nbsp;
          оф.{{profileCompany.juridicalAddress.office}}&nbsp;
          <br />
          {{profileCompany.bankAccount.bank.typ}}: {{profileCompany.bankAccount.bank.NmBankShort}}
          <br />
          Р/сч.: {{profileCompany.bankAccount.SWIFT}}
          <br />
          БИК: {{profileCompany.bankAccount.bank.CDBank}}
        </p>
      </td>
      <td style="width: 50%; border: 0">
        <p class="html-requisites-title">
          Арендатор
        </p>
        <p class="html-requisites">
          {{contractor.info.fullName}}
          <br />
          УНП: {{contractor.info.unp}}
          <br />
          Юр. адрес: {{contractor.juridicalAddress.zipCode}}&nbsp;
          {{contractor.juridicalAddress.country}}&nbsp;
          г. {{contractor.juridicalAddress.city}}&nbsp;
          ул. {{contractor.juridicalAddress.street}}&nbsp;
          д.{{contractor.juridicalAddress.houseNumber}}&nbsp;
          оф.{{contractor.juridicalAddress.office}}&nbsp;
          <br />
          {{contractor.bankAccount.bank.typ}}: {{contractor.bankAccount.bank.NmBankShort}}
          <br />
          Р/сч.: {{contractor.bankAccount.SWIFT}}
          <br />
          БИК: {{contractor.bankAccount.bank.CDBank}}
        </p>
      </td>
    </tr>
  </tbody>
</table>
`;
