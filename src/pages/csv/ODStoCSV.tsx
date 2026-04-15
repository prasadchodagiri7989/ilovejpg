// src/pages/pdf/ODStoCSV.tsx

import React from "react";
import { GenericConverter } from "../pdf/GenericConverter";

export const ODStoCSV = () => {
  return (
    <GenericConverter
      fromFormat="ODS"
      toFormat="CSV"
      acceptedExtensions=".ods"
      categoryPath="/tools/spreadsheet"
    />
  );
};
