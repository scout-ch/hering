// some mobile browsers (e.g. iOS Safari) read the blob asynchronously after the click,
// so the object URL must outlive the click for a while (same approach as FileSaver.js)
const REVOKE_DELAY_MS = 40_000

export function saveAs(blob: Blob, filename: string) {
    const downloadUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('download', filename);
    link.href = downloadUrl;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(downloadUrl), REVOKE_DELAY_MS);
}
