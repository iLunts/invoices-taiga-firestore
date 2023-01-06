// import { Injectable } from '@angular/core';

// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// import * as htmlToPdfmake from 'html-to-pdfmake';

// // import pdfMake from 'pdfmake/build/pdfmake';
// // import pdfFonts from 'pdfmake/build/vfs_fonts';
// // import htmlToPdfmake from 'html-to-pdfmake';

// // import * as Handlebars from 'handlebars/dist/cjs/handlebars';
// import * as Handlebars from 'handlebars/dist/cjs/handlebars';
// import * as moment from 'moment';
// // pdfMake.vfs = pdfFonts.pdfMake.vfs;

// import { Invoice } from '../models/invoice.model';
// import { INVOICE_TEMPLATE_ALL } from '../templates/invoices/invoice.template';
// import { ACT_TEMPLATE_ALL } from '../templates/act/act.template';
// import { DOC_DEFININITION_STYLE } from '../templates/defenition.style';
// import { RENTAL_REFERENCE_TEMPLATE_ALL } from '../templates/rental-reference/rental-reference.template';

// @Injectable({
//   providedIn: 'root',
// })
// export class TemplatePdfService {
//   pdfObj = null;

//   constructor() {}

//   downloadPdf(type: string, data: any): void {
//     switch (type) {
//       case 'invoice': {
//         this.createInvoicePdf(data);
//         break;
//       }
//       case 'invoice-protocol': {
//         this.createInvoicePdf(data);
//         break;
//       }
//       case 'contract': {
//         this.createContractPdf(data);
//         break;
//       }
//       case 'act': {
//         this.createActPdf(data);
//         break;
//       }
//       case 'rental-certificate': {
//         this.createRentalCertificatePdf(data);
//         break;
//       }
//     }

//     this.pdfObj.download(
//       `${type}-#${data.number || 'б.н.'}-${data.date}-${
//         data.contractor.info.name
//       }.pdf`
//     );
//   }

//   createContractPdf(data?: any): void {
//     Handlebars.registerHelper('formatDate', (datetime: any, format: any) => {
//       if (moment) {
//         // can use other formats like 'lll' too
//         format = format || 'DD.MM.YYYY';
//         moment.locale('ru');
//         return moment(datetime).format(format);
//       } else {
//         return datetime;
//       }
//     });

//     // Default styles obj
//     let defaultStyle: {
//       fontSize: 12;
//       bold: false;
//       margin: [0, 0, 0, 0];
//     };

//     let template = Handlebars.compile(data.template);
//     let html = template(data, {
//       tableAutoSize: true,
//       //   defaultStyle: defaultStyle,
//     });
//     // let result = htmlToPdfmake(html);
//     let result = htmlToPdfmake(html, {
//       tableAutoSize: true,
//       //   defaultStyle: defaultStyle,
//     });

//     let docDefinition = {
//       pageSize: 'A4',
//       pageOrientation: 'portrait',
//       pageMargins: [40, 20, 40, 20],
//       content: [result],
//       styles: DOC_DEFININITION_STYLE,
//     };

//     this.pdfObj = pdfMake.createPdf(docDefinition);
//   }

//   createInvoicePdf(data?: Invoice): void {
//     const sumToWord = this.sum_letters(data?.total.totalSum.amount);
//     // Date format
//     Handlebars.registerHelper('formatDate', (datetime: any, format: any) => {
//       if (moment) {
//         // can use other formats like 'lll' too
//         format = format || 'DD.MM.YYYY';
//         moment.locale('ru');
//         return moment(datetime).format(format);
//       } else {
//         return datetime;
//       }
//     });

//     // Document number
//     Handlebars.registerHelper('documentNumber', (number: number) => {
//       if (number) {
//         return number;
//       } else {
//         return 'б.н.';
//       }
//     });

//     // Get summa
//     Handlebars.registerHelper('getSum', (count: any, price: any) => {
//       if (!count || !price) {
//         return 'NaN';
//       } else {
//         return count * price;
//       }
//     });

//     // Get index
//     Handlebars.registerHelper('getIndex', (index: number) => {
//       if (index == null || index == undefined) {
//         return '0';
//       } else {
//         return index + 1;
//       }
//     });

//     // Get total SUM to word
//     Handlebars.registerHelper('getTotalSum', () => {
//       return sumToWord;
//     });

//     // Get total SUM to digs RUB and COP
//     Handlebars.registerHelper('getTotalSumDigs', () => {
//       let sum = Number(data?.total.totalSum.amount).toFixed(2).split('.');
//       return sum[0] + ' руб. ' + sum[1] + ' коп.';
//     });

//     // Get count services
//     Handlebars.registerHelper('getCountService', () => {
//       if (data?.services) {
//         return Object.keys(data.services).length;
//       } else {
//         return 0;
//       }
//     });

