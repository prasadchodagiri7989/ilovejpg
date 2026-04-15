// src/pages/pdf/XLStoODS.tsx

import React from "react";
import { GenericConverter } from "../pdf/GenericConverter";

export const XLStoODS = () => {
  return (
    <GenericConverter
      fromFormat="XLS"
      toFormat="ODS"
      acceptedExtensions=".xls"
      categoryPath="/tools/spreadsheet"
    />
  );
};
