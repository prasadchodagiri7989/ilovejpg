// src/pages/pdf/ODStoXLSX.tsx

import React from "react";
import { GenericConverter } from "../pdf/GenericConverter";

export const ODStoXLSX = () => {
  return (
    <GenericConverter
      fromFormat="ODS"
      toFormat="XLSX"
      acceptedExtensions=".ods"
      categoryPath="/tools/spreadsheet"
    />
  );
};
