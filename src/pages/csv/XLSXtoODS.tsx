// src/pages/pdf/XLSXtoODS.tsx

import React from "react";
import { GenericConverter } from "../pdf/GenericConverter";

export const XLSXtoODS = () => {
  return (
    <GenericConverter
      fromFormat="XLSX"
      toFormat="ODS"
      acceptedExtensions=".xlsx"
      categoryPath="/tools/spreadsheet"
    />
  );
};
