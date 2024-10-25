export function saveAs(dataUrl: string, filename: string) {
    const link = document.createElement('a');
    link.setAttribute('download', filename);
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
}