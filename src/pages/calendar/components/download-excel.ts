import { type Borders, type  Color, type  Fill, type Font, Workbook, type Worksheet } from "exceljs";
import { isBefore } from "date-fns";
import i18n from "i18next";
import { saveAs } from "../../../helper/FileHelper";
import { type CalendarTask } from "./CalendarForm";

const t = i18n.t

const thinBorders: Partial<Borders> = {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' }
}
const boldFont: Partial<Font> = { bold: true, size: 10 }

const solidPatternFill: Fill = {
    type: 'pattern',
    pattern: 'solid',
}

const grayColor: Partial<Color> = { argb: 'ffc0c0c0' }
const greenColor: Partial<Color> = { argb: 'ff92d050' }
const orangeColor: Partial<Color> = { argb: 'fff19e38' }
const redColor: Partial<Color> = { argb: 'ffff0000' }

const grayForeground: Fill = {
    ...solidPatternFill,
    fgColor: grayColor,
}
const orangeForeground: Fill = {
    ...solidPatternFill,
    fgColor: orangeColor
}
const redForeground: Fill = {
    ...solidPatternFill,
    fgColor: redColor
}
const greenBackground: Fill = {
    ...solidPatternFill,
    bgColor: greenColor
}
const orangeBackground: Fill = {
    ...solidPatternFill,
    bgColor: orangeColor
}
const redBackground: Fill = {
    ...solidPatternFill,
    bgColor: redColor
}

export async function downloadAsExcel(startOfCamp: Date, tasks: CalendarTask[], filename: string) {
    const workbook = new Workbook();
    workbook.creator = 'Hering / Sardine / Sardina';
    workbook.created = new Date();

    const sheet = workbook.addWorksheet(t('calendarPage.excel.title'), {
        pageSetup: { paperSize: 9, orientation: 'portrait', fitToPage: true }
    });
    sheet.columns = [
        { key: 'when', width: 13 },
        { key: 'what', width: 45 },
        { key: 'who', width: 16.5 },
        { key: 'toWhom', width: 16.5 },
        { key: 'done', width: 8 }
    ];

    let row = sheet.addRow([t('calendarPage.excel.title')])
    row.font = { bold: true, size: 24 }

    sheet.addRow([])

    row = sheet.addRow({ when: t('calendarPage.startDate'), what: startOfCamp })
    row.eachCell((cell, _) => {
        cell.border = thinBorders;
        cell.fill = grayForeground
    })

    row = sheet.addRow({ when: t('calendarPage.responsibleOptions.ll') })

    let cell = row.getCell('when')
    cell.border = thinBorders
    cell.fill = grayForeground

    cell = row.getCell('what')
    cell.border = thinBorders
    cell.fill = grayForeground

    sheet.addRow([])

    row = sheet.addRow([t('calendarPage.excel.dueSoonInfo')])
    cell = row.getCell('when')
    cell.fill = orangeForeground
    cell.border = thinBorders
    sheet.mergeCells(row.number, 1, row.number, sheet.columns.length)

    row = sheet.addRow([t('calendarPage.excel.overdueInfo')])
    cell = row.getCell('when')
    cell.fill = redForeground
    cell.border = thinBorders
    sheet.mergeCells(row.number, 1, row.number, sheet.columns.length)

    sheet.addRow([])

    row = sheet.addRow({
        when: t('calendarPage.table.when'),
        what: t('calendarPage.table.what'),
        who: t('calendarPage.table.who'),
        toWhom: t('calendarPage.table.target'),
        done: t('calendarPage.excel.done')
    })
    row.eachCell((cell, _) => {
        cell.font = boldFont;
        cell.border = thinBorders;
        cell.fill = grayForeground

        if (cell.col == "5") { // 5 = done-Column
            cell.alignment = { horizontal: 'center' }
        }
    })

    sheet.addRow([])

    const tasksBeforeCamp = tasks.filter(t => isBefore(t.deadline, startOfCamp))
    addTaskRows(t('calendarPage.excel.beforeCamp'), tasksBeforeCamp, sheet)

    sheet.addRow([])

    const tasksAfterCamp = tasks.filter(t => !tasksBeforeCamp.includes(t))
    addTaskRows(t('calendarPage.excel.afterCamp'), tasksAfterCamp, sheet)

    sheet.addConditionalFormatting({
        ref: '$A$11:$E$101',
        rules: [
            // highlight done items
            {
                priority: 1,
                type: 'expression',
                formulae: ['IF(NOT(ISBLANK($E11)),TRUE,FALSE)'],
                style: {
                    fill: greenBackground
                }
            },
            // highlight overdue items
            {
                priority: 2,
                type: 'expression',
                formulae: ['IF(AND(NOT(ISBLANK($A11)),ISNUMBER($A11)),IF(TODAY()>$A11,TRUE,FALSE),FALSE)'],
                style: {
                    fill: redBackground
                }
            },
            // higlight overdue soon items
            {
                priority: 3,
                type: 'expression',
                formulae: ['IF(AND(NOT(ISBLANK($A11)),ISNUMBER($A11)),IF(AND($A11>=TODAY(), $A11<=TODAY()+14),TRUE,FALSE),FALSE)'],
                style: {
                    fill: orangeBackground
                }
            }
        ]
    })

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const downloadUrl = URL.createObjectURL(blob);

    saveAs(downloadUrl, filename)
    URL.revokeObjectURL(downloadUrl);
}

function addTaskRows(subtitle: string, tasks: CalendarTask[], sheet: Worksheet) {
    const subtitleRow = sheet.addRow({ when: subtitle })
    subtitleRow.font = { bold: true, size: 10 }

    const taskRowInfos = tasks.map(task => {
        const responsible = task.responsible
            .map(responsible => responsible.name)
            .join(', ')
        const targets = task.targets
            .map(target => target.name)
            .join(', ')

        return {
            when: task.deadline,
            what: task.title,
            who: responsible,
            toWhom: targets
        }
    });

    const taskRows = sheet.addRows(taskRowInfos)
    taskRows.forEach(r => {
        r.eachCell((cell, _) => {
            cell.font = { size: 10 }
            cell.alignment = {
                wrapText: true,
                vertical: 'middle'
            }
            cell.border = thinBorders;

            if (cell.col == "1") { // 1 = when-Column
                cell.alignment = {
                    ...cell.alignment,
                    horizontal: 'left'
                }
            }
        })

        const doneCell = r.getCell('done')
        doneCell.font = { size: 10 }
        doneCell.alignment = { horizontal: 'center', vertical: 'middle' }
        doneCell.border = thinBorders;
    })
}