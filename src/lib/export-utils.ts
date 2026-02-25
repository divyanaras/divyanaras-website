import html2canvas from "html2canvas";

export async function exportAsImage(element: HTMLElement, filename: string): Promise<void> {
  const canvas = await html2canvas(element, {
    backgroundColor: null,
    scale: 2, // retina quality
    useCORS: true,
    logging: false,
  });

  const link = document.createElement("a");
  link.download = `${filename}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
