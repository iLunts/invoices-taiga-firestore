export const CONTRACT_HEADER_TEMPLATE = `
<table style="width: 100%; border-width: 0">
  <tbody>
    <tr>
      <td style="width: 25%; border: 0"></td>
      <td style="width: 50%; border: 0">
        <p class="html-title">
          ДОГОВОР № б/н
          <br />
          на аренду строительной техники
        </p>
      </td>
      <td style="width: 25%; border: 0">
        <p class="html-date">
            {{formatDate date "DD MMMM YYYY"}} г.
        </p>
      </td>
    </tr>
  </tbody>
</table>
`;
