export function parseDataMismatch(dataMismatch: string[]): any[] {
  if (!dataMismatch || dataMismatch.length === 0) {
      console.error("No data to process.");
      return [];
  }

  const result: any[] = [];

  for (const mismatchString of dataMismatch) {
      if (typeof mismatchString !== "string") {
          console.error("Expected a string, got:", typeof mismatchString);
          continue;
      }

      const sourceRecordStart = mismatchString.indexOf("source-record:");
      const targetRecordStart = mismatchString.indexOf("target-record:");

      if (sourceRecordStart === -1 || targetRecordStart === -1) {
          console.error("Could not find source-record or target-record in string.");
          continue; 
      }

      const sourceRecordString = mismatchString.slice(sourceRecordStart + "source-record:".length, targetRecordStart).trim();
      const targetRecordString = mismatchString.slice(targetRecordStart + "target-record:".length).trim();

      const formattedSource = sourceRecordString.replace(/=>/g, ":").replace(/nil/g, "null");
      const formattedTarget = targetRecordString.replace(/=>/g, ":").replace(/nil/g, "null");

      try {
          const sourceRecord = JSON.parse(formattedSource.startsWith("[") ? formattedSource : `[${formattedSource}]`);
          const targetRecord = JSON.parse(formattedTarget.startsWith("[") ? formattedTarget : `[${formattedTarget}]`);
          
          // Додаємо sourceRecord та targetRecord до результату, щоб мати доступ до них окремо
          result.push({ sourceRecord, targetRecord });
      } catch (error) {
          console.error("JSON parsing error:", error, "\nSource:", formattedSource, "\nTarget:", formattedTarget);
      }
  }

  return result;
}
