import mammoth from "mammoth";
import * as xlsx from "xlsx";

/**
 * Extracts text content from a File object depending on its MIME type.
 * Returns the extracted text or an empty string if unsupported.
 */
export async function parseFileToText(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const type = file.type;
  const name = file.name.toLowerCase();

  try {
    // 1. PDF
    if (type === "application/pdf" || name.endsWith(".pdf")) {
      const pdfParse = require("pdf-parse");
      const data = await pdfParse(buffer);
      return data.text;
    }

    // 2. DOCX
    if (
      type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      name.endsWith(".docx")
    ) {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    }

    // 3. XLSX
    if (
      type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      type === "application/vnd.ms-excel" ||
      name.endsWith(".xlsx") ||
      name.endsWith(".xls")
    ) {
      const workbook = xlsx.read(buffer, { type: "buffer" });
      let text = "";
      for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName];
        text += xlsx.utils.sheet_to_txt(sheet) + "\n\n";
      }
      return text;
    }

    // 4. TXT or other raw formats
    if (type.startsWith("text/") || name.endsWith(".txt") || name.endsWith(".csv")) {
      return buffer.toString("utf-8");
    }

    // 5. Images (Ignored in this utility, they will be sent directly to Vision API)
    if (type.startsWith("image/")) {
      return "";
    }

    return "";
  } catch (error) {
    console.error(`Error parsing file ${file.name}:`, error);
    return "";
  }
}