//     // Default styles obj
//     let defaultStyle: {
//       fontSize: 12;
//       bold: false;
//       margin: [0, 0, 0, 0];
//     };

//     let template = Handlebars.compile(INVOICE_TEMPLATE_ALL);
//     let html = template(data, {
//       tableAutoSize: true,
//       //   defaultStyle: defaultStyle,
//     });
//     let result = htmlToPdfmake(html, {
//       tableAutoSize: true,
//       //   defaultStyle: defaultStyle,
//     });

//     let docDefinition = {
//       content: [result],
//       styles: DOC_DEFININITION_STYLE,
//     };

//     this.pdfObj = pdfMake.createPdf(docDefinition);
//   }

//   createActPdf(data: Invoice): void {
//     const sumToWord = this.sum_letters(data.total.totalSum.amount);
//     // Date format
//     Handlebars.registerHelper('formatDate', (datetime: any, format: any) => {
//       if (moment) {
//         // can use other formats like 'lll' too
//         format = format || 'DD.MM.YYYY';
//         moment.locale('ru');
//         return moment(datetime).format(format);
//       } else {
//         return datetime;
//       }
//     });

//     // Invoice number
//     Handlebars.registerHelper('documentNumber', (number: number) => {
//       if (number) {
//         return number;
//       } else {
//         return 'б.н.';
//       }
//     });

//     // Get summa
//     Handlebars.registerHelper('getSum', (count: any, price: any) => {
//       if (!count || !price) {
//         return 'NaN';
//       } else {
//         return count * price;
//       }
//     });

//     // Get index
//     Handlebars.registerHelper('getIndex', (index: number) => {
//       if (index == null || index == undefined) {
//         return '0';
//       } else {
//         return index + 1;
//       }
//     });

//     // Get total SUM to word
//     Handlebars.registerHelper('getTotalSum', () => {
//       return sumToWord;
//     });

//     // Get total SUM to digs RUB and COP
//     Handlebars.registerHelper('getTotalSumDigs', () => {
//       let sum = Number(data.total.totalSum.amount).toFixed(2).split('.');
//       return sum[0] + ' руб. ' + sum[1] + ' коп.';
//     });

//     // Get count services
//     Handlebars.registerHelper('getCountService', () => {
//       if (data.services) {
//         return Object.keys(data.services).length;
//       } else {
//         return 0;
//       }
//     });

//     // Default styles obj
//     let defaultStyle: {
//       fontSize: 12;
//       bold: false;
//       margin: [0, 0, 0, 0];
//     };

//     let template = Handlebars.compile(ACT_TEMPLATE_ALL);
//     let html = template(data, {
//       tableAutoSize: true,
//       //   defaultStyle: defaultStyle,
//     });
//     let result = htmlToPdfmake(html, {
//       tableAutoSize: true,
//       //   defaultStyle: defaultStyle,
//     });

//     let docDefinition = {
//       content: [result],
//       styles: DOC_DEFININITION_STYLE,
//     };

//     this.pdfObj = pdfMake.createPdf(docDefinition);
//   }

//   createRentalCertificatePdf(data?: Invoice): void {
//     const sumToWord = this.sum_letters(data?.total.totalSum.amount);

//     // Date format
//     Handlebars.registerHelper('formatDate', (datetime: any, format: any) => {
//       if (moment) {
//         format = format || 'DD.MM.YYYY';
//         moment.locale('ru');
//         return moment(datetime).format(format);
//       } else {
//         return datetime;
//       }
//     });

//     // Document number
//     Handlebars.registerHelper('documentNumber', (number: number) => {
//       if (number) {
//         return number;
//       } else {
//         return 'б.н.';
//       }
//     });

//     // Document datesRange
//     Handlebars.registerHelper(
//       'datesRange',
//       (dates: Date[], format = 'DD MMM YYYY') => {
//         moment.locale('ru');
//         return dates.length > 1
//           ? 'c ' +
//               moment(dates[0]).format(format) +
//               ' по ' +
//               moment(dates[1]).format(format) +
//               ' г.'
//           : 'за ' + moment(dates[0]).format(format) + ' г.';
//       }
//     );

//     // Get summa
//     Handlebars.registerHelper('getSum', (count: any, price: any) => {
//       if (!count || !price) {
//         return 'NaN';
//       } else {
//         return count * price;
//       }
//     });

//     // Get index
//     Handlebars.registerHelper('getIndex', (index: number) => {
//       if (index == null || index == undefined) {
//         return '0';
//       } else {
//         return index + 1;
//       }
//     });

//     // Get total SUM to word
//     Handlebars.registerHelper('getTotalSum', () => {
//       return sumToWord;
//     });

//     // Get total SUM to digs RUB and COP
//     Handlebars.registerHelper('getTotalSumDigs', () => {
//       let sum = Number(data?.total.totalSum.amount).toFixed(2).split('.');
//       return sum[0] + ' руб. ' + sum[1] + ' коп.';
//     });

