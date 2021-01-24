import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { IDate } from '../../../lib/config/date';

const Lserv: (props: { logs: IDate[]; title: string }) => JSX.Element = ({
  logs,
  title,
}) => {
  const preview = React.useRef<HTMLIFrameElement>(
    document.createElement('iframe')
  );
  console.log({ logs });
  React.useEffect(() => {
    const styles: {
      [key: string]: string | number | object;
    } = {
      valign: 'center',
      halign: 'center',
      fontSize: 6,
      lineWidth: 0.1,
      lineColor: 0,
      cellPadding: 0,
      minCellHeight: 6,
      cellWidth: 'wrap',
    };

    const fillUpStyles = {
      ...styles,
      cellWidth: 13,
      // cellPadding: { top: 0, right: 1, bottom: 0, left: 1 },
    };

    const head = [
      [
        { content: 'DAY', rowSpan: 2, styles },
        {
          content: 'TIME IN',
          rowSpan: 2,
          styles: { ...styles, cellWidth: 18 },
        },
        {
          content: 'BREAK OUT',
          rowSpan: 2,
          styles: {
            ...styles,
            cellWidth: 18,
          },
        },
        { content: 'BREAK IN', rowSpan: 2, styles },
        {
          content: 'TIME OUT',
          rowSpan: 2,
          styles: { ...styles, cellWidth: 18 },
        },
        { content: 'OVERTIME', colSpan: 2, styles },
        {
          content: 'REMARKS',
          rowSpan: 2,
          styles: {
            ...styles,
            cellWidth: 40,
          },
        },
        {
          content: ' ',
          rowSpan: 2,
          styles: { ...styles, cellWidth: 4, lineColor: [255, 255, 255] },
        },
        { content: 'TOTAL OVERTIME', rowSpan: 2, styles: fillUpStyles },
        { content: 'Absences', rowSpan: 2, styles: fillUpStyles },
        { content: 'Late/ Undertime', rowSpan: 2, styles: fillUpStyles },
      ],
      [
        { content: 'TIME IN', styles },
        { content: 'TIME OUT', styles },
      ],
    ];

    const body = logs.map((i) => {
      const login = i.login.map((i, index) => {
        console.log({ i, index });
        return i;
      });
      const logout = i.logout.map((i) => i);
      // const login = ['1'];
      // const logout = ['1'];
      const logStyles = (logArray: { length: number }) => ({
        ...styles,
        fontSize: logArray.length ? 4 + 4 / logArray.length : 7,
        valign: logArray.length > 1 ? 'top' : 'center',
        halign: logArray.length > 2 ? 'left' : 'center',
        cellPadding: {
          left: logArray.length > 2 && 1,
          top: logArray.length > 1 && 1,
        },
      });

      return [
        {
          content: i.date.date,
          styles: {
            ...styles,
            cellWidth: 10,
          },
        },
        {
          content: login.join(' / '),
          styles: logStyles(login),
        },
        {
          content: '',
          styles,
        },
        {
          content: '',
          styles,
        },
        {
          content: logout.join(' / '),
          styles: logStyles(logout),
        },
        {
          content: '',
          styles,
        },
        {
          content: '',
          styles,
        },
        {
          content: i.remarks ? i.remarks : '',
          styles: {
            ...styles,
            lineColor: 0,
          },
        },
        {
          content: '',
          styles: { ...styles, lineColor: [255, 255, 255] },
        },
        {
          content: '',
          styles: fillUpStyles,
        },
        {
          content: '',
          styles: fillUpStyles,
        },
        {
          content: '',
          styles: fillUpStyles,
        },
      ];
    });

    body.push([
      {
        content: 'TOTAL',
        // colSpan: 8,
        styles: {
          ...styles,
          halign: 'right',
          cellPadding: { right: 10 },
          lineWidth: 0,
          lineColor: [255, 255, 255],
        },
      },
      { content: '', styles },
      { content: '', styles: fillUpStyles },
      { content: '', styles: fillUpStyles },
      { content: '', styles: fillUpStyles },
    ]);

    const doc = new jsPDF({ format: 'a4', orientation: 'p' });

    const margin = 8;
    const marginTop = margin + 40;
    const fontSize = 7;

    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();

    // header

    doc.text('TIMESHEET', margin + 2, marginTop - 10, {}, {});
    doc.setFontSize(fontSize);

    doc.text('EMP. NO', margin + 2, marginTop + 2);
    doc.text('EMPLOYEE NAME', margin + 2, marginTop + 6);
    doc.text('DEPARTMENT', margin + 2, marginTop + 10);
    doc.text('PAY PERIOD', margin + 2, marginTop + 14);
    doc.text('TIME SCHEDULE', margin + 2, marginTop + 18);

    doc.text(':', margin + 31, marginTop + 2);
    doc.text(':', margin + 31, marginTop + 6);
    doc.text(':', margin + 31, marginTop + 10);
    doc.text(`${title}`, margin + 34, marginTop + 13);
    doc.text(':', margin + 31, marginTop + 14);
    doc.text(':', margin + 31, marginTop + 18);

    doc.line(margin + 32, marginTop + 2, 80, marginTop + 2);
    doc.line(margin + 32, marginTop + 6, 80, marginTop + 6);
    doc.line(margin + 32, marginTop + 10, 80, marginTop + 10);
    doc.line(margin + 32, marginTop + 14, 80, marginTop + 14);
    doc.line(margin + 32, marginTop + 18, 80, marginTop + 18);

    //table
    autoTable(doc, {
      startY: marginTop + 22,
      head,
      body,
      margin,
      theme: 'plain',
    });

    //footer

    const footerY = (doc as any).lastAutoTable.finalY;
    doc.setFontSize(fontSize + 1);
    const t =
      'I hereby certify that the above is a true and correct report of the hours of work perfomed, records of which was made daily at the time of arrival at and departure from Office.';
    const textTab = doc.splitTextToSize('              ' + t, pageWidth - 22);
    doc.text(textTab, margin + 2, footerY + 10);

    doc.line(margin + 2, footerY + 26, margin + 48, footerY + 26);
    doc.line(pageWidth - 90, footerY + 26, pageWidth - 10, footerY + 26);

    doc.text("EMPLOYEE'S SIGNATURE", margin + 10, footerY + 30);
    doc.text(
      'AUTHORIZED SUPERVISOR/HEAD OF OFFICE',
      pageWidth - 80,
      footerY + 30
    );

    doc.text(
      'Instruction for LSERV managed employees:',
      margin + 2,
      footerY + 48
    );

    const list = [
      '1. Please complete the missing time entries or indicate in the Remarks column if you are on official business, on travel, attended a seminar/training, etc.',
      '2. Make sure all the manual entries are properly signed/initialed by your Department Head or his authorized representative.',
      '3. Submit this Timesheet together with the required supporting documents to LSERV Project Coordinator duly signed/approved by your\n Department Head or his authorized representative.',
    ];

    doc.text(list, margin + 2, footerY + 52, {
      maxWidth: pageWidth - 8,
    });

    // doc.save('test');

    preview.current.src = doc.output('datauristring');
  }, [logs, title]);

  return (
    <iframe
      width="100%"
      height="100%"
      style={{ minHeight: '80vh' }}
      title={title}
      ref={preview}
    />
  );
};

export default Lserv;