//     // Get count services
//     Handlebars.registerHelper('getCountService', () => {
//       if (data?.services) {
//         return Object.keys(data.services).length;
//       } else {
//         return 0;
//       }
//     });

//     // Default styles obj
//     let defaultStyle: {
//       fontSize: 12;
//       bold: false;
//       margin: [0, 0, 0, 0];
//     };

//     let template = Handlebars.compile(RENTAL_REFERENCE_TEMPLATE_ALL);
//     let html = template(data, {
//       tableAutoSize: true,
//       //   defaultStyle: defaultStyle,
//     });
//     let result = htmlToPdfmake(html, {
//       tableAutoSize: true,
//       //   defaultStyle: defaultStyle,
//     });

//     let docDefinition = {
//       content: [result],
//       styles: DOC_DEFININITION_STYLE,
//     };

//     this.pdfObj = pdfMake.createPdf(docDefinition);
//   }

//   num_letters(k: any, d?: any): any {
//     // целое число прописью, это основа
//     k = k.toString();
//     var i = '',
//       e = [
//         [
//           '',
//           'тысяч',
//           'миллион',
//           'миллиард',
//           'триллион',
//           'квадриллион',
//           'квинтиллион',
//           'секстиллион',
//           'септиллион',
//           'октиллион',
//           'нониллион',
//           'дециллион',
//         ],
//         ['а', 'и', ''],
//         ['', 'а', 'ов'],
//       ];
//     if (k == '' || k == '0') return ' ноль'; // 0
//     k = k.split(/(?=(?:\d{3})+$)/); // разбить число в массив с трёхзначными числами
//     if (k[0].length == 1) k[0] = '00' + k[0];
//     if (k[0].length == 2) k[0] = '0' + k[0];
//     for (var j = k.length - 1; j >= 0; j--) {
//       // соединить трёхзначные числа в одно число, добавив названия разрядов с окончаниями
//       if (k[j] != '000') {
//         i =
//           (((d && j == k.length - 1) || j == k.length - 2) &&
//           (k[j][2] == '1' || k[j][2] == '2')
//             ? this.transformDigs(k[j], 1)
//             : this.transformDigs(k[j])) +
//           this.declOfNum(
//             k[j],
//             e[0][k.length - 1 - j],
//             j == k.length - 2 ? e[1] : e[2]
//           ) +
//           i;
//       }
//     }
//     return i;
//   }

//   transformDigs(k: any, d?: any): any {
//     // преобразовать трёхзначные числа
//     var e = [
//       [
//         '',
//         ' один',
//         ' два',
//         ' три',
//         ' четыре',
//         ' пять',
//         ' шесть',
//         ' семь',
//         ' восемь',
//         ' девять',
//       ],
//       [
//         ' десять',
//         ' одиннадцать',
//         ' двенадцать',
//         ' тринадцать',
//         ' четырнадцать',
//         ' пятнадцать',
//         ' шестнадцать',
//         ' семнадцать',
//         ' восемнадцать',
//         ' девятнадцать',
//       ],
//       [
//         '',
//         '',
//         ' двадцать',
//         ' тридцать',
//         ' сорок',
//         ' пятьдесят',
//         ' шестьдесят',
//         ' семьдесят',
//         ' восемьдесят',
//         ' девяносто',
//       ],
//       [
//         '',
//         ' сто',
//         ' двести',
//         ' триста',
//         ' четыреста',
//         ' пятьсот',
//         ' шестьсот',
//         ' семьсот',
//         ' восемьсот',
//         ' девятьсот',
//       ],
//       ['', ' одна', ' две'],
//     ];
//     return (
//       e[3][k[0]] +
//       (k[1] == 1 ? e[1][k[2]] : e[2][k[1]] + (d ? e[4][k[2]] : e[0][k[2]]))
//     );
//   }

//   declOfNum(n: any, t: any, o: any): any {
//     // склонение именительных рядом с числительным: число (typeof = string), корень (не пустой), окончание
//     var k = [2, 0, 1, 1, 1, 2, 2, 2, 2, 2];
//     return t == ''
//       ? ''
//       : ' ' + t + (n[n.length - 2] == '1' ? o[2] : o[k[n[n.length - 1]]]);
//   }

//   razUp(e: any): any {
//     // сделать первую букву заглавной и убрать лишний первый пробел
//     return e[1].toUpperCase() + e.substring(2);
//   }

//   sum_letters(a: any): any {
//     a = Number(a).toFixed(2).split('.'); // округлить до сотых и сделать массив двух чисел: до точки и после неё
//     return this.razUp(
//       this.num_letters(a[0]) +
//         this.declOfNum(a[0], 'рубл', ['ь', 'я', 'ей']) +
//         ' ' +
//         a[1] +
//         this.declOfNum(a[1], 'копе', ['йка', 'йки', 'ек'])
//     );
//   }
// }
